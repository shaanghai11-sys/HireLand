import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import crypto from "crypto";
import os from "os";
import path from "path";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import { performance } from "perf_hooks";
import multer from "multer";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
app.use(express.json({ limit: "512kb" }));

// Monaco is served locally after `npm install`, so CodeForge does not
// depend on a CDN for its IDE.
app.use(
  "/vendor/monaco",
  express.static(path.join(process.cwd(), "node_modules", "monaco-editor", "min", "vs"))
);

app.use(express.static("."));


// ===== Interview Arena =====
const interviewSessions = new Map();
const INTERVIEW_SESSION_TTL_MS = 2 * 60 * 60 * 1000;
const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 }
});

const interviewOpeningSchema = {
  type:"object",
  additionalProperties:false,
  properties:{
    welcome:{type:"string"},
    question:{type:"string"},
    focus:{type:"string"},
    interviewerName:{type:"string"},
    questionType:{type:"string"}
  },
  required:["welcome","question","focus","interviewerName","questionType"]
};

const interviewTurnSchema = {
  type:"object",
  additionalProperties:false,
  properties:{
    nextQuestion:{type:"string"},
    interviewerReaction:{type:"string"},
    signal:{type:"string"},
    focus:{type:"string"},
    questionType:{type:"string"},
    pressureDelta:{type:"integer",minimum:-8,maximum:8},
    contradictionDetected:{type:"boolean"},
    contradictionNote:{type:"string"}
  },
  required:["nextQuestion","interviewerReaction","signal","focus","questionType","pressureDelta","contradictionDetected","contradictionNote"]
};

const interviewDebriefSchema = {
  type:"object",
  additionalProperties:false,
  properties:{
    summary:{type:"string"},
    strengths:{type:"array",items:{type:"string"},minItems:2,maxItems:5},
    improvements:{type:"array",items:{type:"string"},minItems:2,maxItems:5},
    recommendedFocus:{type:"array",items:{type:"string"},minItems:2,maxItems:5}
  },
  required:["summary","strengths","improvements","recommendedFocus"]
};

setInterval(() => {
  const cutoff = Date.now() - INTERVIEW_SESSION_TTL_MS;
  for (const [id, session] of interviewSessions) {
    if (session.createdAt < cutoff) interviewSessions.delete(id);
  }
}, 15 * 60 * 1000).unref();

function cleanInterviewText(value, max = 24000) {
  return String(value || "").replace(/\0/g, "").trim().slice(0, max);
}

function pressureDescriptor(value) {
  if (value <= 20) return "calm and spacious";
  if (value <= 45) return "balanced and realistic";
  if (value <= 70) return "probing and demanding";
  return "intense, skeptical, and high-pressure";
}


function interviewRandomToken() {
  return crypto.randomBytes(8).toString("hex");
}

function interviewerBehaviourSpec(config) {
  const specs = {
    "Calm & Supportive": {
      questioning:"Give the candidate room to think. Probe gently, but still insist on concrete evidence.",
      contradiction:"If something conflicts, ask a calm clarification instead of accusing.",
      cadence:"measured"
    },
    "Neutral & Professional": {
      questioning:"Be concise, realistic, and minimally leading. Follow evidence and gaps.",
      contradiction:"Surface inconsistencies neutrally and ask the candidate to reconcile them.",
      cadence:"natural"
    },
    "Skeptical & Probing": {
      questioning:"Challenge unsupported claims, assumptions, vague ownership, and convenient hindsight.",
      contradiction:"Actively compare new claims with earlier answers and résumé evidence. If there is a real mismatch, quote the two claims briefly and ask the candidate to reconcile them.",
      cadence:"deliberate"
    },
    "Rapid Fire": {
      questioning:"Use shorter questions, quicker pivots, and occasional concise follow-ups. Do not let vague answers pass.",
      contradiction:"Return quickly to a prior claim when it creates tension with the current answer.",
      cadence:"fast"
    },
    "Executive": {
      questioning:"Push for concise judgment, prioritization, business impact, and trade-offs. Interrupt long abstractions with a sharper question.",
      contradiction:"Challenge inconsistency in priorities, ownership, or claimed impact.",
      cadence:"controlled"
    }
  };
  return specs[config.behaviour] || specs["Neutral & Professional"];
}

function companyLensSpec(company) {
  const lenses = {
    Amazon:"Use public, high-level Amazon-style signals such as ownership, customer impact, measurable results, dive-deep reasoning, and trade-offs. Do not claim internal hiring knowledge.",
    Google:"Use public, high-level signals such as structured problem solving, technical depth, collaboration, ambiguity handling, and clear reasoning. Do not claim internal hiring knowledge.",
    Microsoft:"Use public, high-level signals such as customer focus, collaboration, growth mindset, technical judgment, and inclusive leadership. Do not claim internal hiring knowledge.",
    Startup:"Bias toward speed, ownership, ambiguity, resource constraints, pragmatic trade-offs, and learning velocity.",
    Consulting:"Bias toward structured thinking, communication, client judgment, prioritization, commercial awareness, and defensible recommendations.",
    General:"Use realistic professional interview standards without assuming a specific company rubric."
  };
  return lenses[company] || `Treat ${company} as a general public company lens. Do not invent proprietary interview rubrics or internal processes.`;
}

function fallbackInterviewQuestion(config, turn = 0) {
  const role = config.targetRole || "this role";
  const mode = config.mode || "Mixed";

  const banks = {
    Behavioral: [
      `Tell me about a time you had to take ownership of something important while working with incomplete information. What did you do?`,
      `Describe a disagreement with a teammate or stakeholder. How did you decide what to push on and what to compromise on?`,
      `Give me an example of a decision you would handle differently now. What changed in your judgment?`,
      `Tell me about a time your initial plan failed. How did you recognize it and recover?`
    ],
    Technical: [
      `For a ${role} interview, pick one technical system or project you understand deeply. Walk me through the hardest engineering decision in it.`,
      `What technical trade-off do candidates for ${role} often oversimplify? Explain how you would reason about it in practice.`,
      `Suppose a system you own suddenly becomes unreliable under load. How would you structure the investigation before changing anything?`,
      `Explain a technical decision where the simplest-looking solution would actually be the wrong one.`
    ],
    "System Design": [
      `Design a production system relevant to ${role} that must remain reliable as usage grows by 100×. Start with requirements and the first architectural boundary you would draw.`,
      `How would you design an observable service where failures are intermittent and difficult to reproduce?`,
      `You need to reduce latency without materially increasing cost. What parts of the architecture would you inspect first, and why?`,
      `Walk me through how you would make a service resilient to dependency failures without hiding real incidents.`
    ],
    Managerial: [
      `You inherit a team with strong individuals but weak execution predictability. What do you diagnose before changing process?`,
      `A high performer repeatedly creates friction with the rest of the team. How would you handle it?`,
      `How do you decide when a problem needs coaching, process change, or a personnel decision?`,
      `Tell me how you would prioritize when three senior stakeholders all believe their project is the most urgent.`
    ],
    Mixed: [
      `Give me the two-minute version of your background and why ${role} is the right next move for you.`,
      `Choose one project from your experience that best represents how you think. What was genuinely difficult about it?`,
      `Tell me about a technical or professional judgment call where there was no obviously correct answer.`,
      `If I joined your last project tomorrow, what design or execution choice would you most want me to understand before changing anything?`
    ]
  };

  const bank = banks[mode] || banks.Mixed;
  return bank[turn % bank.length];
}

