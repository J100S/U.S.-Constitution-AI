"""
U.S. Constitution AI — Python / Flask Backend
----------------------------------------------
Serves index.html and proxies requests to the Anthropic API
so your API key stays server-side (never exposed in the browser).

Usage:
    pip install -r requirements.txt
    export ANTHROPIC_API_KEY="sk-ant-..."   # or set in .env
    python app.py
Then open http://localhost:5000
"""

import os
import anthropic
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", template_folder=".")
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
MODEL  = "claude-sonnet-4-20250514"

# ── Load constitution text from file ──────────────────────

CONSTITUTION_PATH = os.path.join(os.path.dirname(__file__), "Constitution.txt")

def load_constitution() -> str:
    try:
        with open(CONSTITUTION_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "[Constitution text not found — place Constitution.txt in the project root]"

CONSTITUTION_TEXT = load_constitution()

SYSTEM_PROMPT = f"""You are a knowledgeable and proud guide to the United States Constitution —
the supreme law of the land. Answer questions clearly and accurately based on the constitutional
text provided. When referencing specific provisions, cite the Article, Section, or Amendment number.
Be informative but conversational. Use plain language while maintaining accuracy. Occasionally use
light patriotic language to reflect American civic pride. Format key constitutional terms in **bold**.
Keep responses focused and under 300 words unless a longer explanation is truly necessary.

CONSTITUTIONAL TEXT:
{CONSTITUTION_TEXT}"""


# ── Routes ────────────────────────────────────────────────

@app.route("/")
def index():
    """Serve the main HTML page."""
    return send_from_directory(".", "index.html")


@app.route("/chat", methods=["POST"])
def chat():
    """
    Proxy endpoint for the Anthropic API.
    Expects JSON body: { "messages": [ { "role": "user"|"assistant", "content": "..." } ] }
    Returns JSON: { "reply": "..." }
    """
    data = request.get_json(force=True)
    messages = data.get("messages", [])

    if not messages:
        return jsonify({"error": "No messages provided."}), 400

    # Validate roles
    for msg in messages:
        if msg.get("role") not in ("user", "assistant"):
            return jsonify({"error": f"Invalid role: {msg.get('role')}"}), 400

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=1000,
            system=SYSTEM_PROMPT,
            messages=messages,
        )
        reply = response.content[0].text
        return jsonify({"reply": reply})

    except anthropic.AuthenticationError:
        return jsonify({"error": "Invalid API key. Check your ANTHROPIC_API_KEY."}), 401
    except anthropic.RateLimitError:
        return jsonify({"error": "Rate limit reached. Please wait and try again."}), 429
    except anthropic.APIError as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health")
def health():
    """Simple health-check endpoint."""
    return jsonify({"status": "ok", "model": MODEL})


# ── CLI mode (optional — ask questions in the terminal) ───

def cli_mode():
    """Interactive terminal chat with the Constitution AI."""
    print("\n🦅  U.S. Constitution AI  — Terminal Mode")
    print("=" * 45)
    print("Type your question and press Enter. Type 'quit' to exit.\n")

    history = []
    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not user_input:
            continue
        if user_input.lower() in ("quit", "exit", "q"):
            print("Goodbye!")
            break

        history.append({"role": "user", "content": user_input})

        try:
            response = client.messages.create(
                model=MODEL,
                max_tokens=1000,
                system=SYSTEM_PROMPT,
                messages=history,
            )
            reply = response.content[0].text
            history.append({"role": "assistant", "content": reply})
            print(f"\nAI: {reply}\n")
        except Exception as e:
            print(f"\nError: {e}\n")
            history.pop()


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--cli":
        cli_mode()
    else:
        port = int(os.environ.get("PORT", 5000))
        debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
        print(f"🦅  Constitution AI running at http://localhost:{port}")
        app.run(host="0.0.0.0", port=port, debug=debug)