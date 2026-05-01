let constitutionText = "";
let wordMap = {};
let trained = false;

const chat = document.getElementById("chat");
const input = document.getElementById("input");

// -------------------------
// LOAD CONSTITUTION
// -------------------------
async function loadData() {
  const res = await fetch("constitution.txt");
  constitutionText = await res.text();

  buildModel(constitutionText);

  addMessage("AI", "🇺🇸 Constitution + Wikipedia AI online. Ask me anything.");
}

// -------------------------
// BUILD SIMPLE MODEL
// -------------------------
function buildModel(text) {
  const tokens = text.toLowerCase().split(/\W+/);

  tokens.forEach(w => {
    if (!w) return;
    wordMap[w] = (wordMap[w] || 0) + 1;
  });

  trained = true;
}

// -------------------------
// SCORE CONSTITUTION RELEVANCE
// -------------------------
function score(text) {
  const tokens = text.toLowerCase().split(/\W+/);
  let score = 0;

  tokens.forEach(t => {
    if (wordMap[t]) score += wordMap[t];
    else score -= 0.3;
  });

  return score;
}

// -------------------------
// WIKIPEDIA API
// -------------------------
async function getWikiSummary(query) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.extract) {
      return `🌍 Wikipedia:\n${data.extract}`;
    } else {
      return "No Wikipedia result found.";
    }
  } catch (err) {
    return "Wikipedia error occurred.";
  }
}

// Search Wikipedia automatically
async function smartWikiSearch(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

  const res = await fetch(searchUrl);
  const data = await res.json();

  const title = data.query?.search?.[0]?.title;
  if (!title) return "No Wikipedia match found.";

  return await getWikiSummary(title);
}

// -------------------------
// AI ROUTER (THIS IS THE KEY)
// -------------------------
async function getResponse(userText) {
  const text = userText.toLowerCase();
  const constitutionScore = score(text);

  // 🇺🇸 STRONG CONSTITUTION MATCH
  if (
    text.includes("constitution") ||
    text.includes("amendment") ||
    text.includes("congress") ||
    text.includes("president") ||
    text.includes("rights") ||
    constitutionScore > 25
  ) {
    return getConstitutionResponse(text);
  }

  // 🌍 WIKIPEDIA TRIGGER (smart fallback)
  const wikiTriggers =
    text.startsWith("what is") ||
    text.startsWith("who is") ||
    text.startsWith("when") ||
    text.startsWith("where") ||
    constitutionScore < 5;

  if (wikiTriggers) {
    const cleaned = userText
      .replace("what is", "")
      .replace("who is", "")
      .replace("tell me about", "")
      .trim();

    return await smartWikiSearch(cleaned);
  }

  // fallback
  return "I couldn't determine a strong source. Try asking about U.S. government or general knowledge.";
}

// -------------------------
// CONSTITUTION RESPONSES
// -------------------------
function getConstitutionResponse(text) {
  if (text.includes("rights")) {
    return "🇺🇸 The Constitution protects rights like speech, religion, press, assembly, and due process.";
  }

  if (text.includes("president")) {
    return "🇺🇸 The President leads the executive branch and enforces federal law.";
  }

  if (text.includes("congress")) {
    return "🇺🇸 Congress is the legislative branch made up of the House and Senate.";
  }

  return "🇺🇸 This relates to the U.S. Constitution and federal government structure.";
}

// -------------------------
// CHAT UI
// -------------------------
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender === "You" ? "user" : "ai");
  msg.innerText = text;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// -------------------------
// SEND MESSAGE
// -------------------------
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);

  const response = await getResponse(text);
  addMessage("AI", response);

  input.value = "";
}

// ENTER KEY SUPPORT
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

loadData();