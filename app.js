// =========================
// CHAT STATE (GPT-STYLE CONTEXT WINDOW)
// =========================
const chatHistory = []; // full conversation
const memory = {
  entity: null,
  topic: null
};

// =========================
// DOM
// =========================
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// =========================
// CHAT UI
// =========================
function add(role, text){
  const div = document.createElement("div");
  div.className = "msg " + (role === "user" ? "user" : "ai");
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// =========================
// CONTEXT WINDOW (GPT STYLE)
// Keeps last N messages
// =========================
function addToHistory(role, text){
  chatHistory.push({ role, text });

  // keep last 12 messages (context window simulation)
  if(chatHistory.length > 12){
    chatHistory.shift();
  }
}

// =========================
// BUILD CONTEXT STRING (LIKE GPT INPUT WINDOW)
// =========================
function buildContext(){
  return chatHistory
    .map(m => `${m.role.toUpperCase()}: ${m.text}`)
    .join("\n");
}

// =========================
// SIMPLE INTENT DETECTION
// =========================
function detectIntent(text){
  const t = text.toLowerCase();

  if(
    t.includes("constitution") ||
    t.includes("amendment") ||
    t.includes("law") ||
    t.includes("rights")
  ){
    return "constitution";
  }

  return "wiki";
}

// =========================
// CONSTITUTION REASONING ENGINE (NOT JUST SEARCH)
// =========================
function constitutionalReasoning(query, context){

  const q = query.toLowerCase();

  // interpret First Amendment
  if(q.includes("first amendment")){
    return `
🇺🇸 First Amendment (Explanation):

This amendment protects five core freedoms:

• Freedom of speech
• Freedom of religion
• Freedom of the press
• Freedom of assembly
• Right to petition the government

🧠 Meaning:
It prevents the government from controlling personal expression or belief systems.
    `.trim();
  }

  // general constitutional reasoning
  if(q.includes("rights")){
    return `
📜 Constitutional Rights:

The Constitution protects individual liberties from government power.

🧠 Interpretation:
Rights are not granted by government — they are protected from government interference.
    `.trim();
  }

  return null;
}

// =========================
// WIKIPEDIA ENGINE (SAFE + FILTERED)
// =========================
async function wiki(query){

  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
  );

  const data = await res.json();
  let results = data?.query?.search || [];

  if(!results.length){
    return "🌍 No Wikipedia result found.";
  }

  // filter bad results
  results = results.filter(r => {
    const t = r.title.toLowerCase();
    return !t.includes("list of actors")
        && !t.includes("disambiguation")
        && !t.includes("may refer");
  });

  const best = results[0];

  const res2 = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(best.title)}`
  );

  const data2 = await res2.json();

  return "🌍 " + (data2.extract || "").split(".").slice(0,2).join(".") + ".";
}

// =========================
// GPT-STYLE CONTEXT AWARE AI ROUTER
// =========================
async function askAI(text){

  // STEP 1: store message in context window
  addToHistory("user", text);

  const context = buildContext();
  const intent = detectIntent(text.toLowerCase());

  let response = null;

  // STEP 2: Constitution reasoning FIRST (higher priority than wiki)
  if(intent === "constitution"){
    response = constitutionalReasoning(text, context);
  }

  // STEP 3: Wikipedia fallback
  if(!response){
    response = await wiki(text);
  }

  // STEP 4: store AI response in context
  addToHistory("ai", response);

  return response;
}

// =========================
// SEND MESSAGE
// =========================
async function send(){

  const text = input.value.trim();
  if(!text) return;

  add("user", text);
  input.value = "";

  add("ai", "⏳ Thinking...");

  const reply = await askAI(text);

  add("ai", reply);
}

// =========================
// EVENTS (SAFE BINDING)
// =========================
sendBtn.addEventListener("click", send);

input.addEventListener("keydown", e=>{
  if(e.key === "Enter") send();
});

// =========================
// INIT
// =========================
add("ai", "🇺🇸 GPT-Style Constitutional AI Online.");