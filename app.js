// ============================================================
//  U.S. Constitution AI — Frontend Logic
//  Calls the Anthropic API directly from the browser.
//  Set your API key in the ANTHROPIC_API_KEY constant below,
//  OR route requests through the Python backend (app.py).
// ============================================================

const ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE"; // ← replace or use backend
const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL   = "claude-sonnet-4-20250514";

const CONSTITUTION = `UNITED STATES CONSTITUTION — FULL TEXT

PREAMBLE
We the People of the United States, in Order to form a more perfect Union, establish Justice,
insure domestic Tranquility, provide for the common defence, promote the general Welfare, and
secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this
Constitution for the United States of America.

ARTICLE I — THE LEGISLATURE
Section 1: All legislative Powers herein granted shall be vested in a Congress of the United
States, which shall consist of a Senate and House of Representatives.
Section 2: The House of Representatives shall be composed of Members chosen every second Year
by the People. No Person shall be a Representative who shall not have attained to the Age of
twenty five Years, and been seven Years a Citizen. The House has the sole Power of Impeachment.
Section 3: The Senate shall be composed of two Senators from each State for six Years. No Person
shall be a Senator who shall not have attained to the Age of thirty Years, and been nine Years a
Citizen. The Vice President is President of the Senate. The Senate has the sole Power to try all
Impeachments; conviction requires two thirds of Members present.
Section 4: The Times, Places and Manner of holding Elections shall be prescribed by each State
Legislature; Congress may alter such Regulations.
Section 5: A Majority of each House constitutes a Quorum to do Business.
Section 6: Senators and Representatives receive Compensation paid from the Treasury.
Section 7: All Bills for raising Revenue shall originate in the House. Every Bill passed by both
Houses must be presented to the President. If vetoed, two thirds of both Houses can override.
Section 8 — Powers of Congress: lay and collect Taxes; borrow Money; regulate Commerce; coin
Money; declare War; raise Armies; maintain a Navy; make all Laws necessary and proper (Elastic Clause).
Section 9 — Limits on Congress: Habeas Corpus shall not be suspended except in Rebellion or
Invasion. No Bill of Attainder or ex post facto Law. No Title of Nobility.
Section 10: No State shall coin Money, pass a Bill of Attainder, or grant a Title of Nobility.

ARTICLE II — THE EXECUTIVE
Section 1: The executive Power is vested in a President for a four-Year term. No Person except
a natural born Citizen shall be eligible; must be at least 35 years old and 14 Years a Resident.
Presidential Oath: "I do solemnly swear that I will faithfully execute the Office of President
and will to the best of my Ability, preserve, protect and defend the Constitution."
Section 2: The President is Commander in Chief of the Army and Navy. He may grant Reprieves
and Pardons except in Cases of Impeachment. Treaties require advice and consent of two thirds of
the Senate. He nominates Supreme Court Justices with Senate confirmation.
Section 3: The President shall give Congress a State of the Union and take Care that the Laws
be faithfully executed.
Section 4: The President, Vice President, and civil Officers shall be removed on Impeachment
and Conviction of Treason, Bribery, or other high Crimes and Misdemeanors.

ARTICLE III — THE JUDICIARY
Section 1: The judicial Power is vested in one Supreme Court and inferior Courts as Congress
establishes. Judges hold their Offices during good Behaviour (lifetime appointments).
Section 2: Judicial Power extends to all Cases arising under this Constitution and federal law.
The Trial of all Crimes except Impeachment shall be by Jury.
Section 3: Treason consists only in levying War against the United States or adhering to their
Enemies. Conviction requires two Witnesses to the same overt Act or Confession in open Court.

ARTICLE IV — THE STATES
Section 1: Full Faith and Credit shall be given in each State to the Acts and Records of every
other State.
Section 2: Citizens of each State are entitled to all Privileges and Immunities of Citizens in
the several States.
Section 3: New States may be admitted by Congress into this Union.
Section 4: The United States shall guarantee to every State a Republican Form of Government and
protect each against Invasion and domestic Violence.

ARTICLE V — AMENDMENTS
Amendments may be proposed by two thirds of both Houses of Congress or by a Convention called
by two thirds of States. Amendments are valid when ratified by three fourths of State Legislatures
or by Conventions in three fourths of States.

ARTICLE VI — SUPREMACY CLAUSE
This Constitution and the Laws of the United States shall be the supreme Law of the Land.
No religious Test shall ever be required as a Qualification to any Office or public Trust.

ARTICLE VII
Ratification by nine States was sufficient to establish this Constitution (ratified 1788).

THE BILL OF RIGHTS — Amendments I–X (ratified December 15, 1791)

Amendment I: Congress shall make no law respecting an establishment of religion (Establishment
Clause), or prohibiting the free exercise thereof (Free Exercise Clause); or abridging freedom
of speech, of the press, the right to peaceably assemble, or to petition the Government.

Amendment II: A well regulated Militia being necessary to the security of a free State, the
right of the people to keep and bear Arms shall not be infringed.

Amendment III: No Soldier shall be quartered in any house in time of peace without the consent
of the Owner.

Amendment IV: The right of the people to be secure against unreasonable searches and seizures
shall not be violated; no Warrants shall issue without probable cause.

Amendment V: No person shall be tried for a capital crime without a Grand Jury indictment; no
person shall be tried twice for the same offence (Double Jeopardy); no person shall be compelled
to be a witness against himself (Self-Incrimination Clause); no person shall be deprived of life,
liberty, or property without due process of law; private property shall not be taken for public
use without just compensation (Takings Clause).

Amendment VI: In criminal prosecutions, the accused has the right to a speedy and public trial
by an impartial jury; to be informed of the accusation; to confront witnesses; and to have the
Assistance of Counsel.

Amendment VII: In common law suits exceeding twenty dollars, the right of trial by jury shall
be preserved.

Amendment VIII: Excessive bail shall not be required, nor excessive fines imposed, nor cruel and
unusual punishments inflicted.

Amendment IX: The enumeration of certain rights in the Constitution shall not be construed to
deny or disparage other rights retained by the people.

Amendment X: The powers not delegated to the United States nor prohibited to the States are
reserved to the States respectively, or to the people.

AMENDMENTS XI–XXVII

Amendment XI (1795): Federal courts may not hear suits against a State by citizens of another State.
Amendment XII (1804): Electors vote separately for President and Vice-President.
Amendment XIII (1865): Neither slavery nor involuntary servitude shall exist within the United States.
Amendment XIV (1868): All persons born or naturalized in the United States are citizens. No State
  shall deprive any person of life, liberty, or property without due process; nor deny equal
  protection of the laws. No person who engaged in insurrection against the United States shall
  hold office (Section 3).
Amendment XV (1870): The right to vote shall not be denied on account of race, color, or previous
  condition of servitude.
Amendment XVI (1913): Congress has power to lay and collect taxes on incomes.
Amendment XVII (1913): Senators are elected directly by the people of each State.
Amendment XVIII (1919, Repealed 1933): Prohibition — manufacture, sale, or transportation of
  intoxicating liquors is prohibited.
Amendment XIX (1920): The right to vote shall not be denied on account of sex (Women's suffrage).
Amendment XX (1933): Presidential terms end January 20; Congressional terms end January 3
  (Lame Duck Amendment).
Amendment XXI (1933): The Eighteenth Amendment (Prohibition) is repealed.
Amendment XXII (1951): No person shall be elected President more than twice (two-term limit).
Amendment XXIII (1961): Washington D.C. shall appoint Presidential Electors.
Amendment XXIV (1964): The right to vote shall not be denied for failure to pay a poll tax.
Amendment XXV (1967): On removal or death of the President, the Vice President becomes President.
  The President may declare inability to serve; Vice President becomes Acting President.
Amendment XXVI (1971): Citizens 18 years of age or older have the right to vote.
Amendment XXVII (1992): No law varying Congressional compensation shall take effect until an
  election of Representatives has intervened.`;