async function generateInterviewOpening(config, jobDescription, resumeText, sessionSeed) {
  const firstNameHint = "";
  const welcomeFallback = `Hello, welcome to your ${config.targetRole} interview. I’ll be your interviewer today. We’ll start with a brief introduction and then move into the interview.`;
  const firstQuestion = `To begin, tell me about yourself, your background, and what makes you interested in this ${config.targetRole} role.`;

  if (!process.env.OPENAI_API_KEY) {
    return {
      welcome: welcomeFallback,
      question: firstQuestion,
      focus: "Introduction",
      interviewerName: "Hireland Interviewer",
      questionType: "WELCOME"
    };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const behaviour = interviewerBehaviourSpec(config);
  const companyLens = companyLensSpec(config.company);

  const prompt = `
You are the opening interviewer in Hireland, a realistic mock interview.

Randomization seed: ${sessionSeed}

Interview:
- Role: ${config.targetRole}
- Experience: ${config.experience}
- Mode: ${config.mode}
- Behaviour: ${config.behaviour}
- Company lens: ${config.company}
- Duration: ${config.sessionLength} minutes
- Pressure: ${config.pressure}/100

Behaviour specification:
${behaviour.questioning}

Company lens:
${companyLens}

Job description:
${jobDescription || "Not provided."}

Candidate résumé:
${resumeText || "Not provided."}

Create the FIRST turn only.

Requirements:
1. Start with a natural professional welcome, 1-2 short sentences.
2. Do NOT begin with a technical question.
3. The first question must ask the candidate to introduce themselves / explain their background and interest in the role.
4. It should sound like a real interviewer speaking aloud, not like a chatbot or assessment tool.
5. Do not coach or evaluate the candidate yet.
6. interviewerName should be a short professional first name. Vary it across sessions using the randomization seed.
7. questionType must be "WELCOME".
8. focus must be "Introduction".
`;

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      store: false,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "interview_opening",
          strict: true,
          schema: interviewOpeningSchema
        }
      }
    });

    const parsed = JSON.parse(response.output_text);
    parsed.question = parsed.question || firstQuestion;
    parsed.welcome = parsed.welcome || welcomeFallback;
    parsed.questionType = "WELCOME";
    parsed.focus = "Introduction";
    return parsed;
  } catch (error) {
    console.error("Interview opening generation failed:", error);
    return {
      welcome: welcomeFallback,
      question: firstQuestion,
      focus: "Introduction",
      interviewerName: "Alex",
      questionType: "WELCOME"
    };
  }
}

async function generateInterviewFollowUp(session, answer) {
  const turn = session.history.length;
  const behaviour = interviewerBehaviourSpec(session.config);
  const companyLens = companyLensSpec(session.config.company);
  const entropy = interviewRandomToken();

  if (!process.env.OPENAI_API_KEY) {
    const wordCount = answer.split(/\s+/).filter(Boolean).length;
    const pressureDelta = wordCount < 35 ? 4 : wordCount > 160 ? -1 : 1;

    return {
      nextQuestion: fallbackInterviewQuestion(session.config, turn + Math.floor(Math.random() * 3)),
      interviewerReaction: wordCount < 35
        ? "I want to go one level deeper on that answer."
        : "Thank you. I’m going to build on one part of that.",
      signal: wordCount < 35 ? "Probe deeper" : "Follow-up",
      focus: session.config.mode === "Technical" ? "Technical Depth" : "Judgment",
      questionType: wordCount < 35 ? "COUNTER" : "FOLLOW-UP",
      pressureDelta,
      contradictionDetected:false,
      contradictionNote:""
    };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const history = session.history.slice(-8).map((item, index) =>
    `Prior turn ${index + 1}
Question: ${item.question}
Candidate answer: ${item.answer}`
  ).join("\n\n");

  const usedQuestions = session.usedQuestions.slice(-10).map((q, i) => `${i+1}. ${q}`).join("\n");

  const prompt = `
You are conducting a live, realistic interview. Generate exactly ONE next interviewer turn.

Entropy token for variety: ${entropy}
Session random seed: ${session.randomSeed}

Configuration:
- Target role: ${session.config.targetRole}
- Experience: ${session.config.experience}
- Interview mode: ${session.config.mode}
- Interviewer behaviour: ${session.config.behaviour}
- Company lens: ${session.config.company}
- Current pressure: ${session.pressure}/100 (${pressureDescriptor(session.pressure)})
- Session duration: ${session.config.sessionLength} minutes
- Current turn: ${turn + 1}

Behaviour:
${behaviour.questioning}
Contradiction handling:
${behaviour.contradiction}
Cadence:
${behaviour.cadence}

Company lens:
${companyLens}

Job description:
${session.jobDescription || "Not provided"}

Résumé:
${session.resumeText || "Not provided"}

Conversation so far:
${history || "No previous turns"}

Most recent candidate answer:
${answer}

Questions already used in this session:
${usedQuestions || "None"}

Your job:
- React to the candidate's actual answer, not a fixed script.
- Ask ONE question only.
- Do not repeat a question already used.
- Randomize the competency/order within the selected interview mode while staying relevant.
- Use the résumé and JD when they create a meaningful follow-up.
- Counter-question when the answer is vague, overconfident, unsupported, evasive, or leaves an important trade-off unexplained.
- Test ownership: distinguish "I" from "we", ask what the candidate personally decided or built.
- Test numbers: if they claim a metric or impact, ask how it was measured when useful.
- Test judgment: present a plausible alternative or downside and ask them to defend their decision.
- Test consistency: compare the current answer with PRIOR ANSWERS and résumé claims.
- If there is a genuine contradiction, inconsistency, or tension, ask a pointed but professional reconciliation question. Never invent a contradiction.
- It is acceptable to pressure the candidate by narrowing time, asking for a direct answer, challenging assumptions, or questioning evidence, depending on configured pressure.
- Do NOT insult, humiliate, threaten, or use gotcha tricks unrelated to job signal.
- If there is no real contradiction, contradictionDetected must be false.
- contradictionNote should briefly identify the two conflicting claims only when contradictionDetected is true; otherwise return an empty string.
- questionType must be one of: FOLLOW-UP, COUNTER, CONTRADICTION, DEEP-DIVE, SCENARIO, BEHAVIORAL, TECHNICAL, SYSTEM-DESIGN, MANAGERIAL.
- pressureDelta must be between -8 and +8.
- interviewerReaction is one brief natural spoken sentence that can precede the question. It must not contain coaching.
`;

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      store: false,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "interview_turn",
          strict: true,
          schema: interviewTurnSchema
        }
      }
    });

    return JSON.parse(response.output_text);
  } catch (error) {
    console.error("Interview follow-up generation failed:", error);

    return {
      nextQuestion: fallbackInterviewQuestion(session.config, turn + Math.floor(Math.random() * 3)),
      interviewerReaction: "I want to test that answer from another angle.",
      signal: "Follow-up",
      focus: "Judgment",
      questionType: "COUNTER",
      pressureDelta: 1,
      contradictionDetected:false,
      contradictionNote:""
    };
  }
}

async function generateInterviewDebrief(session) {
  const fallback = {
    summary: `You completed a ${session.config.mode.toLowerCase()} practice interview for ${session.config.targetRole}. The next step is to make your strongest answers more specific and evidence-led.`,
    strengths: [
      "You completed the interview flow and responded under the configured interview conditions.",
      "Your answers created enough material to practice follow-up questioning and pressure changes."
    ],
    improvements: [
      "Use clearer evidence: situation, decision, trade-off, action, and measurable result.",
      "Separate what you personally decided from what the wider team did."
    ],
    recommendedFocus: [
      `Practice two high-quality ${session.config.mode.toLowerCase()} stories for ${session.config.targetRole}.`,
      "Repeat the session at slightly higher adaptive pressure after tightening your examples."
    ]
  };

  if (!process.env.OPENAI_API_KEY || !session.history.length) return fallback;

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const transcript = session.history.map((item, index) =>
      `Question ${index + 1}: ${item.question}\nAnswer ${index + 1}: ${item.answer}`
    ).join("\n\n");

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      store: false,
      input: `
Create a concise post-interview debrief for the candidate.

Role: ${session.config.targetRole}
Experience: ${session.config.experience}
Mode: ${session.config.mode}
Company lens: ${session.config.company}
Interviewer behaviour: ${session.config.behaviour}

Transcript:
${transcript}

Give grounded feedback based on the transcript only.
Do not invent achievements or weaknesses that are not supported.
Make strengths and improvements specific enough to practice next.
`,
      text: {
        format: {
          type: "json_schema",
          name: "interview_debrief",
          strict: true,
          schema: interviewDebriefSchema
        }
      }
    });

    return JSON.parse(response.output_text);
  } catch (error) {
    console.error("Interview debrief failed:", error);
    return fallback;
  }
}

