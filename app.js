let corpus = "";
let wordMap = {};
let trained = false;

const chat = document.getElementById("chat");
const input = document.getElementById("input");

// Load Constitution text
async function loadData() {
  const res = await fetch("constitution.txt");
  corpus = await res.text();
  buildModel(corpus);

  addMessage("AI", "Constitution AI online 🇺🇸 Ask me anything about U.S. law, rights, or government.");
}

// Build simple word frequency model
function buildModel(text) {
  const tokens = text.toLowerCase().split(/\W+/);

  tokens.forEach(w => {
    if (!w) return;
    wordMap[w] = (wordMap[w] || 0) + 1;
  });

  trained = true;
}

// Fake “neural scoring”
function score(text) {
  const tokens = text.toLowerCase().split(/\W+/);
  let score = 0;

  tokens.forEach(t => {
    if (wordMap[t]) score += wordMap[t];
    else score -= 0.5;
  });

  return score;
}

// AI response generator
function getResponse(userText) {
  const s = score(userText);

  if (userText.toLowerCase().includes("rights")) {
    return "The Constitution protects rights such as freedom of speech, religion, and due process.";
  }

  if (userText.toLowerCase().includes("president")) {
    return "The President is the head of the executive branch and enforces federal law.";
  }

  if (s > 25) {
    return "This strongly relates to constitutional principles 🇺🇸";
  } else if (s > 8) {
    return "There is some constitutional relevance here.";
  } else {
    return "I could not strongly match this to constitutional text. Try asking about laws, rights, or government structure.";
  }
}

// Add message to chat
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg");

  msg.classList.add(sender === "You" ? "user" : "ai");
  msg.innerText = text;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// Send message
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);

  const response = getResponse(text);
  setTimeout(() => addMessage("AI", response), 400);

  input.value = "";
}

// Enter key support
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

loadData();