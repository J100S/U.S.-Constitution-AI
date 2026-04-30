// Constitution data and search logic - completely client-side

const CONSTITUTION_TEXT = `PREAMBLE
We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.

ARTICLE I
SECTION 1. Legislative Powers
All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.

SECTION 2. House of Representatives
The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature.

SECTION 3. Senate
The Senate of the United States shall be composed of two Senators from each State, chosen by the Legislature thereof, for six Years; and each Senator shall have one Vote.

SECTION 4. Elections and Meetings
The Times, Places and Manner of holding Elections for Senators and Representatives, shall be prescribed in each State by the Legislature thereof; but the Congress may at any time by Law make or alter such Regulations.

SECTION 5. Rules of Congress
Each House shall be the Judge of the Elections, Returns and Qualifications of its own Members, and a Majority of each shall constitute a Quorum to do Business.

SECTION 6. Compensation and Privileges
The Senators and Representatives shall receive a Compensation for their Services, to be ascertained by Law, and paid out of the Treasury of the United States. They shall in all Cases, except Treason, Felony and Breach of the Peace, be privileged from Arrest during their Attendance at the Session of their respective Houses, and in going to and returning from the same.

SECTION 7. Legislative Process
All Bills for raising Revenue shall originate in the House of Representatives; but the Senate may propose or concur with Amendments as on other Bills. Every Bill which shall have passed both the House of Representatives and the Senate, shall, before it become a Law, be presented to the President of the United States.

SECTION 8. Powers of Congress
Congress shall have Power To lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the common Defence and general Welfare of the United States; To regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes; To coin Money, regulate the Value thereof, and of foreign Coin, and fix the Standard of Weights and Measures; To establish Post Offices and post Roads; To promote the Progress of Science and useful Arts, by securing for limited Times to Authors and Inventors the exclusive Right to their respective Writings and Discoveries; To constitute Tribunals inferior to the supreme Court; To define and punish Piracies and Felonies committed on the high Seas, and Offences against the Law of Nations; To declare War, grant Letters of Marque and Reprisal, and make Rules concerning Captures on Land and Water; To raise and support Armies, but no Appropriation of Money to that Use shall be for a longer Term than two Years; To provide and maintain a Navy; To make Rules for the Government and Regulation of the land and naval Forces; To provide for calling forth the Militia to execute the Laws of the Union, suppress Insurrections and repel Invasions.

SECTION 9. Limitations on Congress
The Privilege of the Writ of Habeas Corpus shall not be suspended, unless when in Cases of Rebellion or Invasion the public Safety may require it. No Bill of Attainder or ex post facto Law shall be passed. No Capitation, or other direct, Tax shall be laid, unless in Proportion to the Census or Enumeration herein before directed to be taken. No Tax or Duty shall be laid on Articles exported from any State.

SECTION 10. Powers Denied to States
No State shall enter into any Treaty, Alliance, or Confederation; grant Letters of Marque and Reprisal; coin Money; emit Bills of Credit; make any Thing but gold and silver Coin a Tender in Payment of Debts; pass any Bill of Attainder, ex post facto Law, or Law impairing the Obligation of Contracts, or grant any Title of Nobility.

ARTICLE II
SECTION 1. Executive Power
The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term, be elected, as follows. Each State shall appoint, in such Manner as the Legislature thereof may direct, a Number of Electors, equal to the whole Number of Senators and Representatives to which the State may be entitled in the Congress.

SECTION 2. Powers of the President
The President shall be Commander in Chief of the Army and Navy of the United States, and of the Militia of the several States, when called into the actual Service of the United States; he may require the Opinion, in writing, of the principal Officer in each of the executive Departments, upon any Subject relating to the Duties of their respective Offices, and he shall have Power to grant Reprieves and Pardons for Offences against the United States, except in Cases of Impeachment.

SECTION 3. State of the Union
He shall from time to time give to the Congress Information of the State of the Union, and recommend to their Consideration such Measures as he shall judge necessary and expedient; he may, on extraordinary Occasions, convene both Houses, or either of them, and in Case of Disagreement between them with Respect to the Time of Adjournment, he may adjourn them to such Time as he shall think proper.

SECTION 4. Commissions and Officers
He shall Commission all the Officers of the United States, and shall take Care that the Laws be faithfully executed.

ARTICLE III
SECTION 1. Judicial Power
The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish. The Judges, both of the supreme and inferior Courts, shall hold their Offices during good Behaviour, and shall, at stated Times, receive for their Services, a Compensation, which shall not be diminished during their Continuance in Office.

SECTION 2. Jurisdiction
The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United States, and Treaties made, or which shall be made, under their Authority; to all Cases affecting Ambassadors, and other public Ministers; to Controversies to which the United States shall be a Party; to Controversies between two or more States; between a State and Citizens of another State; between Citizens of different States, and between a State, or the Citizens thereof, and foreign States, Citizens or Subjects.

SECTION 3. Treason
Treason against the United States, shall consist only in levying War against them, or in adhering to their Enemies, giving them Aid and Comfort. No Person shall be convicted of Treason unless on the Testimony of two Witnesses to the same overt Act, or on Confession in open Court.

ARTICLE IV
SECTION 1. Full Faith and Credit
Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State.

SECTION 2. Citizens' Rights
The Citizens of each State shall be entitled to all Privileges and Immunities of Citizens in the several States. A Person charged in any State with Treason, Felony, or other Crime, who shall flee from Justice, and be found in another State, shall on Demand of the executive Authority of the State from which he fled, be delivered up, to be removed to the State having Jurisdiction of the Crime.

SECTION 3. New States
The Congress shall have Power to dispose of and make all needful Rules and Regulations respecting the Territory or other Property belonging to the United States; and nothing in this Constitution shall be so construed as to Prejudice any Claims of any particular State.

SECTION 4. Republican Government
The United States shall guarantee to every State in this Union a Republican Form of Government, and shall protect each of them against Invasion; and on Application of the Legislature, or of the Executive (when the Legislature cannot be convened), against domestic Violence.

ARTICLE V
The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution, or, on the Application of the Legislatures of two thirds of the several States, shall call a Convention for proposing Amendments, which, in either Case, shall be valid to all Intents and Purposes, as Part of this Constitution, when ratified by the Legislatures of three fourths of the several States, or by Conventions in three fourths thereof.

ARTICLE VI
All Debts contracted and Engagements entered into, before the Adoption of this Constitution, shall be as valid against the United States under this Constitution, as under the Confederation. This Constitution, and the Laws of the United States which shall be made in Pursuance thereof; and all Treaties made, or which shall be made, under the Authority of the United States, shall be the supreme Law of the Land; and the Judges in every State shall be bound thereby, any Thing in the Constitution or Laws of any State to the Contrary notwithstanding.

ARTICLE VII
The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution between the States so ratifying the Same.

Amendment I
Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.

Amendment II
A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.

Amendment III
No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.

Amendment IV
The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.

Amendment V
No person shall be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.

Amendment VI
In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor, and to have the Assistance of Counsel for his defence.

Amendment VII
In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise re-examined in any Court of the United States, than according to the rules of the common law.

Amendment VIII
Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.

Amendment IX
The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.

Amendment X
The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.

Amendment XIII
Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.

Amendment XIV
All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws.

Amendment XV
The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude.

Amendment XIX
The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.

Amendment XXI
The eighteenth article of amendment to the Constitution of the United States is hereby repealed.

Amendment XXVI
The right of citizens of the United States, who are eighteen years of age or older, to vote shall not be denied or abridged by the United States or by any State on account of age.`;