const SYSTEM_PROMPT = `You are a knowledgeable and proud guide to the United States Constitution —
the supreme law of the land. Answer questions clearly and accurately based on the constitutional
text provided. When referencing specific provisions, cite the Article, Section, or Amendment number.
Be informative but conversational. Use plain language while maintaining accuracy. Occasionally use
light patriotic language to reflect American civic pride. Format key constitutional terms in **bold**.
Keep responses focused and under 300 words unless a longer explanation is truly necessary.

CONSTITUTIONAL TEXT:
${CONSTITUTION}`;

// Conversation history for multi-turn context
const history = [];

// ── UI helpers ────────────────────────────────────────────

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 120) + "px";
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function ask(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}

function addMsg(role, html) {
  const chat   = document.getElementById("chat");
  const wrap   = document.createElement("div");
  wrap.className = "msg " + role;

  const avatar = document.createElement("div");
  avatar.className = "avatar " + role;
  avatar.textContent = role === "ai" ? "§" : "WTP";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = html;

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chat.appendChild(wrap);
  chat.scrollTop = chat.scrollHeight;
  return bubble;
}

function showTyping() {
  const chat = document.getElementById("chat");
  const div  = document.createElement("div");
  div.className = "msg ai";
  div.id = "typing-indicator";
  div.innerHTML = `<div class="avatar ai">§</div>
    <div class="bubble"><div class="typing">
      <span></span><span></span><span></span>
    </div></div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById("typing-indicator");
  if (t) t.remove();
}

function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g,     "<em>$1</em>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g,   "<br>");
}

// ── API call ──────────────────────────────────────────────

async function sendMessage() {
  const input = document.getElementById("userInput");
  const btn   = document.getElementById("sendBtn");
  const q     = input.value.trim();
  if (!q) return;

  document.getElementById("suggestions").style.display = "none";
  addMsg("user", q);
  input.value = "";
  input.style.height = "auto";
  btn.disabled = true;
  showTyping();
  history.push({ role: "user", content: q });

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: history,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data  = await res.json();
    const reply = data.content?.[0]?.text || "No response returned. Please try again.";
    history.push({ role: "assistant", content: reply });
    removeTyping();
    addMsg("ai", formatResponse(reply));
  } catch (err) {
    removeTyping();
    addMsg("ai", `<em>Error: ${err.message}. Please check your API key or try again.</em>`);
    history.pop();
  }

  btn.disabled = false;
  input.focus();
}