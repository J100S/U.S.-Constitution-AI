let constitutionText = "";

// Load Constitution
fetch("constitution.txt")
  .then(res => res.text())
  .then(text => {
    constitutionText = text.toLowerCase();
    console.log("Constitution loaded 🇺🇸");
  });

// Split into chunks
function getChunks(text) {
  return text.split("\n\n"); // paragraphs
}

// Find best match
function findBestMatch(query) {
  const chunks = getChunks(constitutionText);
  let bestChunk = "";
  let bestScore = 0;

  chunks.forEach(chunk => {
    let score = similarity(query, chunk);
    if (score > bestScore) {
      bestScore = score;
      bestChunk = chunk;
    }
  });

  return bestChunk;
}

// Basic similarity
function similarity(a, b) {
  const aWords = a.toLowerCase().split(" ");
  const bWords = b.toLowerCase().split(" ");

  let match = 0;
  aWords.forEach(word => {
    if (bWords.includes(word)) match++;
  });

  return match / aWords.length;
}

// Chat
function ask() {
  const input = document.getElementById("input").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<div class="user">You: ${input}</div>`;

  const result = findBestMatch(input);

  let response = result
    ? result.substring(0, 500) + "..."
    : "I couldn't find that in the Constitution.";

  chat.innerHTML += `<div class="bot">AI: ${response}</div>`;

  chat.scrollTop = chat.scrollHeight;
  document.getElementById("input").value = "";
}