app.post("/api/interview/resume/extract", resumeUpload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No résumé file received." });

    const filename = req.file.originalname || "resume";
    const ext = path.extname(filename).toLowerCase();
    let text = "";

    if (ext === ".pdf") {
      const parsed = await pdfParse(req.file.buffer);
      text = parsed.text || "";
    } else if (ext === ".docx") {
      const parsed = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = parsed.value || "";
    } else if (ext === ".txt" || ext === ".md") {
      text = req.file.buffer.toString("utf8");
    } else {
      return res.status(415).json({ error: "Use a PDF, DOCX, TXT, or MD résumé." });
    }

    text = cleanInterviewText(text, 30000);

    if (!text) {
      return res.status(422).json({
        error: "The résumé file was read, but no usable text could be extracted."
      });
    }

    return res.json({
      filename,
      text,
      characters: text.length,
      words: text.split(/\s+/).filter(Boolean).length
    });
  } catch (error) {
    console.error("Resume extraction failed:", error);
    return res.status(500).json({ error: "Could not extract text from this résumé." });
  }
});

app.post("/api/interview/session", async (req, res) => {
  try {
    const body = req.body || {};
    const config = {
      targetRole: cleanInterviewText(body.targetRole, 160),
      experience: cleanInterviewText(body.experience, 80),
      mode: cleanInterviewText(body.mode, 80),
      behaviour: cleanInterviewText(body.behaviour, 100),
      company: cleanInterviewText(body.company, 120),
      sessionLength: Math.max(10, Math.min(90, Number(body.sessionLength) || 30)),
      pressure: Math.max(0, Math.min(100, Number(body.pressure) || 40))
    };

    if (!config.targetRole) {
      return res.status(400).json({ error: "Target role is required." });
    }

    const jobDescription = cleanInterviewText(body.jobDescription, 30000);
    const resumeText = cleanInterviewText(body.resumeText, 30000);

    const randomSeed = interviewRandomToken();
    const opening = await generateInterviewOpening(config, jobDescription, resumeText, randomSeed);
    const id = crypto.randomUUID();

    const session = {
      id,
      createdAt: Date.now(),
      randomSeed,
      config,
      jobDescription,
      resumeText,
      pressure: config.pressure,
      history: [],
      usedQuestions:[opening.question],
      interviewerName: opening.interviewerName || "Hireland Interviewer",
      currentQuestion: opening.question
    };

    interviewSessions.set(id, session);

    return res.json({
      sessionId: id,
      welcome: opening.welcome,
      interviewerName: session.interviewerName,
      question: opening.question,
      focus: opening.focus,
      questionType: opening.questionType,
      pressure: session.pressure,
      aiConfigured: Boolean(process.env.OPENAI_API_KEY)
    });
  } catch (error) {
    console.error("Interview session start failed:", error);
    return res.status(500).json({ error: "Could not start the interview session." });
  }
});

app.post("/api/interview/respond", async (req, res) => {
  try {
    const { sessionId } = req.body || {};
    const answer = cleanInterviewText(req.body?.answer, 12000);
    const session = interviewSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Interview session expired. Start a new interview." });
    }

    if (!answer) {
      return res.status(400).json({ error: "Answer cannot be empty." });
    }

    session.history.push({
      question: session.currentQuestion,
      answer
    });

    const next = await generateInterviewFollowUp(session, answer);
    session.pressure = Math.max(0, Math.min(100, session.pressure + Number(next.pressureDelta || 0)));
    session.currentQuestion = next.nextQuestion;
    session.usedQuestions.push(next.nextQuestion);

    return res.json({
      question: next.nextQuestion,
      interviewerReaction: next.interviewerReaction,
      signal: next.signal,
      focus: next.focus,
      questionType: next.questionType,
      contradictionDetected: next.contradictionDetected,
      contradictionNote: next.contradictionNote,
      pressure: session.pressure,
      turn: session.history.length + 1
    });
  } catch (error) {
    console.error("Interview response failed:", error);
    return res.status(500).json({ error: "Could not continue the interview." });
  }
});

app.post("/api/interview/end", async (req, res) => {
  try {
    const { sessionId } = req.body || {};
    const session = interviewSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Interview session expired." });
    }

    const debrief = await generateInterviewDebrief(session);

    return res.json({
      ...debrief,
      turns: session.history.length,
      pressure: session.pressure,
      role: session.config.targetRole
    });
  } catch (error) {
    console.error("Interview end failed:", error);
    return res.status(500).json({ error: "Could not build the interview debrief." });
  }
});

const allowedLanguages = new Set(["JavaScript","Python","Java","C++"]);
const allowedDifficulties = new Set(["Easy","Medium","Hard"]);
const allowedFocus = new Set(["Any","Algorithms & Data Structures","Practical Implementation","Debugging & Reasoning"]);
const sessions = new Map();
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;
const TEST_TIMEOUT_MS = Number(process.env.CODEFORGE_TEST_TIMEOUT_MS || 3000);
const MAX_OUTPUT_BYTES = 128 * 1024;

setInterval(() => {
  const cutoff = Date.now() - SESSION_TTL_MS;
  for (const [id, s] of sessions) if (s.createdAt < cutoff) sessions.delete(id);
}, 15 * 60 * 1000).unref();

const visibleTestSchema = {
  type:"object", additionalProperties:false,
  properties:{input:{type:"string"},expectedOutput:{type:"string"},explanation:{type:"string"}},
  required:["input","expectedOutput","explanation"]
};
const hiddenTestSchema = {
  type:"object", additionalProperties:false,
  properties:{input:{type:"string"},expectedOutput:{type:"string"}},
  required:["input","expectedOutput"]
};
const challengeSchema = {
  type:"object", additionalProperties:false,
  properties:{
    title:{type:"string"},
    difficulty:{type:"string",enum:["Easy","Medium","Hard"]},
    sourceLabel:{type:"string"},
    statement:{type:"string"},
    inputFormat:{type:"string"},
    outputFormat:{type:"string"},
    constraints:{type:"array",items:{type:"string"},minItems:2,maxItems:8},
    examples:{type:"array",items:visibleTestSchema,minItems:1,maxItems:3},
    sampleTests:{type:"array",items:visibleTestSchema,minItems:2,maxItems:4},
    hiddenTests:{type:"array",items:hiddenTestSchema,minItems:3,maxItems:8},
    bestSolution:{type:"string"},
    bestTimeComplexity:{type:"string"},
    bestSpaceComplexity:{type:"string"}
  },
  required:["title","difficulty","sourceLabel","statement","inputFormat","outputFormat","constraints","examples","sampleTests","hiddenTests","bestSolution","bestTimeComplexity","bestSpaceComplexity"]
};
const complexitySchema = {
  type:"object", additionalProperties:false,
  properties:{
    timeComplexity:{type:"string"},
    spaceComplexity:{type:"string"},
    timeNote:{type:"string"},
    spaceNote:{type:"string"},
    reviewSummary:{type:"string"},
    strengths:{type:"array",items:{type:"string"},minItems:1,maxItems:4},
    improvements:{type:"array",items:{type:"string"},minItems:1,maxItems:4}
  },
  required:["timeComplexity","spaceComplexity","timeNote","spaceNote","reviewSummary","strengths","improvements"]
};

