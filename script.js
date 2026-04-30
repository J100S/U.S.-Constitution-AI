function ask() {
  const input = document.getElementById("input").value;
  const chat = document.getElementById("chat");

  if (!input.trim()) return;

  chat.innerHTML += `<div class="message user">${input}</div>`;

  const result = findBestMatch(input);

  let response = "I couldn't find that in the Constitution.";

  if (result) {
    let label = "🇺🇸 Constitution";

    if (result.includes("amendment i")) label = "🇺🇸 Amendment I";
    else if (result.includes("amendment ii")) label = "🇺🇸 Amendment II";
    else if (result.includes("article i")) label = "🇺🇸 Article I";

    response = `<strong>${label}</strong><br><br>${result.substring(0, 400)}...`;
  }

  chat.innerHTML += `<div class="message bot">${response}</div>`;

  chat.scrollTop = chat.scrollHeight;
  document.getElementById("input").value = "";
}