// Split Constitution into sections
function splitIntoSections(text) {
    const sections = [];
    const lines = text.split('\n');
    let currentSection = '';
    let currentTitle = 'Preamble';

    for (let line of lines) {
        const lineStripped = line.trim();

        if (!lineStripped) {
            if (currentSection) currentSection += '\n';
            continue;
        }

        if (lineStripped.startsWith('Article') || lineStripped.startsWith('Amendment')) {
            if (currentSection.trim()) {
                sections.push({
                    name: currentTitle,
                    text: currentSection.trim()
                });
            }
            currentTitle = lineStripped;
            currentSection = '';
        } else if (lineStripped.startsWith('SECTION') || lineStripped.startsWith('PART')) {
            currentTitle = currentTitle + ' - ' + lineStripped;
            currentSection += ' ' + lineStripped;
        } else {
            currentSection += ' ' + lineStripped;
        }
    }

    if (currentSection.trim()) {
        sections.push({
            name: currentTitle,
            text: currentSection.trim()
        });
    }

    return sections.length > 0 ? sections : [{
        name: 'Full Constitution',
        text: text
    }];
}

// Find the most relevant section
function findRelevantSection(question, sections) {
    const questionLower = question.toLowerCase();

    // Check for specific amendment numbers
    const amendmentNames = {
        "first": "Amendment I",
        "second": "Amendment II",
        "third": "Amendment III",
        "fourth": "Amendment IV",
        "fifth": "Amendment V",
        "sixth": "Amendment VI",
        "seventh": "Amendment VII",
        "eighth": "Amendment VIII",
        "ninth": "Amendment IX",
        "tenth": "Amendment X",
        "thirteenth": "Amendment XIII",
        "fourteenth": "Amendment XIV",
        "fifteenth": "Amendment XV",
        "nineteenth": "Amendment XIX",
        "twenty-first": "Amendment XXI",
        "twenty-sixth": "Amendment XXVI"
    };

    for (const [ordinal, amendmentTitle] of Object.entries(amendmentNames)) {
        if (questionLower.includes(ordinal)) {
            for (const section of sections) {
                if (section.name.includes(amendmentTitle)) {
                    return section;
                }
            }
        }
    }

    // Check for "amendment X" format
    const amendmentMatch = questionLower.match(/amendment\s+(\d+)/);
    if (amendmentMatch) {
        const num = parseInt(amendmentMatch[1]);
        const romanNums = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                          'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
                          'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII'];
        if (num < romanNums.length) {
            for (const section of sections) {
                if (section.name.includes(`Amendment ${romanNums[num]}`)) {
                    return section;
                }
            }
        }
    }

    // Score sections
    let bestSection = sections[0];
    let bestScore = 0;

    const keywords = {
        "congress": 5, "house": 4, "senate": 4, "representative": 3,
        "vote": 3, "elect": 3, "president": 4, "executive": 3,
        "court": 3, "judicial": 3, "judge": 3, "law": 2, "power": 2,
        "state": 2, "people": 1, "right": 3, "freedom": 3,
        "speech": 3, "religion": 3, "press": 3
    };

    for (const section of sections) {
        const sectionText = section.text.toLowerCase();
        const sectionName = section.name.toLowerCase();
        let score = 0;

        for (const [keyword, weight] of Object.entries(keywords)) {
            if (questionLower.includes(keyword) && sectionText.includes(keyword)) {
                score += weight * 2;
            } else if (sectionText.includes(keyword)) {
                score += weight;
            }
        }

        if (questionLower.includes("congress") && sectionName.includes("article i")) score += 10;
        if (questionLower.includes("president") && sectionName.includes("article ii")) score += 10;
        if (questionLower.includes("court") && sectionName.includes("article iii")) score += 10;

        if (score > bestScore) {
            bestScore = score;
            bestSection = section;
        }
    }

    return bestSection;
}

