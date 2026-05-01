
// =========================
// DOM ELEMENTS
// =========================
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const typing = document.getElementById("typing");

// =========================
// CONSTITUTION MODEL
// =========================
let wordMap = {};
let trained = false;
let constitutionText = "";

// =========================
// LOAD CONSTITUTION FILE
// =========================
async function loadConstitution() {
  try {
    const res = await fetch("constitution.txt");
    constitutionText = await res.text();
    buildModel(constitutionText);

    addMessage("AI", "🇺🇸 Constitution AI online. Ask me about law, rights, or history.");
  } catch (err) {
    addMessage("AI", "Failed to load constitution.txt");
    console.error(err);
  }
}

// =========================
// SIMPLE NLP MODEL
// =========================
function buildModel(text) {
  const tokens = text.toLowerCase().split(/\W+/);

  tokens.forEach(word => {
    if (!word) return;
    wordMap[word] = (wordMap[word] || 0) + 1;
  });

  trained = true;
}

// score relevance to constitution
function scoreText(text) {
  const tokens = text.toLowerCase().split(/\W+/);
  let score = 0;

  tokens.forEach(t => {
    if (wordMap[t]) score += wordMap[t];
    else score -= 0.25;
  });

  return score;
}

// =========================
// WIKIPEDIA API
// =========================

// Step 1: search title
async function wikiSearch(query) {
  const url =
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

  const res = await fetch(url);
  const data = await res.json();

  return data?.query?.search?.[0]?.title || null;
}

// Step 2: get summary
async function wikiSummary(title) {
  const url =
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

  const res = await fetch(url);
  const data = await res.json();

  return data?.extract || "No Wikipedia summary found.";
}

// full wiki pipeline
async function getWikipediaAnswer(query) {
  try {
    const title = await wikiSearch(query);
    if (!title) return "No Wikipedia results found.";

    const summary = await wikiSummary(title);
    return `🌍 Wikipedia:\n${summary}`;
  } catch (err) {
    return "Wikipedia request failed.";
  }
}

// =========================
// CONSTITUTION RESPONSES
// =========================
function constitutionReply(text) {
  const t = text.toLowerCase();

  if (t.includes("rights")) {
    return "🇺🇸 The Constitution guarantees rights such as speech, religion, press, assembly, and due process.";
  }

  if (t.includes("president")) {
    return "🇺🇸 The President enforces federal law and leads the executive branch.";
  }

  if (t.includes("congress")) {
    return "🇺🇸 Congress is the legislative branch made up of the House of Representatives and Senate.";
  }

  if (t.includes("amendment")) {
    return "🇺🇸 Amendments are changes to the Constitution, such as the Bill of Rights.";
  }

  return "🇺🇸 This relates to U.S. constitutional structure and governance.";
}

// =========================
// AI ROUTER (CORE LOGIC)
// =========================
async function getResponse(text) {
  const lower = text.toLowerCase();
  const score = scoreText(text);

  // -------------------------
  // FORCE CONSTITUTION MODE
  // -------------------------
  if (
    lower.includes("constitution") ||
    lower.includes("amendment") ||
    lower.includes("rights") ||
    lower.includes("congress") ||
    lower.includes("president") ||
    score > 25
  ) {
    return constitutionReply(text);
  }

  // -------------------------
  // WIKIPEDIA MODE
  // -------------------------
  const wikiTriggers =
    lower.startsWith("what is") ||
    lower.startsWith("who is") ||
    lower.startsWith("when") ||
    lower.startsWith("where") ||
    score < 5;

  if (wikiTriggers) {
    const cleaned = text
      .replace(/what is/gi, "")
      .replace(/who is/gi, "")
      .replace(/tell me about/gi, "")
      .trim();

    return await getWikipediaAnswer(cleaned);
  }

  // fallback
  return "Try asking about U.S. government, law, or general knowledge.";
}

// =========================
// CHAT UI SYSTEM
// =========================
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender === "You" ? "user" : "ai");
  msg.innerText = text;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// typing indicator
function showTyping() {
  typing.classList.remove("hidden");
}

function hideTyping() {
  typing.classList.add("hidden");
}

// =========================
// SEND MESSAGE
// =========================
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  showTyping();

  const response = await getResponse(text);

  hideTyping();
  addMessage("AI", response);
}

// =========================
// ENTER KEY SUPPORT
// =========================
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// =========================
// START APP
// =========================
loadConstitution();