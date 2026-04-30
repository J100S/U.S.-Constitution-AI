# 🦅 U.S. Constitution AI

An AI-powered chatbot that answers questions about the United States Constitution — Articles, the Bill of Rights, and all 27 Amendments — built with the Anthropic API and a patriotic red, white & blue UI.

---

## 📁 File Structure

```
constitution-ai/
├── index.html          # Main UI (HTML structure)
├── styles.css          # USA-themed styling
├── app.js              # Frontend JS + Anthropic API calls
├── app.py              # Python/Flask backend (keeps API key server-side)
├── requirements.txt    # Python dependencies
├── Constitution.txt    # Full Constitution source text
└── README.md
```

---

## 🚀 Quick Start

### Option A — Open directly in the browser (no server needed)

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/constitution-ai.git
   cd constitution-ai
   ```

2. Open `app.js` and replace the placeholder with your Anthropic API key:
   ```js
   const ANTHROPIC_API_KEY = "sk-ant-...";
   ```

3. Open `index.html` in your browser. Done!

> ⚠️ **Note:** Putting an API key directly in client-side JS exposes it publicly.
> Use Option B (Flask backend) for any shared or deployed version.

---

### Option B — Run via Python/Flask backend (recommended)

Your API key stays on the server and is never sent to the browser.

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set your API key** — create a `.env` file in the project root:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
   Or export it in your shell:
   ```bash
   export ANTHROPIC_API_KEY="sk-ant-..."
   ```

3. **Run the server:**
   ```bash
   python app.py
   ```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

---

### Option C — Terminal / CLI mode

Ask questions about the Constitution right in your terminal:

```bash
python app.py --cli
```

---

## 🔧 Configuration

| Variable | Default | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | *(required)* | Your Anthropic API key |
| `PORT` | `5000` | Flask server port |
| `FLASK_DEBUG` | `false` | Enable Flask debug mode |

---

## 🌐 Deploying

### Render / Railway / Fly.io
- Set `ANTHROPIC_API_KEY` as an environment variable in the dashboard
- Set the start command to `python app.py`

### GitHub Pages (static only)
- Works with Option A (browser-direct) only
- Remember: your API key will be publicly visible in `app.js`

---

## 🛠 Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Python 3.9+, Flask, Flask-CORS
- **AI:** [Anthropic Claude](https://www.anthropic.com) (`claude-sonnet-4-20250514`)
- **Source:** Full U.S. Constitution text from the National Constitution Center

---

## 📜 License

MIT — free to use, modify, and share. Long live the Constitution! 🇺🇸