// Calculate relevance score
function calculateRelevanceScore(question, section) {
    const questionLower = question.toLowerCase();
    const sectionText = section.text.toLowerCase();
    const sectionName = section.name.toLowerCase();

    const topicKeywords = ["congress", "house", "senate", "representative",
                          "president", "executive", "court", "judge", "amendment"];
    const topicMatches = topicKeywords.filter(keyword =>
        questionLower.includes(keyword) && (sectionText.includes(keyword) || sectionName.includes(keyword))
    ).length;

    const contentKeywords = ["power", "law", "bill", "vote", "right", "freedom",
                           "speech", "religion", "press", "state", "people"];
    const contentMatches = contentKeywords.filter(keyword => sectionText.includes(keyword)).length;

    let relevanceScore = 50 + (topicMatches * 20) + Math.min(contentMatches * 5, 20);
    return Math.min(100, Math.max(50, relevanceScore));
}

// Main answer function
function getConstitutionAnswer(question) {
    const sections = splitIntoSections(CONSTITUTION_TEXT);
    const section = findRelevantSection(question, sections);
    const relevanceScore = calculateRelevanceScore(question, section);

    let sectionText = section.text;
    if (sectionText.length > 800) {
        sectionText = sectionText.substring(0, 800) + "\n\n[... text truncated ...]";
    }

    let interpretation;
    if (relevanceScore >= 90) {
        interpretation = "✓✓ The Constitution directly and comprehensively addresses this topic.";
    } else if (relevanceScore >= 75) {
        interpretation = "✓ The Constitution clearly addresses this topic.";
    } else if (relevanceScore >= 65) {
        interpretation = "◆ This topic is well covered in the Constitution.";
    } else if (relevanceScore >= 55) {
        interpretation = "◆ The Constitution addresses this topic.";
    } else {
        interpretation = "◊ This topic may require additional interpretation.";
    }

    return {
        question: question,
        section_name: section.name,
        section_text: sectionText,
        relevance_score: relevanceScore,
        interpretation: interpretation
    };
}