function normalizeOutput(v){return String(v??"").replace(/\r\n/g,"\n").replace(/[ \t]+$/gm,"").trim();}
function starter(language){
  return {
    JavaScript:`const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();

function solve(input) {
  // Write your solution here
  return "";
}

const result = solve(input);
if (result !== undefined) process.stdout.write(String(result));`,
    Python:`import sys

def solve(input_data):
    # Write your solution here
    return ""

input_data = sys.stdin.read().strip()
result = solve(input_data)
if result is not None:
    sys.stdout.write(str(result))`,
    Java:`import java.io.*;
import java.util.*;

public class Main {
    static String solve(String input) {
        // Write your solution here
        return "";
    }
    public static void main(String[] args) throws Exception {
        String input = new String(System.in.readAllBytes()).trim();
        System.out.print(solve(input));
    }
}`,
    "C++":`#include <bits/stdc++.h>
using namespace std;

string solve(const string& input) {
    // Write your solution here
    return "";
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    while (!input.empty() && (input.back() == '\\n' || input.back() == '\\r')) input.pop_back();
    cout << solve(input);
}`
  }[language];
}

const best = {
  firstUnique:{
    JavaScript:`const fs=require("fs");const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);const n=d[0],a=d.slice(1,n+1),f=new Map();for(const x of a)f.set(x,(f.get(x)||0)+1);let ans=-1;for(const x of a)if(f.get(x)===1){ans=x;break}process.stdout.write(String(ans));`,
    Python:`import sys
d=list(map(int,sys.stdin.read().split()));n=d[0];a=d[1:1+n];f={}
for x in a:f[x]=f.get(x,0)+1
ans=-1
for x in a:
    if f[x]==1:ans=x;break
print(ans,end="")`,
    Java:`import java.io.*;import java.util.*;public class Main{public static void main(String[]a)throws Exception{Scanner s=new Scanner(System.in);int n=s.nextInt();int[]v=new int[n];Map<Integer,Integer>f=new HashMap<>();for(int i=0;i<n;i++){v[i]=s.nextInt();f.put(v[i],f.getOrDefault(v[i],0)+1);}int ans=-1;for(int x:v)if(f.get(x)==1){ans=x;break;}System.out.print(ans);}}`,
    "C++":`#include <bits/stdc++.h>
using namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;vector<long long>a(n);unordered_map<long long,int>f;for(auto&x:a){cin>>x;f[x]++;}long long ans=-1;for(auto x:a)if(f[x]==1){ans=x;break;}cout<<ans;}`
  },
  eventWindow:{
    JavaScript:`const fs=require("fs");const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);const n=d[0],w=d[1],a=d.slice(2,2+n);let l=0,b=0;for(let r=0;r<n;r++){while(a[r]-a[l]>w)l++;b=Math.max(b,r-l+1)}process.stdout.write(String(b));`,
    Python:`import sys
d=list(map(int,sys.stdin.read().split()));n,w=d[0],d[1];a=d[2:2+n];l=b=0
for r in range(n):
    while a[r]-a[l]>w:l+=1
    b=max(b,r-l+1)
print(b,end="")`,
    Java:`import java.io.*;import java.util.*;public class Main{public static void main(String[]a)throws Exception{Scanner s=new Scanner(System.in);int n=s.nextInt();long w=s.nextLong();long[]v=new long[n];for(int i=0;i<n;i++)v[i]=s.nextLong();int l=0,b=0;for(int r=0;r<n;r++){while(v[r]-v[l]>w)l++;b=Math.max(b,r-l+1);}System.out.print(b);}}`,
    "C++":`#include <bits/stdc++.h>
using namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;long long w;cin>>n>>w;vector<long long>a(n);for(auto&x:a)cin>>x;int l=0,b=0;for(int r=0;r<n;r++){while(a[r]-a[l]>w)l++;b=max(b,r-l+1);}cout<<b;}`
  },
  longestPath:{
    JavaScript:`const fs=require("fs");const d=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);let k=0;const m=d[k++],n=d[k++],a=Array.from({length:m},()=>Array.from({length:n},()=>d[k++])),memo=Array.from({length:m},()=>Array(n).fill(0)),D=[[1,0],[-1,0],[0,1],[0,-1]];function dfs(r,c){if(memo[r][c])return memo[r][c];let b=1;for(const[dr,dc]of D){const x=r+dr,y=c+dc;if(x>=0&&x<m&&y>=0&&y<n&&a[x][y]>a[r][c])b=Math.max(b,1+dfs(x,y))}return memo[r][c]=b}let ans=0;for(let r=0;r<m;r++)for(let c=0;c<n;c++)ans=Math.max(ans,dfs(r,c));process.stdout.write(String(ans));`,
    Python:`import sys
sys.setrecursionlimit(1000000);d=list(map(int,sys.stdin.read().split()));it=iter(d);m=next(it);n=next(it);a=[[next(it) for _ in range(n)]for _ in range(m)];memo=[[0]*n for _ in range(m)];D=((1,0),(-1,0),(0,1),(0,-1))
def dfs(r,c):
    if memo[r][c]:return memo[r][c]
    b=1
    for dr,dc in D:
        x,y=r+dr,c+dc
        if 0<=x<m and 0<=y<n and a[x][y]>a[r][c]:b=max(b,1+dfs(x,y))
    memo[r][c]=b;return b
print(max(dfs(r,c) for r in range(m) for c in range(n)),end="")`,
    Java:`import java.io.*;import java.util.*;public class Main{static int m,n;static int[][]a,z;static int[][]D={{1,0},{-1,0},{0,1},{0,-1}};static int f(int r,int c){if(z[r][c]>0)return z[r][c];int b=1;for(int[]d:D){int x=r+d[0],y=c+d[1];if(x>=0&&x<m&&y>=0&&y<n&&a[x][y]>a[r][c])b=Math.max(b,1+f(x,y));}return z[r][c]=b;}public static void main(String[]q){Scanner s=new Scanner(System.in);m=s.nextInt();n=s.nextInt();a=new int[m][n];z=new int[m][n];for(int i=0;i<m;i++)for(int j=0;j<n;j++)a[i][j]=s.nextInt();int ans=0;for(int i=0;i<m;i++)for(int j=0;j<n;j++)ans=Math.max(ans,f(i,j));System.out.print(ans);}}`,
    "C++":`#include <bits/stdc++.h>
using namespace std;int m,n;vector<vector<int>>a,z;int dr[4]={1,-1,0,0},dc[4]={0,0,1,-1};int f(int r,int c){int&v=z[r][c];if(v)return v;v=1;for(int k=0;k<4;k++){int x=r+dr[k],y=c+dc[k];if(x>=0&&x<m&&y>=0&&y<n&&a[x][y]>a[r][c])v=max(v,1+f(x,y));}return v;}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);cin>>m>>n;a.assign(m,vector<int>(n));z.assign(m,vector<int>(n));for(auto&r:a)for(auto&x:r)cin>>x;int ans=0;for(int i=0;i<m;i++)for(int j=0;j<n;j++)ans=max(ans,f(i,j));cout<<ans;}`
  }
};


function indentBlock(code, spaces) {
  const prefix = " ".repeat(spaces);
  const normalized = String(code || "").replace(/\r\n/g, "\n").trim();

  if (!normalized) {
    return prefix + ({
      2: `return "";`,
      4: `return "";`
    }[spaces] || `return "";`);
  }

  return normalized.split("\n").map(line => prefix + line).join("\n");
}

function looksLikeCompleteProgram(language, code) {
  const raw = String(code || "");

  if (language === "Python") {
    return (
      /\binput\s*\(/.test(raw) ||
      /\bsys\.stdin\b/.test(raw) ||
      /\bstdin\.read\b/.test(raw)
    );
  }

  if (language === "JavaScript") {
    return (
      /\brequire\s*\(\s*["']fs["']\s*\)/.test(raw) ||
      /\bprocess\.stdin\b/.test(raw) ||
      /\breadFileSync\s*\(\s*0\b/.test(raw)
    );
  }

  if (language === "Java") {
    return (
      /\bpublic\s+static\s+void\s+main\s*\(/.test(raw) ||
      /\bstatic\s+void\s+main\s*\(/.test(raw)
    );
  }

  return /\b(?:int|signed)\s+main\s*\(/.test(raw);
}

function normalizeCompleteProgram(language, code) {
  let raw = String(code || "").replace(/\r\n/g, "\n").trim();

  if (language === "Java") {
    // Package declarations do not work in the temporary single-file judge.
    raw = raw.replace(/^\s*package\s+[\w.]+\s*;\s*/m, "");

    // Hireland compiles Main.java, so normalize the user's outer class name.
    if (!/\bpublic\s+class\s+Main\b/.test(raw)) {
      if (/\bpublic\s+class\s+[A-Za-z_]\w*/.test(raw)) {
        raw = raw.replace(
          /\bpublic\s+class\s+[A-Za-z_]\w*/,
          "public class Main"
        );
      } else if (/\bclass\s+[A-Za-z_]\w*/.test(raw)) {
        raw = raw.replace(
          /\bclass\s+[A-Za-z_]\w*/,
          "public class Main"
        );
      }
    }
  }

  return raw;
}

function wrapCandidateCode(language, candidateCode) {
  const raw = String(candidateCode || "").replace(/\r\n/g, "\n").trim();

  // Normal competitive-programming code is executed exactly as the user
  // wrote it. No Hireland function wrapper is added.
  if (looksLikeCompleteProgram(language, raw)) {
    return normalizeCompleteProgram(language, raw);
  }

  // Solution-only mode remains available for users who do not write their
  // own stdin/main boilerplate.
  if (language === "JavaScript") {
    const definitions = /\bfunction\s+solve\s*\(/.test(raw)
      ? raw
      : `function solve(input) {
${indentBlock(raw, 2)}
}`;

    return `const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();

${definitions}

const result = solve(input);
if (result !== undefined) process.stdout.write(String(result));`;
  }

  if (language === "Python") {
    const definitions = /^\s*def\s+solve\s*\(/m.test(raw)
      ? raw
      : `def solve(input_data):
${raw ? raw.split("\n").map(line => "    " + line).join("\n") : '    return ""'}`;

    return `import sys

${definitions}

input_data = sys.stdin.read().strip()
result = solve(input_data)
if result is not None:
    sys.stdout.write(str(result))`;
  }

  if (language === "Java") {
    const definitions = /\bstatic\s+String\s+solve\s*\(/.test(raw)
      ? raw
      : `static String solve(String input) {
${raw ? raw.split("\n").map(line => "    " + line).join("\n") : '    return "";'}
}`;

    return `import java.io.*;
import java.util.*;

public class Main {
${definitions.split("\n").map(line => "    " + line).join("\n")}

    public static void main(String[] args) throws Exception {
        String input = new String(System.in.readAllBytes()).trim();
        System.out.print(solve(input));
    }
}`;
  }

  const definitions = /\bstring\s+solve\s*\(/.test(raw)
    ? raw
    : `string solve(const string& input) {
${raw ? raw.split("\n").map(line => "    " + line).join("\n") : '    return "";'}
}`;

  return `#include <bits/stdc++.h>
using namespace std;

${definitions}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    while (!input.empty() && (input.back() == '\\n' || input.back() == '\\r')) {
        input.pop_back();
    }

    cout << solve(input);
    return 0;
}`;
}

function referenceSnippet(language, key) {
  const refs = {
    firstUnique: {
      JavaScript:`function solve(input) {
  const data = input.trim().split(/\\s+/).map(Number);
  const n = data[0];
  const values = data.slice(1, n + 1);
  const freq = new Map();

  for (const value of values) {
    freq.set(value, (freq.get(value) || 0) + 1);
  }

  for (const value of values) {
    if (freq.get(value) === 1) return String(value);
  }

  return "-1";
}`,
      Python:`def solve(input_data):
    data = list(map(int, input_data.split()))
    n = data[0]
    values = data[1:1 + n]

    freq = {}
    for value in values:
        freq[value] = freq.get(value, 0) + 1

    for value in values:
        if freq[value] == 1:
            return str(value)

    return "-1"`,
      Java:`static String solve(String input) {
    Scanner sc = new Scanner(input);
    int n = sc.nextInt();
    int[] values = new int[n];
    Map<Integer, Integer> freq = new HashMap<>();

    for (int i = 0; i < n; i++) {
        values[i] = sc.nextInt();
        freq.put(values[i], freq.getOrDefault(values[i], 0) + 1);
    }

    for (int value : values) {
        if (freq.get(value) == 1) return String.valueOf(value);
    }

    return "-1";
}`,
      "C++":`string solve(const string& input) {
    stringstream ss(input);
    int n;
    ss >> n;

    vector<long long> values(n);
    unordered_map<long long, int> freq;

    for (auto& value : values) {
        ss >> value;
        freq[value]++;
    }

    for (long long value : values) {
        if (freq[value] == 1) return to_string(value);
    }

    return "-1";
}`
    },
    eventWindow: {
      JavaScript:`function solve(input) {
  const data = input.trim().split(/\\s+/).map(Number);
  const n = data[0];
  const windowSize = data[1];
  const timestamps = data.slice(2, 2 + n);

  let left = 0;
  let best = 0;

  for (let right = 0; right < n; right++) {
    while (timestamps[right] - timestamps[left] > windowSize) {
      left++;
    }
    best = Math.max(best, right - left + 1);
  }

  return String(best);
}`,
      Python:`def solve(input_data):
    data = list(map(int, input_data.split()))
    n, window_size = data[0], data[1]
    timestamps = data[2:2 + n]

    left = 0
    best = 0

    for right in range(n):
        while timestamps[right] - timestamps[left] > window_size:
            left += 1
        best = max(best, right - left + 1)

    return str(best)`,
      Java:`static String solve(String input) {
    Scanner sc = new Scanner(input);
    int n = sc.nextInt();
    long windowSize = sc.nextLong();
    long[] timestamps = new long[n];

    for (int i = 0; i < n; i++) timestamps[i] = sc.nextLong();

    int left = 0;
    int best = 0;

    for (int right = 0; right < n; right++) {
        while (timestamps[right] - timestamps[left] > windowSize) {
            left++;
        }
        best = Math.max(best, right - left + 1);
    }

    return String.valueOf(best);
}`,
      "C++":`string solve(const string& input) {
    stringstream ss(input);
    int n;
    long long windowSize;
    ss >> n >> windowSize;

    vector<long long> timestamps(n);
    for (auto& value : timestamps) ss >> value;

    int left = 0;
    int best = 0;

    for (int right = 0; right < n; right++) {
        while (timestamps[right] - timestamps[left] > windowSize) {
            left++;
        }
        best = max(best, right - left + 1);
    }

    return to_string(best);
}`
    },
    longestPath: {
      JavaScript:`function solve(input) {
  const data = input.trim().split(/\\s+/).map(Number);
  let index = 0;
  const rows = data[index++];
  const cols = data[index++];

  const matrix = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => data[index++])
  );

  const memo = Array.from({ length: rows }, () => Array(cols).fill(0));
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function dfs(r, c) {
    if (memo[r][c]) return memo[r][c];

    let best = 1;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        matrix[nr][nc] > matrix[r][c]
      ) {
        best = Math.max(best, 1 + dfs(nr, nc));
      }
    }

    memo[r][c] = best;
    return best;
  }

  let answer = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      answer = Math.max(answer, dfs(r, c));
    }
  }

  return String(answer);
}`,
      Python:`def solve(input_data):
    import sys
    sys.setrecursionlimit(1_000_000)

    data = list(map(int, input_data.split()))
    it = iter(data)
    rows, cols = next(it), next(it)
    matrix = [[next(it) for _ in range(cols)] for _ in range(rows)]
    memo = [[0] * cols for _ in range(rows)]
    directions = ((1, 0), (-1, 0), (0, 1), (0, -1))

    def dfs(r, c):
        if memo[r][c]:
            return memo[r][c]

        best = 1

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (
                0 <= nr < rows and
                0 <= nc < cols and
                matrix[nr][nc] > matrix[r][c]
            ):
                best = max(best, 1 + dfs(nr, nc))

        memo[r][c] = best
        return best

    answer = 0

    for r in range(rows):
        for c in range(cols):
            answer = max(answer, dfs(r, c))

    return str(answer)`,
      Java:`static int rows, cols;
static int[][] matrix, memo;
static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};

static int dfs(int r, int c) {
    if (memo[r][c] != 0) return memo[r][c];

    int best = 1;

    for (int[] d : DIRS) {
        int nr = r + d[0];
        int nc = c + d[1];

        if (
            nr >= 0 && nr < rows &&
            nc >= 0 && nc < cols &&
            matrix[nr][nc] > matrix[r][c]
        ) {
            best = Math.max(best, 1 + dfs(nr, nc));
        }
    }

    memo[r][c] = best;
    return best;
}

static String solve(String input) {
    Scanner sc = new Scanner(input);
    rows = sc.nextInt();
    cols = sc.nextInt();
    matrix = new int[rows][cols];
    memo = new int[rows][cols];

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            matrix[r][c] = sc.nextInt();
        }
    }

    int answer = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            answer = Math.max(answer, dfs(r, c));
        }
    }

    return String.valueOf(answer);
}`,
      "C++":`int rows, cols;
vector<vector<int>> matrix;
vector<vector<int>> memo;
int dr[4] = {1, -1, 0, 0};
int dc[4] = {0, 0, 1, -1};

int dfs(int r, int c) {
    int& cached = memo[r][c];
    if (cached) return cached;

    cached = 1;

    for (int k = 0; k < 4; k++) {
        int nr = r + dr[k];
        int nc = c + dc[k];

        if (
            nr >= 0 && nr < rows &&
            nc >= 0 && nc < cols &&
            matrix[nr][nc] > matrix[r][c]
        ) {
            cached = max(cached, 1 + dfs(nr, nc));
        }
    }

    return cached;
}

string solve(const string& input) {
    stringstream ss(input);
    ss >> rows >> cols;

    matrix.assign(rows, vector<int>(cols));
    memo.assign(rows, vector<int>(cols));

    for (auto& row : matrix) {
        for (auto& value : row) ss >> value;
    }

    int answer = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            answer = max(answer, dfs(r, c));
        }
    }

    return to_string(answer);
}`
    }
  };

  return refs[key][language];
}

function fallback(language,difficulty){
  if(difficulty==="Easy")return{
    title:"First Unique Number",difficulty,sourceLabel:"Local Challenge",
    statement:"You are given a sequence of integers in their original order.\n\nFind the first value that appears exactly once in the entire sequence.\n\nIf every value appears more than once, print -1.\n\nYour solution should be efficient enough for large inputs.",
    inputFormat:"The first line contains n — the number of values.\nThe second line contains n space-separated integers.",
    outputFormat:"Print the first value whose total frequency is exactly 1. Print -1 if no such value exists.",
    constraints:["1 ≤ n ≤ 200000","-10^9 ≤ value ≤ 10^9"],
    examples:[{input:"7\n4 5 1 2 1 4 2",expectedOutput:"5",explanation:"5 is the first value that occurs exactly once."}],
    sampleTests:[{input:"7\n4 5 1 2 1 4 2",expectedOutput:"5",explanation:"Typical mixed-frequency case."},{input:"6\n3 3 8 8 9 10",expectedOutput:"9",explanation:"9 is the first unique value."}],
    hiddenTests:[{input:"4\n1 1 2 2",expectedOutput:"-1"},{input:"1\n42",expectedOutput:"42"},{input:"8\n5 6 5 7 6 8 8 9",expectedOutput:"7"},{input:"5\n-1 -1 -2 -3 -2",expectedOutput:"-3"}],
    bestSolution:referenceSnippet(language,"firstUnique"),bestTimeComplexity:"O(n)",bestSpaceComplexity:"O(n)"
  };
  if(difficulty==="Hard")return{
    title:"Longest Increasing Path",difficulty,sourceLabel:"Local Challenge",
    statement:"You are given an m × n integer matrix.\n\nStarting from any cell, you may move one step up, down, left, or right. You may move to a neighbor only when its value is strictly larger.\n\nReturn the maximum number of cells in a valid increasing path.",
    inputFormat:"The first line contains m and n.\nThe next m lines each contain n integers.",
    outputFormat:"Print the length of the longest strictly increasing path.",
    constraints:["1 ≤ m, n ≤ 200","-10^9 ≤ matrix[i][j] ≤ 10^9"],
    examples:[{input:"3 3\n9 9 4\n6 6 8\n2 1 1",expectedOutput:"4",explanation:"One longest path is 1 → 2 → 6 → 9."}],
    sampleTests:[{input:"3 3\n9 9 4\n6 6 8\n2 1 1",expectedOutput:"4",explanation:"Classic branching case."},{input:"3 3\n3 4 5\n3 2 6\n2 2 1",expectedOutput:"4",explanation:"3 → 4 → 5 → 6."}],
    hiddenTests:[{input:"1 1\n7",expectedOutput:"1"},{input:"2 2\n1 2\n4 3",expectedOutput:"4"},{input:"2 3\n6 5 4\n1 2 3",expectedOutput:"6"},{input:"3 2\n1 1\n1 1\n1 1",expectedOutput:"1"}],
    bestSolution:referenceSnippet(language,"longestPath"),bestTimeComplexity:"O(mn)",bestSpaceComplexity:"O(mn)"
  };
  return{
    title:"Compact Event Window",difficulty,sourceLabel:"Local Challenge",
    statement:"You are given a sorted stream of integer event timestamps and a non-negative window size.\n\nFor any starting timestamp x, consider the inclusive interval [x, x + windowSize].\n\nFind the maximum number of events that can fit inside one such interval.\n\nBecause the timestamps are sorted, your solution should avoid checking every possible pair.",
    inputFormat:"The first line contains n and windowSize.\nThe second line contains n sorted integer timestamps.",
    outputFormat:"Print one integer: the largest number of events that fit inside a single inclusive window.",
    constraints:["1 ≤ n ≤ 200000","0 ≤ windowSize ≤ 10^9","timestamps are sorted in non-decreasing order"],
    examples:[{input:"5 3\n1 2 4 7 8",expectedOutput:"3",explanation:"The window [1,4] contains 1, 2 and 4."}],
    sampleTests:[{input:"5 3\n1 2 4 7 8",expectedOutput:"3",explanation:"Normal sliding-window case."},{input:"6 0\n2 2 2 5 5 9",expectedOutput:"3",explanation:"With window 0 only identical timestamps share a window."}],
    hiddenTests:[{input:"1 10\n7",expectedOutput:"1"},{input:"7 4\n1 2 3 4 5 10 11",expectedOutput:"5"},{input:"6 2\n1 10 11 12 20 21",expectedOutput:"3"},{input:"8 100\n1 2 3 4 5 6 7 8",expectedOutput:"8"}],
    bestSolution:referenceSnippet(language,"eventWindow"),bestTimeComplexity:"O(n)",bestSpaceComplexity:"O(1)"
  };
}

function spawnCollect(command,args,{cwd,stdin,timeoutMs=TEST_TIMEOUT_MS,env}={}){
  return new Promise(resolve=>{
    const start=performance.now();let stdout="",stderr="",done=false,child;
    try{child=spawn(command,args,{cwd,env:env||{PATH:process.env.PATH||"",LANG:"C.UTF-8"},stdio:["pipe","pipe","pipe"],windowsHide:true});}
    catch(e){return resolve({ok:false,stdout:"",stderr:e.message,runtimeMs:0,spawnError:true});}
    const timer=setTimeout(()=>{if(!done)child.kill("SIGKILL");},timeoutMs);
    child.stdout.on("data",c=>{if(stdout.length<MAX_OUTPUT_BYTES)stdout+=c.toString()});
    child.stderr.on("data",c=>{if(stderr.length<MAX_OUTPUT_BYTES)stderr+=c.toString()});
    child.on("error",e=>{clearTimeout(timer);if(done)return;done=true;resolve({ok:false,stdout,stderr:e.message,runtimeMs:performance.now()-start,spawnError:true})});
    child.on("close",code=>{clearTimeout(timer);if(done)return;done=true;resolve({ok:code===0,code,stdout,stderr,runtimeMs:performance.now()-start,timedOut:code===null})});
    if(stdin!=null)child.stdin.write(String(stdin));child.stdin.end();
  });
}

const runtimeCache=new Map();
async function resolveRuntime(language){
  if(runtimeCache.has(language))return runtimeCache.get(language);
  let r={available:false,language,message:"Runtime not found."};
  if(language==="JavaScript"){const x=await spawnCollect("node",["--version"],{timeoutMs:1500});if(x.ok)r={available:true,runCommand:"node",message:"Local runner ready."};}
  else if(language==="Python"){for(const c of["python3","python"]){const x=await spawnCollect(c,["--version"],{timeoutMs:1500});if(x.ok){r={available:true,runCommand:c,message:"Local runner ready."};break}}}
  else if(language==="Java"){const a=await spawnCollect("javac",["-version"],{timeoutMs:1500}),b=await spawnCollect("java",["-version"],{timeoutMs:1500});if(a.ok&&b.ok)r={available:true,compileCommand:"javac",runCommand:"java",message:"Local runner ready."};}
  else{for(const c of["g++","clang++"]){const x=await spawnCollect(c,["--version"],{timeoutMs:1500});if(x.ok){r={available:true,compileCommand:c,message:"Local runner ready."};break}}}
  if(!r.available)r.message={JavaScript:"Node.js is required.",Python:"Install Python 3 and add python3/python to PATH.",Java:"Install a JDK so javac and java are on PATH.","C++":"Install g++ or clang++ and add it to PATH."}[language];
  runtimeCache.set(language,r);return r;
}

async function prepare(language,code){
  const rt=await resolveRuntime(language);if(!rt.available)return{ok:false,error:rt.message,cleanup:async()=>{}};
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),"hireland-codeforge-"));
  try{
    if(language==="JavaScript"){const f=path.join(dir,"Main.js");await fs.writeFile(f,code);return{ok:true,dir,command:rt.runCommand,args:[f],cleanup:()=>fs.rm(dir,{recursive:true,force:true})};}
    if(language==="Python"){const f=path.join(dir,"main.py");await fs.writeFile(f,code);return{ok:true,dir,command:rt.runCommand,args:[f],cleanup:()=>fs.rm(dir,{recursive:true,force:true})};}
    if(language==="Java"){const f=path.join(dir,"Main.java");await fs.writeFile(f,code);const c=await spawnCollect(rt.compileCommand,[f],{cwd:dir,timeoutMs:7000});if(!c.ok){await fs.rm(dir,{recursive:true,force:true});return{ok:false,compileError:true,error:c.stderr||c.stdout||"Java compilation failed.",cleanup:async()=>{}}}return{ok:true,dir,command:rt.runCommand,args:["-cp",dir,"Main"],cleanup:()=>fs.rm(dir,{recursive:true,force:true})};}
    const f=path.join(dir,"main.cpp"),exe=path.join(dir,process.platform==="win32"?"main.exe":"main");await fs.writeFile(f,code);const c=await spawnCollect(rt.compileCommand,["-std=c++17","-O2",f,"-o",exe],{cwd:dir,timeoutMs:9000});if(!c.ok){await fs.rm(dir,{recursive:true,force:true});return{ok:false,compileError:true,error:c.stderr||c.stdout||"C++ compilation failed.",cleanup:async()=>{}}}return{ok:true,dir,command:exe,args:[],cleanup:()=>fs.rm(dir,{recursive:true,force:true})};
  }catch(e){await fs.rm(dir,{recursive:true,force:true}).catch(()=>{});return{ok:false,error:e.message,cleanup:async()=>{}}}
}

async function runTests(language,code,tests,hidden=false){
  const executableCode = wrapCandidateCode(language, code);
  const p=await prepare(language,executableCode);
  if(!p.ok)return{compileError:!!p.compileError,runnerError:p.error,results:tests.map((t,i)=>({index:i,passed:false,runtimeMs:0,error:p.error,...(hidden?{}:{actualOutput:"",expectedOutput:t.expectedOutput})}))};
  const results=[];
  try{
    for(let i=0;i<tests.length;i++){
      const t=tests[i],x=await spawnCollect(p.command,p.args,{cwd:p.dir,stdin:t.input,env:{PATH:process.env.PATH||"",LANG:"C.UTF-8"}});
      const actual=normalizeOutput(x.stdout),expected=normalizeOutput(t.expectedOutput),passed=x.ok&&actual===expected;
      results.push({index:i,passed,runtimeMs:Number(x.runtimeMs.toFixed(2)),error:x.ok?"":(x.timedOut?"Time limit exceeded.":(x.stderr||"Runtime error.").slice(0,1200)),...(hidden?{}:{actualOutput:actual,expectedOutput:expected})});
    }
  }finally{await p.cleanup()}
  return{compileError:false,runnerError:"",results};
}

function publicChallenge(s){
  const c=s.challenge;
  return{
    challengeId:s.id,
    title:c.title,
    difficulty:c.difficulty,
    sourceLabel:c.sourceLabel,
    statement:c.statement,
    inputFormat:c.inputFormat,
    outputFormat:c.outputFormat,
    constraints:c.constraints,
    examples:c.examples,
    sampleTests:c.sampleTests.map((t,index)=>({
      index,
      input:t.input,
      expectedOutput:t.expectedOutput,
      explanation:t.explanation
    })),
    hiddenTestCount:c.hiddenTests.length,
    runnerAvailable:s.runnerAvailable,
    runnerMessage:s.runnerMessage
  };
}


const recentCodeForgeTitles = [];
const MAX_RECENT_CODEFORGE_TITLES = 18;

function rememberCodeForgeTitle(title) {
  const normalized = String(title || "").trim();
  if (!normalized) return;
  recentCodeForgeTitles.push(normalized);
  while (recentCodeForgeTitles.length > MAX_RECENT_CODEFORGE_TITLES) {
    recentCodeForgeTitles.shift();
  }
}

function codeForgeRandomSeed() {
  return crypto.randomBytes(10).toString("hex");
}

async function buildAIChallenge({language,difficulty,focus,leetcodeSeed}){
  if(!process.env.OPENAI_API_KEY)return null;
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const seed=leetcodeSeed?.title?`Use the interview skill suggested by the title "${String(leetcodeSeed.title).slice(0,100)}". Create a fresh variation and do not copy or reconstruct a proprietary statement. Use sourceLabel "LeetCode-inspired".`:`Create an original interview challenge. Use sourceLabel "AI Original".`;
  const rules={
    JavaScript:"JavaScript solve(input) function",
    Python:"Python solve(input_data) function",
    Java:"Java static String solve(String input) method",
    "C++":"C++ string solve(const string& input) function"
  }[language];
  const randomSeed=codeForgeRandomSeed();
  const recentTitles=recentCodeForgeTitles.slice(-10).join(" | ") || "None";
  const prompt=`You are CodeForge's coding-interview problem generator.
Randomization seed: ${randomSeed}
Generate exactly ONE ${difficulty} challenge for ${language}. Focus: ${focus}.
${seed}
Recently used CodeForge titles that MUST NOT be repeated or closely paraphrased:
${recentTitles}

Requirements:
- Use the randomization seed to vary the problem family, story/context, constraints and edge cases.
- Do not reuse the same underlying challenge structure repeatedly across consecutive sessions.
- Write a complete detailed question; do not expose a topic/category label.
- Explicit deterministic stdin/stdout contract.
- 1-3 examples, 2-4 visible sampleTests, 3-8 private hiddenTests.
- Every test stores raw stdin in input and exact stdout in expectedOutput.
- No interactive/network/filesystem tasks; output must be uniquely deterministic.
- The backend provides the solve signature, stdin reader, main/bootstrap code, and output plumbing. None of this is shown to the candidate.
- Do not generate or return starterCode.
- The candidate editor starts blank.
- The candidate will solve this session strictly in ${language}.
- bestSolution is backend-only until acceptance. It must be a correct ${rules} solution snippet and may include helper functions/methods needed by that language.
- bestSolution must never be in another language.
- bestSolution must be correct for every sample and hidden test.
- Include bestSolution time and auxiliary space complexity.
- Hidden tests must cover edge/adversarial cases and must not appear in statement/examples.`;
  const response=await client.responses.create({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",input:prompt,store:false,text:{format:{type:"json_schema",name:"codeforge_challenge",strict:true,schema:challengeSchema}}});
  return JSON.parse(response.output_text);
}

async function analyzeComplexity(s,code){
  const fb={
    timeComplexity:s.challenge.bestTimeComplexity,
    spaceComplexity:s.challenge.bestSpaceComplexity,
    timeNote:"Best-known target shown because AI analysis is unavailable.",
    spaceNote:"Best-known target shown because AI analysis is unavailable.",
    reviewSummary:`Your ${s.language} submission was judged successfully. Connect AI review for deeper ${s.language}-specific feedback.`,
    strengths:[
      `The solution is written and executed as ${s.language}.`,
      "The implementation follows the required stdin/stdout contract."
    ],
    improvements:[
      `Compare your implementation with the ${s.language} reference solution below.`,
      "Compare your complexity with the target complexity."
    ]
  };

  if(!process.env.OPENAI_API_KEY)return fb;

  try{
    const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    const response=await client.responses.create({
      model:process.env.OPENAI_MODEL||"gpt-5.6-luna",
      store:false,
      input:`You are reviewing a candidate's ${s.language} interview solution.

Problem:
${s.challenge.statement}

Submitted ${s.language} code:
${code}

Review this strictly as ${s.language} code.
Use ${s.language}-appropriate terminology, idioms, standard-library choices, data structures, and style.
Do not suggest rewriting the solution in another programming language.
Estimate asymptotic time complexity and auxiliary space complexity.
Give a concise review summary.
List practical strengths of this ${s.language} implementation.
List practical improvements the candidate can make specifically in ${s.language}.
The reference solution shown after submission is also in ${s.language}.`,
      text:{
        format:{
          type:"json_schema",
          name:"code_complexity",
          strict:true,
          schema:complexitySchema
        }
      }
    });
    return JSON.parse(response.output_text);
  }catch(e){
    console.error("Complexity/review analysis failed:",e);
    return fb;
  }
}

async function validateGenerated(language,c){
  const rt=await resolveRuntime(language);if(!rt.available)return true;
  const tests=[...c.sampleTests.map(t=>({input:t.input,expectedOutput:t.expectedOutput})),...c.hiddenTests];
  const r=await runTests(language,c.bestSolution,tests,false);
  return !r.runnerError&&r.results.every(x=>x.passed);
}

app.post("/api/codeforge/challenge",async(req,res)=>{
  const{language,difficulty,focus,leetcodeSeed=null}=req.body||{};
  if(!allowedLanguages.has(language)||!allowedDifficulties.has(difficulty)||!allowedFocus.has(focus))return res.status(400).json({error:"Invalid CodeForge configuration."});
  const rt=await resolveRuntime(language);let challenge=null;

  if(process.env.OPENAI_API_KEY){
    for(let attempt=1;attempt<=3 && !challenge;attempt++){
      try{
        const candidate=await buildAIChallenge({language,difficulty,focus,leetcodeSeed});
        if(!candidate)continue;

        const duplicate=recentCodeForgeTitles.some(
          title=>title.toLowerCase()===String(candidate.title||"").toLowerCase()
        );

        if(duplicate){
          console.warn(`AI CodeForge attempt ${attempt} repeated a recent title; retrying.`);
          continue;
        }

        if(await validateGenerated(language,candidate)){
          challenge=candidate;
        }else{
          console.warn(`AI CodeForge attempt ${attempt} failed reference validation; retrying.`);
        }
      }catch(e){
        console.error(`AI CodeForge attempt ${attempt} failed:`,e);
      }
    }
  }

  if(!challenge){
    challenge=fallback(language,difficulty);

    // Even local fallback receives a session-specific display title so repeated
    // fallback sessions are visually distinguishable while the tests remain valid.
    const suffix=codeForgeRandomSeed().slice(0,4).toUpperCase();
    challenge={...challenge,title:`${challenge.title} · ${suffix}`};
  }

  rememberCodeForgeTitle(challenge.title);

  const id=crypto.randomUUID(),s={id,createdAt:Date.now(),language,difficulty,focus,challenge,runnerAvailable:rt.available,runnerMessage:rt.message};sessions.set(id,s);res.json(publicChallenge(s));
});

app.post("/api/codeforge/run",async(req,res)=>{
  const{challengeId,code}=req.body||{},s=sessions.get(challengeId);
  if(!s)return res.status(404).json({error:"Challenge session expired. Start a new challenge."});
  if(typeof code!=="string"||!code.trim())return res.status(400).json({error:"Code is empty."});
  const j=await runTests(s.language,code,s.challenge.sampleTests.map(t=>({input:t.input,expectedOutput:t.expectedOutput})),false),passed=j.results.filter(x=>x.passed).length,runtime=j.results.reduce((a,x)=>a+(x.runtimeMs||0),0);
  res.json({
    phase:"sample",
    executionMode:looksLikeCompleteProgram(s.language,code)?"full-program":"solution-body",
    passed,
    total:j.results.length,
    totalRuntimeMs:Number(runtime.toFixed(2)),
    compileError:j.compileError,
    runnerError:j.runnerError,
    results:j.results
  });
});

app.post("/api/codeforge/submit",async(req,res)=>{
  const{challengeId,code}=req.body||{},s=sessions.get(challengeId);
  if(!s)return res.status(404).json({error:"Challenge session expired. Start a new challenge."});
  if(typeof code!=="string"||!code.trim())return res.status(400).json({error:"Code is empty."});
  const sample=await runTests(s.language,code,s.challenge.sampleTests.map(t=>({input:t.input,expectedOutput:t.expectedOutput})),false);
  const hidden=(sample.compileError||sample.runnerError)?{results:s.challenge.hiddenTests.map((_,i)=>({index:i,passed:false,runtimeMs:0,error:sample.runnerError||"Compilation failed."}))}:await runTests(s.language,code,s.challenge.hiddenTests,true);
  const sp=sample.results.filter(x=>x.passed).length,hp=hidden.results.filter(x=>x.passed).length,allPassed=sp===sample.results.length&&hp===hidden.results.length,total=[...sample.results,...hidden.results].reduce((a,x)=>a+(x.runtimeMs||0),0),complexity=await analyzeComplexity(s,code);
  res.json({
    phase:"submit",
    executionMode:looksLikeCompleteProgram(s.language,code)?"full-program":"solution-body",
    allPassed,
    samplePassed:sp,
    sampleTotal:sample.results.length,
    hiddenPassed:hp,
    hiddenTotal:hidden.results.length,
    totalRuntimeMs:Number(total.toFixed(2)),
    sampleResults:sample.results,
    hiddenResults:hidden.results,
    complexity,
    bestSolution:allPassed ? s.challenge.bestSolution : null,
    bestTimeComplexity:allPassed ? s.challenge.bestTimeComplexity : null,
    bestSpaceComplexity:allPassed ? s.challenge.bestSpaceComplexity : null
  });
});

app.get("/api/codeforge/runtime-status",async(_req,res)=>{const x={};for(const l of allowedLanguages)x[l]=await resolveRuntime(l);res.json(x)});
app.get("/api/health",(_req,res)=>res.json({ok:true,aiConfigured:Boolean(process.env.OPENAI_API_KEY),codeJudge:"local-development-runner"}));
app.listen(port,()=>{console.log(`Hireland running at http://localhost:${port}`);console.log("CodeForge judge is intended for trusted localhost development.")});
