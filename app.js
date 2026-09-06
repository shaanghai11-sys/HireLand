const problems = [{"id": 1, "title": "Two Sum", "difficulty": "Easy", "topic": "Hashing"}, {"id": 2, "title": "Best Time to Buy and Sell Stock", "difficulty": "Easy", "topic": "Array"}, {"id": 3, "title": "Contains Duplicate", "difficulty": "Easy", "topic": "Hashing"}, {"id": 4, "title": "Product of Array Except Self", "difficulty": "Medium", "topic": "Array"}, {"id": 5, "title": "Maximum Subarray", "difficulty": "Medium", "topic": "Array"}, {"id": 6, "title": "Maximum Product Subarray", "difficulty": "Medium", "topic": "Array"}, {"id": 7, "title": "Find Minimum in Rotated Sorted Array", "difficulty": "Medium", "topic": "Binary Search"}, {"id": 8, "title": "Search in Rotated Sorted Array", "difficulty": "Medium", "topic": "Binary Search"}, {"id": 9, "title": "3Sum", "difficulty": "Medium", "topic": "Two Pointers"}, {"id": 10, "title": "Container With Most Water", "difficulty": "Medium", "topic": "Two Pointers"}, {"id": 11, "title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "topic": "String"}, {"id": 12, "title": "Longest Repeating Character Replacement", "difficulty": "Medium", "topic": "String"}, {"id": 13, "title": "Minimum Window Substring", "difficulty": "Hard", "topic": "String"}, {"id": 14, "title": "Valid Anagram", "difficulty": "Easy", "topic": "Hashing"}, {"id": 15, "title": "Group Anagrams", "difficulty": "Medium", "topic": "Hashing"}, {"id": 16, "title": "Valid Parentheses", "difficulty": "Easy", "topic": "Stack"}, {"id": 17, "title": "Valid Palindrome", "difficulty": "Easy", "topic": "Two Pointers"}, {"id": 18, "title": "Longest Palindromic Substring", "difficulty": "Medium", "topic": "String"}, {"id": 19, "title": "Palindromic Substrings", "difficulty": "Medium", "topic": "String"}, {"id": 20, "title": "Encode and Decode Strings", "difficulty": "Medium", "topic": "String"}, {"id": 21, "title": "Reverse Linked List", "difficulty": "Easy", "topic": "Linked List"}, {"id": 22, "title": "Linked List Cycle", "difficulty": "Easy", "topic": "Linked List"}, {"id": 23, "title": "Merge Two Sorted Lists", "difficulty": "Easy", "topic": "Linked List"}, {"id": 24, "title": "Remove Nth Node From End of List", "difficulty": "Medium", "topic": "Linked List"}, {"id": 25, "title": "Reorder List", "difficulty": "Medium", "topic": "Linked List"}, {"id": 26, "title": "Merge K Sorted Lists", "difficulty": "Hard", "topic": "Linked List"}, {"id": 27, "title": "Invert Binary Tree", "difficulty": "Easy", "topic": "Tree"}, {"id": 28, "title": "Maximum Depth of Binary Tree", "difficulty": "Easy", "topic": "Tree"}, {"id": 29, "title": "Same Tree", "difficulty": "Easy", "topic": "Tree"}, {"id": 30, "title": "Subtree of Another Tree", "difficulty": "Easy", "topic": "Tree"}, {"id": 31, "title": "Lowest Common Ancestor of a BST", "difficulty": "Medium", "topic": "Tree"}, {"id": 32, "title": "Binary Tree Level Order Traversal", "difficulty": "Medium", "topic": "Tree"}, {"id": 33, "title": "Validate Binary Search Tree", "difficulty": "Medium", "topic": "Tree"}, {"id": 34, "title": "Kth Smallest Element in a BST", "difficulty": "Medium", "topic": "Tree"}, {"id": 35, "title": "Construct Binary Tree from Preorder and Inorder", "difficulty": "Medium", "topic": "Tree"}, {"id": 36, "title": "Binary Tree Maximum Path Sum", "difficulty": "Hard", "topic": "Tree"}, {"id": 37, "title": "Serialize and Deserialize Binary Tree", "difficulty": "Hard", "topic": "Tree"}, {"id": 38, "title": "Number of Islands", "difficulty": "Medium", "topic": "Graph"}, {"id": 39, "title": "Clone Graph", "difficulty": "Medium", "topic": "Graph"}, {"id": 40, "title": "Pacific Atlantic Water Flow", "difficulty": "Medium", "topic": "Graph"}, {"id": 41, "title": "Course Schedule", "difficulty": "Medium", "topic": "Graph"}, {"id": 42, "title": "Course Schedule II", "difficulty": "Medium", "topic": "Graph"}, {"id": 43, "title": "Graph Valid Tree", "difficulty": "Medium", "topic": "Graph"}, {"id": 44, "title": "Number of Connected Components", "difficulty": "Medium", "topic": "Graph"}, {"id": 45, "title": "Word Ladder", "difficulty": "Hard", "topic": "Graph"}, {"id": 46, "title": "Climbing Stairs", "difficulty": "Easy", "topic": "Dynamic Programming"}, {"id": 47, "title": "House Robber", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 48, "title": "House Robber II", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 49, "title": "Longest Palindromic Subsequence", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 50, "title": "Unique Paths", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 51, "title": "Coin Change", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 52, "title": "Longest Increasing Subsequence", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 53, "title": "Word Break", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 54, "title": "Combination Sum IV", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 55, "title": "Decode Ways", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 56, "title": "Jump Game", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 57, "title": "Longest Common Subsequence", "difficulty": "Medium", "topic": "Dynamic Programming"}, {"id": 58, "title": "Merge Intervals", "difficulty": "Medium", "topic": "Array"}, {"id": 59, "title": "Insert Interval", "difficulty": "Medium", "topic": "Array"}, {"id": 60, "title": "Non-overlapping Intervals", "difficulty": "Medium", "topic": "Array"}, {"id": 61, "title": "Meeting Rooms", "difficulty": "Easy", "topic": "Array"}, {"id": 62, "title": "Meeting Rooms II", "difficulty": "Medium", "topic": "Array"}, {"id": 63, "title": "Set Matrix Zeroes", "difficulty": "Medium", "topic": "Array"}, {"id": 64, "title": "Spiral Matrix", "difficulty": "Medium", "topic": "Array"}, {"id": 65, "title": "Rotate Image", "difficulty": "Medium", "topic": "Array"}, {"id": 66, "title": "Word Search", "difficulty": "Medium", "topic": "Graph"}, {"id": 67, "title": "Reverse Bits", "difficulty": "Easy", "topic": "Array"}, {"id": 68, "title": "Number of 1 Bits", "difficulty": "Easy", "topic": "Array"}, {"id": 69, "title": "Counting Bits", "difficulty": "Easy", "topic": "Dynamic Programming"}, {"id": 70, "title": "Missing Number", "difficulty": "Easy", "topic": "Array"}, {"id": 71, "title": "Sum of Two Integers", "difficulty": "Medium", "topic": "Array"}, {"id": 72, "title": "Top K Frequent Elements", "difficulty": "Medium", "topic": "Hashing"}, {"id": 73, "title": "Kth Largest Element in an Array", "difficulty": "Medium", "topic": "Array"}, {"id": 74, "title": "Find Median from Data Stream", "difficulty": "Hard", "topic": "Array"}, {"id": 75, "title": "Daily Temperatures", "difficulty": "Medium", "topic": "Stack"}, {"id": 76, "title": "Largest Rectangle in Histogram", "difficulty": "Hard", "topic": "Stack"}, {"id": 77, "title": "Car Fleet", "difficulty": "Medium", "topic": "Stack"}, {"id": 78, "title": "Trapping Rain Water", "difficulty": "Hard", "topic": "Two Pointers"}, {"id": 79, "title": "Binary Search", "difficulty": "Easy", "topic": "Binary Search"}, {"id": 80, "title": "Search a 2D Matrix", "difficulty": "Medium", "topic": "Binary Search"}, {"id": 81, "title": "Koko Eating Bananas", "difficulty": "Medium", "topic": "Binary Search"}, {"id": 82, "title": "Time Based Key-Value Store", "difficulty": "Medium", "topic": "Binary Search"}, {"id": 83, "title": "Median of Two Sorted Arrays", "difficulty": "Hard", "topic": "Binary Search"}, {"id": 84, "title": "Permutation in String", "difficulty": "Medium", "topic": "String"}, {"id": 85, "title": "Find All Anagrams in a String", "difficulty": "Medium", "topic": "String"}, {"id": 86, "title": "Longest Consecutive Sequence", "difficulty": "Medium", "topic": "Hashing"}, {"id": 87, "title": "Valid Sudoku", "difficulty": "Medium", "topic": "Hashing"}, {"id": 88, "title": "Subsets", "difficulty": "Medium", "topic": "Array"}, {"id": 89, "title": "Combination Sum", "difficulty": "Medium", "topic": "Array"}, {"id": 90, "title": "Permutations", "difficulty": "Medium", "topic": "Array"}, {"id": 91, "title": "Subsets II", "difficulty": "Medium", "topic": "Array"}, {"id": 92, "title": "Combination Sum II", "difficulty": "Medium", "topic": "Array"}, {"id": 93, "title": "N-Queens", "difficulty": "Hard", "topic": "Array"}, {"id": 94, "title": "Generate Parentheses", "difficulty": "Medium", "topic": "Stack"}, {"id": 95, "title": "Min Stack", "difficulty": "Medium", "topic": "Stack"}, {"id": 96, "title": "Evaluate Reverse Polish Notation", "difficulty": "Medium", "topic": "Stack"}, {"id": 97, "title": "Simplify Path", "difficulty": "Medium", "topic": "Stack"}, {"id": 98, "title": "Implement Trie", "difficulty": "Medium", "topic": "String"}, {"id": 99, "title": "Design Add and Search Words Data Structure", "difficulty": "Medium", "topic": "String"}, {"id": 100, "title": "Word Search II", "difficulty": "Hard", "topic": "Graph"}];

const intro = document.getElementById("intro");
const app = document.getElementById("app");
const enterBtn = document.getElementById("enterBtn");

document.body.classList.add("intro-active");

function enterApp() {
  const transition = document.getElementById("entryTransition");

  transition?.classList.add("active");

  setTimeout(() => {
    intro.classList.add("exit");
    document.body.classList.remove("intro-active");
    app.setAttribute("aria-hidden", "false");
    app.classList.add("visible", "transition-arrive");
  }, 500);

  setTimeout(() => {
    transition?.classList.remove("active");
  }, 1760);

  setTimeout(() => {
    app.classList.remove("transition-arrive");
  }, 2200);

  sessionStorage.setItem("hireland-intro-seen", "1");
}

enterBtn.addEventListener("click", enterApp);

if (sessionStorage.getItem("hireland-intro-seen") === "1") {
  intro.style.display = "none";
  document.body.classList.remove("intro-active");
  app.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => app.classList.add("visible"));
}

// Tabs
const tabs = [...document.querySelectorAll(".nav-tab")];
const panels = [...document.querySelectorAll(".tab-panel")];

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.tab;

    tabs.forEach(t => {
      t.classList.toggle("active", t.dataset.tab === targetId);
    });

    panels.forEach(panel => {
      const active = panel.id === targetId;
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-hidden", String(!active));
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof cacheReflectionBounds === "function") {
      requestAnimationFrame(cacheReflectionBounds);
    }
  });
});

// Small UI sound toggle placeholder
const soundToggle = document.getElementById("soundToggle");
let soundOn = false;
soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "◉" : "◌";
  soundToggle.title = soundOn ? "UI sound on" : "UI sound off";
});



// ===== v5 optimized site-wide pointer reflection =====
const rootStyle = document.documentElement.style;
let pointerFrame = 0;
let latestPointerX = window.innerWidth / 2;
let latestPointerY = window.innerHeight / 2;

function updatePointerReflection() {
  pointerFrame = 0;
  rootStyle.setProperty("--pointer-x", `${latestPointerX}px`);
  rootStyle.setProperty("--pointer-y", `${latestPointerY}px`);
}

window.addEventListener("pointermove", (event) => {
  latestPointerX = event.clientX;
  latestPointerY = event.clientY;

  if (!pointerFrame) {
    pointerFrame = requestAnimationFrame(updatePointerReflection);
  }
}, { passive: true });

// Cache surface bounds only when needed rather than recalculating every pointer event.
const reflectiveSurfaces = [...document.querySelectorAll(
  ".reflection-surface, .hero-card, .visual-stage, .mini-card"
)];

function cacheReflectionBounds() {
  reflectiveSurfaces.forEach(surface => {
    const rect = surface.getBoundingClientRect();
    surface.style.setProperty("--surface-left", `${rect.left}px`);
    surface.style.setProperty("--surface-top", `${rect.top}px`);
  });
}

cacheReflectionBounds();
window.addEventListener("resize", cacheReflectionBounds, { passive: true });
window.addEventListener("scroll", () => {
  if (!pointerFrame) {
    requestAnimationFrame(cacheReflectionBounds);
  }
}, { passive: true });

// ===== v3 utility drawer and interaction =====
const sideRail = document.getElementById("sideRail");
const sideMenuToggle = document.getElementById("sideMenuToggle");

function syncDrawerState(isOpen) {
  sideRail.classList.toggle("open", isOpen);
  sideMenuToggle.classList.toggle("active", isOpen);
  sideMenuToggle.setAttribute("aria-expanded", String(isOpen));
  app.classList.toggle("drawer-open", isOpen && window.innerWidth > 1060);
}

sideMenuToggle.addEventListener("click", () => {
  syncDrawerState(!sideRail.classList.contains("open"));
});

document.addEventListener("click", (event) => {
  const clickedInside = sideRail.contains(event.target) || sideMenuToggle.contains(event.target);
  if (!clickedInside && sideRail.classList.contains("open")) {
    syncDrawerState(false);
  }
});

// magnetic primary button
document.querySelectorAll(".magnetic-btn").forEach(btn => {
  btn.addEventListener("pointermove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.05}px, ${y * 0.08}px)`;
  });
  btn.addEventListener("pointerleave", () => {
    btn.style.transform = "";
  });
});

// Drawer is intentionally click-only. No hover-to-open behavior.

// Close the utility drawer with Escape.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    syncDrawerState(false);
  }
});


window.addEventListener("resize", () => {
  const isOpen = sideRail.classList.contains("open");
  app.classList.toggle("drawer-open", isOpen && window.innerWidth > 1060);
});

// Session rendering model:
// - The document is mounted once when this page loads.
// - The intro is shown at most once per browser-tab session.
// - Tabs, filters and drawers only change state/visibility.
// - No route change or interaction rebuilds the application root.
const HIRELAND_SESSION_KEY = "hireland-session-mounted";
sessionStorage.setItem(HIRELAND_SESSION_KEY, "1");





// ================================================================
// v14 — Interview Arena
// ================================================================
const arenaState = {
  step: 1,
  targetRole: "",
  experience: "Student / Intern",
  mode: "Mixed",
  behaviour: "Calm & Supportive",
  company: "General",
  sessionLength: 15,
  pressure: 42,
  jobDescription: "",
  resumeText: "",
  resumeFilename: "",
  mediaStream: null,
  sessionId: null,
  turn: 1,
  currentPressure: 42,
  clockInterval: null,
  secondsRemaining: 0
};

const arenaStepTitles = {
  1: "Define the target",
  2: "Shape the interviewer",
  3: "Ground the interview",
  4: "Presence check"
};

const arenaLanding = document.getElementById("arenaLanding");
const arenaArchitect = document.getElementById("arenaArchitect");
const arenaLaunch = document.getElementById("arenaLaunch");
const arenaLiveRoom = document.getElementById("arenaLiveRoom");
const arenaDebrief = document.getElementById("arenaDebrief");

function showArenaView(view) {
  [arenaLanding, arenaArchitect, arenaLaunch, arenaLiveRoom, arenaDebrief].forEach(item => {
    if (!item) return;
    item.hidden = item !== view;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (typeof cacheReflectionBounds === "function") {
    requestAnimationFrame(cacheReflectionBounds);
  }
}

document.getElementById("openArenaArchitect")?.addEventListener("click", () => {
  arenaState.step = 1;
  renderArenaStep();
  showArenaView(arenaArchitect);
});

document.getElementById("arenaBackToLanding")?.addEventListener("click", () => {
  showArenaView(arenaLanding);
});

function renderArenaStep() {
  document.querySelectorAll(".arena-step").forEach(step => {
    const active = Number(step.dataset.arenaStep) === arenaState.step;
    step.hidden = !active;
    step.classList.toggle("active", active);
  });

  document.getElementById("arenaStepNumber").textContent =
    String(arenaState.step).padStart(2, "0");
  document.getElementById("arenaStepTitle").textContent =
    arenaStepTitles[arenaState.step];
  document.getElementById("arenaProgressFill").style.width =
    `${arenaState.step * 25}%`;

  const prev = document.getElementById("arenaPrevStep");
  const nextLabel = document.getElementById("arenaNextLabel");

  prev.hidden = arenaState.step === 1;
  nextLabel.textContent = arenaState.step === 4 ? "Enter interview" : "Continue";

  updateArenaDNA();
}

function arenaPressureLabel(value) {
  if (value <= 20) return "Calm";
  if (value <= 45) return "Balanced";
  if (value <= 70) return "Probing";
  return "Intense";
}

function updateArenaPressure(value) {
  arenaState.pressure = Number(value);
  document.getElementById("arenaPressureValue").textContent = value;
  document.getElementById("arenaPressureLabel").textContent =
    arenaPressureLabel(Number(value));
  document.getElementById("arenaPressureControl").style.setProperty(
    "--pressure",
    `${value}%`
  );
  updateArenaDNA();
}

document.getElementById("arenaPressure")?.addEventListener("input", event => {
  updateArenaPressure(event.target.value);
});

document.getElementById("arenaTargetRole")?.addEventListener("input", event => {
  arenaState.targetRole = event.target.value.trim();
  updateArenaDNA();
});

document.querySelectorAll(".arena-role-presets button").forEach(button => {
  button.addEventListener("click", () => {
    arenaState.targetRole = button.dataset.value;
    document.getElementById("arenaTargetRole").value = arenaState.targetRole;
    updateArenaDNA();
  });
});

document.querySelectorAll("[data-arena-choice]").forEach(group => {
  group.addEventListener("click", event => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;

    group.querySelectorAll("button[data-value]").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const type = group.dataset.arenaChoice;
    const value = button.dataset.value;

    if (type === "experience") arenaState.experience = value;
    if (type === "mode") arenaState.mode = value;
    if (type === "behaviour") arenaState.behaviour = value;
    if (type === "company") {
      arenaState.company = value;
      document.getElementById("arenaCustomCompany").value = "";
    }
    if (type === "length") arenaState.sessionLength = Number(value);

    updateArenaDNA();
  });
});

document.getElementById("arenaCustomCompany")?.addEventListener("input", event => {
  const value = event.target.value.trim();

  if (value) {
    arenaState.company = value;
    document.querySelectorAll('[data-arena-choice="company"] .arena-company')
      .forEach(button => button.classList.remove("active"));
  } else {
    arenaState.company = "General";
    const general = document.querySelector(
      '[data-arena-choice="company"] [data-value="General"]'
    );
    general?.classList.add("active");
  }

  updateArenaDNA();
});

function updateArenaDNA() {
  document.getElementById("arenaDNAPressure").textContent = arenaState.pressure;
  document.getElementById("arenaDNARole").textContent =
    arenaState.targetRole || "Not set";
  document.getElementById("arenaDNALevel").textContent = arenaState.experience;
  document.getElementById("arenaDNAMode").textContent = arenaState.mode;
  document.getElementById("arenaDNABehaviour").textContent = arenaState.behaviour;
  document.getElementById("arenaDNACompany").textContent = arenaState.company;
  document.getElementById("arenaDNALength").textContent =
    `${arenaState.sessionLength} minutes`;

  const jdReady = Boolean(arenaState.jobDescription.trim());
  const resumeReady = Boolean(arenaState.resumeText.trim());

  document.getElementById("arenaDNAJDState").classList.toggle("ready", jdReady);
  document.getElementById("arenaDNAResumeState").classList.toggle("ready", resumeReady);
  document.getElementById("arenaDNAJDText").textContent =
    jdReady ? `${arenaState.jobDescription.length.toLocaleString()} characters loaded`
            : "waiting for context";
  document.getElementById("arenaDNAResumeText").textContent =
    resumeReady
      ? (arenaState.resumeFilename || "resume text ready")
      : "waiting for résumé";
}

const arenaJobDescription = document.getElementById("arenaJobDescription");
arenaJobDescription?.addEventListener("input", event => {
  arenaState.jobDescription = event.target.value;
  document.getElementById("arenaJDCount").textContent =
    `${event.target.value.length.toLocaleString()} characters`;
  updateArenaDNA();
});

document.getElementById("arenaResumeText")?.addEventListener("input", event => {
  arenaState.resumeText = event.target.value;
  if (event.target.value.trim()) arenaState.resumeFilename = "Pasted résumé";
  updateArenaDNA();
});

// ---------- Resume upload ----------
const arenaResumeDrop = document.getElementById("arenaResumeDrop");
const arenaResumeFile = document.getElementById("arenaResumeFile");

["dragenter", "dragover"].forEach(type => {
  arenaResumeDrop?.addEventListener(type, event => {
    event.preventDefault();
    arenaResumeDrop.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach(type => {
  arenaResumeDrop?.addEventListener(type, event => {
    event.preventDefault();
    arenaResumeDrop.classList.remove("dragover");
  });
});

arenaResumeDrop?.addEventListener("drop", event => {
  const file = event.dataTransfer?.files?.[0];
  if (file) processArenaResume(file);
});

arenaResumeFile?.addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (file) processArenaResume(file);
});

document.getElementById("arenaReplaceResume")?.addEventListener("click", () => {
  document.getElementById("arenaResumeStatus").hidden = true;
  arenaResumeDrop.hidden = false;
  arenaResumeFile.value = "";
  arenaState.resumeText = "";
  arenaState.resumeFilename = "";
  updateArenaDNA();
});

async function processArenaResume(file) {
  const status = document.getElementById("arenaResumeStatus");
  const name = document.getElementById("arenaResumeName");
  const meta = document.getElementById("arenaResumeMeta");

  arenaResumeDrop.hidden = true;
  status.hidden = false;
  name.textContent = file.name;
  meta.textContent = "Extracting résumé text…";

  try {
    const form = new FormData();
    form.append("resume", file);

    const response = await fetch("/api/interview/resume/extract", {
      method: "POST",
      body: form
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Résumé extraction failed.");
    }

    arenaState.resumeText = payload.text;
    arenaState.resumeFilename = payload.filename;
    meta.textContent =
      `${payload.words.toLocaleString()} words · extracted and ready`;

    const pasteArea = document.getElementById("arenaResumeText");
    pasteArea.value = payload.text;
    updateArenaDNA();
  } catch (error) {
    console.warn("Resume extraction error:", error);

    // Browser fallback for plain text files.
    if (/\.(txt|md)$/i.test(file.name)) {
      try {
        const text = await file.text();
        arenaState.resumeText = text;
        arenaState.resumeFilename = file.name;
        meta.textContent = `${text.split(/\s+/).filter(Boolean).length} words · ready`;
        document.getElementById("arenaResumeText").value = text;
        updateArenaDNA();
        return;
      } catch (_) {}
    }

    meta.textContent = error.message;
    arenaResumeDrop.hidden = false;
  }
}

// ---------- Voice typing ----------
const ArenaSpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let arenaRecognition = null;
let arenaListeningButton = null;

function setArenaVoiceSupport() {
  const label = document.getElementById("arenaVoiceSupport");
  const dot = document.getElementById("arenaVoiceDot");

  if (ArenaSpeechRecognition) {
    label.textContent = "Voice typing available";
    dot.classList.add("ready");
  } else {
    label.textContent = "Not supported in this browser";
  }
}

setArenaVoiceSupport();

function stopArenaRecognition() {
  if (arenaRecognition) {
    try { arenaRecognition.stop(); } catch (_) {}
  }
  arenaRecognition = null;
  arenaListeningButton?.classList.remove("listening");
  arenaListeningButton = null;
}

function startArenaDictation(target, button, { replace = false } = {}) {
  if (!ArenaSpeechRecognition) {
    alert("Voice typing is not supported in this browser. Chrome on localhost usually supports it.");
    return;
  }

  stopArenaRecognition();

  const recognition = new ArenaSpeechRecognition();
  recognition.lang = navigator.language || "en-IN";
  recognition.continuous = true;
  recognition.interimResults = true;

  let baseText = replace ? "" : (target.value || "");
  let finalTranscript = "";

  recognition.onstart = () => {
    arenaRecognition = recognition;
    arenaListeningButton = button;
    button.classList.add("listening");
  };

  recognition.onresult = event => {
    let interim = "";
    let committed = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) committed += transcript + " ";
      else interim += transcript;
    }

    if (committed) finalTranscript += committed;

    const prefix = baseText && !baseText.endsWith(" ") ? baseText + " " : baseText;
    target.value = `${prefix}${finalTranscript}${interim}`.trimStart();
    target.dispatchEvent(new Event("input", { bubbles: true }));
  };

  recognition.onerror = event => {
    console.warn("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    button.classList.remove("listening");
    if (arenaRecognition === recognition) arenaRecognition = null;
    if (arenaListeningButton === button) arenaListeningButton = null;
  };

  recognition.start();
}

document.querySelectorAll("[data-voice-target]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("listening")) {
      stopArenaRecognition();
      return;
    }

    const target = document.getElementById(button.dataset.voiceTarget);
    if (target) startArenaDictation(target, button);
  });
});

document.getElementById("arenaTestVoice")?.addEventListener("click", () => {
  const result = document.getElementById("arenaVoiceTestResult");
  const button = document.getElementById("arenaTestVoice");

  if (!ArenaSpeechRecognition) {
    result.textContent = "Voice typing is not available in this browser.";
    return;
  }

  stopArenaRecognition();

  const recognition = new ArenaSpeechRecognition();
  recognition.lang = navigator.language || "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    arenaRecognition = recognition;
    arenaListeningButton = button;
    button.classList.add("listening");
    result.textContent = "Listening… say a short sentence.";
  };

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    result.textContent = `Heard: “${transcript}”`;
  };

  recognition.onerror = event => {
    result.textContent = `Microphone test failed: ${event.error}`;
  };

  recognition.onend = () => {
    button.classList.remove("listening");
    arenaRecognition = null;
    arenaListeningButton = null;
  };

  recognition.start();
});

// ---------- Camera ----------
async function enableArenaCamera() {
  if (arenaState.mediaStream) return arenaState.mediaStream;

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera access is not supported in this browser.");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: "user"
    },
    audio: false
  });

  arenaState.mediaStream = stream;
  attachArenaCameraStream();
  return stream;
}

function attachArenaCameraStream() {
  const stream = arenaState.mediaStream;
  const setupVideo = document.getElementById("arenaSetupVideo");
  const liveVideo = document.getElementById("arenaLiveVideo");

  [setupVideo, liveVideo].forEach(video => {
    if (!video) return;
    video.srcObject = stream || null;
    video.classList.toggle("active", Boolean(stream));
  });

  document.getElementById("arenaCameraPlaceholder").style.display =
    stream ? "none" : "";
  document.getElementById("arenaLiveCameraPlaceholder").style.display =
    stream ? "none" : "";

  const ready = Boolean(stream);
  document.getElementById("arenaCameraDot").classList.toggle("ready", ready);
  document.getElementById("arenaLiveCameraDot").classList.toggle("ready", ready);
  document.getElementById("arenaCameraStatus").textContent =
    ready ? "Camera ready" : "Camera off";
  document.getElementById("arenaToggleCamera").innerHTML =
    ready ? "<span>◉</span> Disable camera" : "<span>◉</span> Enable camera";
}

function disableArenaCamera() {
  arenaState.mediaStream?.getTracks().forEach(track => track.stop());
  arenaState.mediaStream = null;
  attachArenaCameraStream();
}

async function toggleArenaCamera() {
  try {
    if (arenaState.mediaStream) disableArenaCamera();
    else await enableArenaCamera();
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById("arenaToggleCamera")?.addEventListener("click", toggleArenaCamera);
document.getElementById("arenaLiveCameraToggle")?.addEventListener("click", toggleArenaCamera);

// ---------- Step validation ----------
function validateArenaStep(step) {
  if (step === 1 && !arenaState.targetRole.trim()) {
    document.getElementById("arenaTargetRole").focus();
    return "Enter a target role before continuing.";
  }

  if (step === 3) {
    arenaState.jobDescription = document.getElementById("arenaJobDescription").value;
    arenaState.resumeText = document.getElementById("arenaResumeText").value || arenaState.resumeText;

    if (!arenaState.jobDescription.trim()) {
      document.getElementById("arenaJobDescription").focus();
      return "Paste the job description before continuing.";
    }

    if (!arenaState.resumeText.trim()) {
      document.querySelector(".arena-resume-paste")?.setAttribute("open", "");
      document.getElementById("arenaResumeText").focus();
      return "Upload or paste your résumé before continuing.";
    }
  }

  return "";
}

document.getElementById("arenaPrevStep")?.addEventListener("click", () => {
  if (arenaState.step <= 1) return;
  arenaState.step--;
  renderArenaStep();
});

document.getElementById("arenaNextStep")?.addEventListener("click", async () => {
  const error = validateArenaStep(arenaState.step);

  if (error) {
    alert(error);
    return;
  }

  if (arenaState.step < 4) {
    arenaState.step++;
    renderArenaStep();
    return;
  }

  await launchArenaInterview();
});


// ---------- Interviewer speech ----------
const arenaSpeechProfiles = {
  "Calm & Supportive": {
    rate:.90,
    pitch:1.08,
    volume:1,
    persona:"warm interviewer",
    pace:"measured pace",
    voiceOffset:0
  },
  "Neutral & Professional": {
    rate:1.00,
    pitch:1.00,
    volume:1,
    persona:"professional interviewer",
    pace:"natural pace",
    voiceOffset:1
  },
  "Skeptical & Probing": {
    rate:.94,
    pitch:.90,
    volume:1,
    persona:"probing interviewer",
    pace:"deliberate pace",
    voiceOffset:2
  },
  "Rapid Fire": {
    rate:1.16,
    pitch:1.02,
    volume:1,
    persona:"fast interviewer",
    pace:"rapid pace",
    voiceOffset:3
  },
  "Executive": {
    rate:.92,
    pitch:.86,
    volume:1,
    persona:"executive interviewer",
    pace:"controlled pace",
    voiceOffset:4
  }
};

let arenaInterviewerVoiceEnabled = true;
let arenaLastSpokenText = "";
let arenaSpeechUtterance = null;

function getArenaSpeechProfile(){
  return arenaSpeechProfiles[arenaState.behaviour] ||
    arenaSpeechProfiles["Neutral & Professional"];
}

function getArenaAvailableVoices(){
  if(!("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices().filter(voice =>
    /^en([-_]|$)/i.test(voice.lang || "")
  );
}

function selectArenaInterviewerVoice(){
  const voices=getArenaAvailableVoices();
  if(!voices.length)return null;

  const profile=getArenaSpeechProfile();
  const key=`${arenaState.behaviour}|${arenaState.company}|${arenaState.targetRole}`;
  let hash=0;
  for(let i=0;i<key.length;i++){
    hash=((hash<<5)-hash)+key.charCodeAt(i);
    hash|=0;
  }

  const index=Math.abs(hash + profile.voiceOffset) % voices.length;
  return voices[index];
}

function updateArenaVoicePersona(){
  const profile=getArenaSpeechProfile();
  document.getElementById("arenaVoicePersona").textContent=profile.persona;
  document.getElementById("arenaSpeechPace").textContent=profile.pace;
}

function stopArenaInterviewerSpeech(){
  if("speechSynthesis" in window){
    window.speechSynthesis.cancel();
  }
  arenaSpeechUtterance=null;
  document.getElementById("arenaSpeakingWave").hidden=true;
  document.querySelector(".arena-interviewer-stage")?.classList.remove("speaking");

  if(document.getElementById("arenaInterviewerState")){
    document.getElementById("arenaInterviewerState").textContent="waiting for your answer";
  }
}

function speakArenaInterviewer(text,{force=false}={}){
  const clean=String(text||"").trim();
  if(!clean)return;

  arenaLastSpokenText=clean;
  if(!arenaInterviewerVoiceEnabled && !force)return;
  if(!("speechSynthesis" in window))return;

  stopArenaInterviewerSpeech();

  const profile=getArenaSpeechProfile();
  const utterance=new SpeechSynthesisUtterance(clean);
  const selectedVoice=selectArenaInterviewerVoice();

  if(selectedVoice){
    utterance.voice=selectedVoice;
    utterance.lang=selectedVoice.lang || "en-US";
  }else{
    utterance.lang="en-US";
  }

  utterance.rate=profile.rate;
  utterance.pitch=profile.pitch;
  utterance.volume=profile.volume;

  utterance.onstart=()=>{
    document.getElementById("arenaSpeakingWave").hidden=false;
    document.querySelector(".arena-interviewer-stage")?.classList.add("speaking");
    document.getElementById("arenaInterviewerState").textContent="speaking…";
  };

  utterance.onend=()=>{
    document.getElementById("arenaSpeakingWave").hidden=true;
    document.querySelector(".arena-interviewer-stage")?.classList.remove("speaking");
    document.getElementById("arenaInterviewerState").textContent="waiting for your answer";
  };

  utterance.onerror=()=>{
    document.getElementById("arenaSpeakingWave").hidden=true;
    document.querySelector(".arena-interviewer-stage")?.classList.remove("speaking");
    document.getElementById("arenaInterviewerState").textContent="waiting for your answer";
  };

  arenaSpeechUtterance=utterance;
  window.speechSynthesis.speak(utterance);
}

document.getElementById("arenaReplayQuestion")?.addEventListener("click",()=>{
  if(arenaLastSpokenText)speakArenaInterviewer(arenaLastSpokenText,{force:true});
});

document.getElementById("arenaToggleInterviewerVoice")?.addEventListener("click",()=>{
  arenaInterviewerVoiceEnabled=!arenaInterviewerVoiceEnabled;
  const button=document.getElementById("arenaToggleInterviewerVoice");
  button.classList.toggle("active",arenaInterviewerVoiceEnabled);
  button.innerHTML=arenaInterviewerVoiceEnabled
    ? "<span>◉</span> Voice on"
    : "<span>○</span> Voice off";

  if(!arenaInterviewerVoiceEnabled)stopArenaInterviewerSpeech();
});

if("speechSynthesis" in window){
  window.speechSynthesis.onvoiceschanged=()=>updateArenaVoicePersona();
}


// ---------- Launch and interview ----------
const arenaLaunchMessages = [
  ["Reading the brief…", "Mapping the role and experience level."],
  ["Grounding the interviewer…", "Connecting the job description and résumé evidence."],
  ["Setting pressure…", "Calibrating behaviour and adaptive follow-ups."],
  ["Opening the room…", "Preparing the first interview question."]
];

async function launchArenaInterview() {
  stopArenaRecognition();
  showArenaView(arenaLaunch);

  const message = document.getElementById("arenaLaunchMessage");
  const sub = document.getElementById("arenaLaunchSub");
  const fill = document.getElementById("arenaLaunchFill");

  let index = 0;
  fill.style.width = "14%";

  const launchTicker = setInterval(() => {
    index = Math.min(index + 1, arenaLaunchMessages.length - 1);
    message.textContent = arenaLaunchMessages[index][0];
    sub.textContent = arenaLaunchMessages[index][1];
    fill.style.width = `${22 + index * 23}%`;
  }, 850);

  try {
    const response = await fetch("/api/interview/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetRole: arenaState.targetRole,
        experience: arenaState.experience,
        mode: arenaState.mode,
        behaviour: arenaState.behaviour,
        company: arenaState.company,
        sessionLength: arenaState.sessionLength,
        pressure: arenaState.pressure,
        jobDescription: arenaState.jobDescription,
        resumeText: arenaState.resumeText
      })
    });

    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not start interview.");

    clearInterval(launchTicker);
    fill.style.width = "100%";
    message.textContent = "Room ready.";
    sub.textContent = payload.welcome || "The interviewer is ready.";

    arenaState.sessionId = payload.sessionId;
    arenaState.turn = 1;
    arenaState.currentPressure = payload.pressure;

    setTimeout(() => {
      enterArenaLiveRoom(payload);
    }, 600);
  } catch (error) {
    clearInterval(launchTicker);
    alert(error.message);
    showArenaView(arenaArchitect);
  }
}

function enterArenaLiveRoom(payload) {
  showArenaView(arenaLiveRoom);
  attachArenaCameraStream();

  document.getElementById("arenaLiveRole").textContent = arenaState.targetRole;
  document.getElementById("arenaLiveMode").textContent = arenaState.mode;
  document.getElementById("arenaLiveCompany").textContent = arenaState.company;
  document.getElementById("arenaLiveBehaviour").textContent = arenaState.behaviour;

  document.getElementById("arenaPulseLevel").textContent = arenaState.experience;
  document.getElementById("arenaPulseCompany").textContent = arenaState.company;
  document.getElementById("arenaPulseMode").textContent = arenaState.mode;

  updateArenaLivePressure(arenaState.currentPressure);

  document.getElementById("arenaInterviewerName").textContent =
    payload.interviewerName || "Hireland Interviewer";
  updateArenaVoicePersona();

  const intro=document.getElementById("arenaSpokenIntro");
  if(payload.welcome){
    intro.hidden=false;
    intro.textContent=payload.welcome;
  }else{
    intro.hidden=true;
  }

  setArenaQuestion(
    payload.question,
    payload.focus || "Introduction",
    "",
    "Opening",
    payload.questionType || "WELCOME"
  );

  startArenaClock();

  setTimeout(()=>{
    const spoken=[payload.welcome,payload.question].filter(Boolean).join(" ");
    speakArenaInterviewer(spoken);
  },450);
}

function updateArenaLivePressure(value) {
  arenaState.currentPressure = Math.max(0, Math.min(100, Number(value)));
  document.getElementById("arenaLivePressure").textContent =
    `Pressure ${arenaState.currentPressure}`;
  document.getElementById("arenaPulsePressureValue").textContent =
    arenaState.currentPressure;
  document.getElementById("arenaPulsePressureFill").style.width =
    `${arenaState.currentPressure}%`;
}

function setArenaQuestion(question, focus, reaction, signal, questionType="FOLLOW-UP") {
  const shell = document.querySelector(".arena-question-shell");
  shell.classList.remove("question-changing");
  void shell.offsetWidth;
  shell.classList.add("question-changing");

  document.getElementById("arenaQuestionIndex").textContent =
    `QUESTION ${String(arenaState.turn).padStart(2, "0")}`;
  document.getElementById("arenaQuestionFocus").textContent = focus || "Follow-up";
  document.getElementById("arenaQuestionType").textContent = questionType || "FOLLOW-UP";
  document.getElementById("arenaCurrentQuestion").textContent = question;
  document.getElementById("arenaTurnLabel").textContent = `Turn ${arenaState.turn}`;
  document.getElementById("arenaPulseSignal").textContent = signal || focus || "Follow-up";

  const reactionBox = document.getElementById("arenaInterviewerReaction");
  if (reaction) {
    reactionBox.hidden = false;
    reactionBox.querySelector("p").textContent = reaction;
  } else {
    reactionBox.hidden = true;
  }
}

function startArenaClock() {
  clearInterval(arenaState.clockInterval);

  arenaState.secondsRemaining = arenaState.sessionLength * 60;
  renderArenaClock();

  arenaState.clockInterval = setInterval(() => {
    arenaState.secondsRemaining = Math.max(0, arenaState.secondsRemaining - 1);
    renderArenaClock();

    if (arenaState.secondsRemaining <= 0) {
      clearInterval(arenaState.clockInterval);
      endArenaInterview();
    }
  }, 1000);
}

function renderArenaClock() {
  const minutes = Math.floor(arenaState.secondsRemaining / 60);
  const seconds = arenaState.secondsRemaining % 60;
  document.getElementById("arenaSessionClock").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const arenaLiveAnswer = document.getElementById("arenaLiveAnswer");
arenaLiveAnswer?.addEventListener("input", event => {
  const count = event.target.value.trim()
    ? event.target.value.trim().split(/\s+/).length
    : 0;
  document.getElementById("arenaAnswerCount").textContent = `${count} words`;
});

document.getElementById("arenaLiveVoice")?.addEventListener("click", () => {
  const button = document.getElementById("arenaLiveVoice");

  if (button.classList.contains("listening")) {
    stopArenaRecognition();
    return;
  }

  startArenaDictation(arenaLiveAnswer, button);
});

document.getElementById("arenaSendAnswer")?.addEventListener("click", async () => {
  stopArenaInterviewerSpeech();

  const answer = arenaLiveAnswer.value.trim();
  if (!answer) {
    arenaLiveAnswer.focus();
    return;
  }

  const button = document.getElementById("arenaSendAnswer");
  const interviewerState = document.getElementById("arenaInterviewerState");

  button.disabled = true;
  interviewerState.textContent = "thinking about your answer…";

  try {
    const response = await fetch("/api/interview/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: arenaState.sessionId,
        answer
      })
    });

    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not continue interview.");

    arenaState.turn = payload.turn;
    arenaLiveAnswer.value = "";
    arenaLiveAnswer.dispatchEvent(new Event("input", { bubbles: true }));

    updateArenaLivePressure(payload.pressure);
    setArenaQuestion(
      payload.question,
      payload.focus,
      payload.interviewerReaction,
      payload.signal,
      payload.questionType || "FOLLOW-UP"
    );

    const intro=document.getElementById("arenaSpokenIntro");
    intro.hidden=true;
    intro.textContent="";

    interviewerState.textContent = "preparing next question…";

    setTimeout(()=>{
      const spoken=[payload.interviewerReaction,payload.question]
        .filter(Boolean)
        .join(" ");
      speakArenaInterviewer(spoken);
    },260);
  } catch (error) {
    alert(error.message);
    interviewerState.textContent = "waiting for your answer";
  } finally {
    button.disabled = false;
  }
});

document.getElementById("arenaExitInterview")?.addEventListener("click", () => {
  endArenaInterview();
});

async function endArenaInterview() {
  stopArenaRecognition();
  stopArenaInterviewerSpeech();
  clearInterval(arenaState.clockInterval);

  try {
    const response = await fetch("/api/interview/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: arenaState.sessionId })
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Could not build debrief.");
    }

    renderArenaDebrief(payload);
  } catch (error) {
    renderArenaDebrief({
      summary: "The interview ended. Start another session to continue practicing.",
      strengths: ["You completed a live interview practice session."],
      improvements: ["Repeat the interview with tighter, more evidence-led answers."],
      recommendedFocus: ["Practice concise examples with clear decisions and outcomes."],
      turns: Math.max(0, arenaState.turn - 1),
      pressure: arenaState.currentPressure,
      role: arenaState.targetRole
    });
  }
}

function renderArenaDebrief(payload) {
  showArenaView(arenaDebrief);

  document.getElementById("arenaDebriefSummary").textContent = payload.summary;
  document.getElementById("arenaDebriefRole").textContent =
    payload.role || arenaState.targetRole;
  document.getElementById("arenaDebriefTurns").textContent =
    String(payload.turns ?? Math.max(0, arenaState.turn - 1));
  document.getElementById("arenaDebriefPressure").textContent =
    String(payload.pressure ?? arenaState.currentPressure);

  document.getElementById("arenaDebriefStrengths").innerHTML =
    (payload.strengths || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.getElementById("arenaDebriefImprovements").innerHTML =
    (payload.improvements || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.getElementById("arenaDebriefFocus").innerHTML =
    (payload.recommendedFocus || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

document.getElementById("arenaRestart")?.addEventListener("click", () => {
  arenaState.sessionId = null;
  arenaState.turn = 1;
  arenaState.currentPressure = arenaState.pressure;
  arenaState.step = 1;
  renderArenaStep();
  showArenaView(arenaArchitect);
});

renderArenaStep();


// ===== v8 CodeForge randomized challenge + execution judge =====

// ===== v12 Monaco-powered CodeForge IDE =====
let forgeMonacoEditor = null;
let forgeMonacoModel = null;
let forgeMonacoPromise = null;

const forgeMonacoLanguages = {
  JavaScript: "javascript",
  Python: "python",
  Java: "java",
  "C++": "cpp"
};

function getForgeTabSize(language = forgeConfig?.language) {
  return language === "JavaScript" ? 2 : 4;
}

function getForgeCode() {
  if (forgeMonacoEditor) return forgeMonacoEditor.getValue();
  return document.getElementById("forgeCodeEditor")?.value || "";
}

function setForgeCode(value = "") {
  if (forgeMonacoEditor) {
    forgeMonacoEditor.setValue(String(value));
  } else {
    const textarea = document.getElementById("forgeCodeEditor");
    if (textarea) textarea.value = String(value);
    if (typeof syncForgeLineNumbers === "function") syncForgeLineNumbers();
  }
}

function focusForgeCodeEditor() {
  if (forgeMonacoEditor) {
    forgeMonacoEditor.focus();
  } else {
    document.getElementById("forgeCodeEditor")?.focus();
  }
}

function setForgeEditorLanguage(language) {
  if (!window.monaco || !forgeMonacoModel) return;

  const monacoLanguage = forgeMonacoLanguages[language] || "javascript";
  window.monaco.editor.setModelLanguage(forgeMonacoModel, monacoLanguage);

  const tabSize = getForgeTabSize(language);
  forgeMonacoModel.updateOptions({
    tabSize,
    indentSize: tabSize,
    insertSpaces: true,
    trimAutoWhitespace: true
  });

  forgeMonacoEditor?.updateOptions({
    tabSize,
    insertSpaces: true
  });
}

function configureHirelandMonacoTheme() {
  if (!window.monaco) return;

  window.monaco.editor.defineTheme("hireland-codeforge", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "66738A", fontStyle: "italic" },
      { token: "keyword", foreground: "B5A8FF" },
      { token: "number", foreground: "FFD38A" },
      { token: "string", foreground: "91E7C5" },
      { token: "type", foreground: "82D8FF" },
      { token: "identifier", foreground: "D8DEEB" },
      { token: "delimiter", foreground: "8B96AC" },
      { token: "operator", foreground: "7EFFF4" }
    ],
    colors: {
      "editor.background": "#070A13",
      "editor.foreground": "#D8DEEB",
      "editorLineNumber.foreground": "#3F4A61",
      "editorLineNumber.activeForeground": "#8792A9",
      "editorCursor.foreground": "#7EFFF4",
      "editor.selectionBackground": "#183741",
      "editor.inactiveSelectionBackground": "#13272E",
      "editor.lineHighlightBackground": "#0A0F1C",
      "editor.lineHighlightBorder": "#0D1524",
      "editorIndentGuide.background1": "#172033",
      "editorIndentGuide.activeBackground1": "#2B3A51",
      "editorBracketMatch.background": "#16353C",
      "editorBracketMatch.border": "#7EFFF4",
      "editorWhitespace.foreground": "#1B2638",
      "editor.findMatchBackground": "#725C34",
      "editor.findMatchHighlightBackground": "#40371F",
      "editorSuggestWidget.background": "#0D1322",
      "editorSuggestWidget.border": "#273148",
      "editorSuggestWidget.foreground": "#D2D9E6",
      "editorSuggestWidget.selectedBackground": "#18263A",
      "editorHoverWidget.background": "#0D1322",
      "editorHoverWidget.border": "#273148",
      "editorWidget.background": "#0D1322",
      "editorWidget.border": "#273148",
      "input.background": "#080C17",
      "input.border": "#273148",
      "input.foreground": "#D5DCE9",
      "focusBorder": "#31505A",
      "scrollbarSlider.background": "#4C587055",
      "scrollbarSlider.hoverBackground": "#65728A77",
      "scrollbarSlider.activeBackground": "#78859B88"
    }
  });
}

function loadMonacoScript() {
  return new Promise((resolve, reject) => {
    if (window.require && window.require.config) return resolve();

    const existing = document.querySelector('script[data-hireland-monaco-loader="1"]');
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "/vendor/monaco/loader.js";
    script.async = true;
    script.dataset.hirelandMonacoLoader = "1";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Monaco loader could not be loaded."));
    document.head.appendChild(script);
  });
}

async function ensureForgeMonaco() {
  if (forgeMonacoEditor) return forgeMonacoEditor;
  if (forgeMonacoPromise) return forgeMonacoPromise;

  forgeMonacoPromise = (async () => {
    await loadMonacoScript();

    const origin = window.location.origin;

    // Monaco workers are loaded locally from node_modules.
    window.MonacoEnvironment = {
      getWorkerUrl: function () {
        const workerBootstrap = `
          self.MonacoEnvironment = { baseUrl: '${origin}/vendor/monaco/' };
          importScripts('${origin}/vendor/monaco/base/worker/workerMain.js');
        `;
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(workerBootstrap)}`;
      }
    };

    window.require.config({
      paths: { vs: "/vendor/monaco" }
    });

    await new Promise((resolve, reject) => {
      window.require(
        ["vs/editor/editor.main"],
        resolve,
        reject
      );
    });

    configureHirelandMonacoTheme();

    const host = document.getElementById("forgeMonacoEditor");
    const shell = document.getElementById("forgeCodeShell");
    if (!host || !shell) throw new Error("CodeForge Monaco host is missing.");

    const selectedLanguage =
      forgeMonacoLanguages[forgeConfig.language] || "javascript";

    forgeMonacoModel = window.monaco.editor.createModel("", selectedLanguage);
    forgeMonacoModel.updateOptions({
      tabSize: getForgeTabSize(forgeConfig.language),
      indentSize: getForgeTabSize(forgeConfig.language),
      insertSpaces: true,
      trimAutoWhitespace: true
    });

    forgeMonacoEditor = window.monaco.editor.create(host, {
      model: forgeMonacoModel,
      theme: "hireland-codeforge",

      // LeetCode-style editor behavior
      lineNumbers: "on",
      lineNumbersMinChars: 3,
      glyphMargin: false,
      folding: true,
      showFoldingControls: "mouseover",
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        bracketPairsHorizontal: true,
        highlightActiveBracketPair: true,
        indentation: true,
        highlightActiveIndentation: true
      },
      matchBrackets: "always",
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      autoSurround: "languageDefined",
      autoIndent: "advanced",
      formatOnPaste: true,
      formatOnType: true,
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false
      },
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "smart",
      parameterHints: { enabled: true },
      hover: { enabled: true, delay: 350 },
      links: false,
      codeLens: false,
      minimap: { enabled: false },
      stickyScroll: { enabled: false },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorSmoothCaretAnimation: "on",
      cursorBlinking: "smooth",
      renderLineHighlight: "all",
      renderWhitespace: "selection",
      wordWrap: "off",
      contextmenu: true,
      mouseWheelZoom: true,
      dragAndDrop: true,
      multiCursorModifier: "alt",

      // Preserve current visual proportions
      fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
      fontLigatures: true,
      fontSize: 15,
      lineHeight: 29,
      letterSpacing: 0,
      padding: { top: 22, bottom: 22 },

      automaticLayout: true,
      fixedOverflowWidgets: true,
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
        alwaysConsumeMouseWheel: false
      }
    });

    // LeetCode-like keyboard actions while preserving existing buttons.
    forgeMonacoEditor.addAction({
      id: "hireland-run-samples",
      label: "Run sample tests",
      keybindings: [
        window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter
      ],
      run: () => runForgeSamples()
    });

    forgeMonacoEditor.addAction({
      id: "hireland-submit",
      label: "Submit solution",
      keybindings: [
        window.monaco.KeyMod.CtrlCmd |
        window.monaco.KeyMod.Shift |
        window.monaco.KeyCode.Enter
      ],
      run: () => submitForgeCode()
    });

    forgeMonacoEditor.addAction({
      id: "hireland-clear-editor",
      label: "Clear editor",
      keybindings: [
        window.monaco.KeyMod.CtrlCmd |
        window.monaco.KeyMod.Shift |
        window.monaco.KeyCode.Backspace
      ],
      run: () => {
        setForgeCode("");
        resetForgeJudgeUI();
      }
    });

    shell.classList.add("monaco-ready");

    // Keep any text typed into the fallback editor before Monaco finished loading.
    const fallback = document.getElementById("forgeCodeEditor");
    if (fallback?.value) forgeMonacoEditor.setValue(fallback.value);

    return forgeMonacoEditor;
  })().catch(error => {
    console.warn("Monaco unavailable; using CodeForge fallback editor.", error);
    forgeMonacoPromise = null;
    return null;
  });

  return forgeMonacoPromise;
}

const forgeLauncher=document.getElementById("forgeLauncher");
const forgeLoading=document.getElementById("forgeLoading");
const forgeWorkspace=document.getElementById("forgeWorkspace");
const startForgeSession=document.getElementById("startForgeSession");
const newForgeSession=document.getElementById("newForgeSession");
const forgeSummary=document.getElementById("forgeSummary");
const forgeAiState=document.getElementById("forgeAiState");
const forgeConfig={language:"JavaScript",difficulty:"Easy",focus:"Any"};
const forgeFocusLabels={Any:"Smart Mix","Algorithms & Data Structures":"Algorithms","Practical Implementation":"Practical","Debugging & Reasoning":"Debugging"};
let currentForgeChallenge=null,forgeLoadingMessageInterval=null;

document.querySelectorAll("[data-forge-group]").forEach(group=>group.addEventListener("click",event=>{
  const choice=event.target.closest(".choice-card");if(!choice)return;
  group.querySelectorAll(".choice-card").forEach(b=>b.classList.remove("active"));choice.classList.add("active");
  forgeConfig[group.dataset.forgeGroup]=choice.dataset.value;
  forgeSummary.textContent=`${forgeConfig.language} · ${forgeConfig.difficulty} · ${forgeFocusLabels[forgeConfig.focus]}`;
}));

function chooseForgeLeetCodeSeed(){if(!Array.isArray(problems)||!problems.length)return null;const e=problems.filter(p=>p.difficulty===forgeConfig.difficulty),pool=e.length?e:problems,p=pool[Math.floor(Math.random()*pool.length)];return p?{title:p.title,topic:p.topic}:null}
function escapeHtml(v=""){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function formatMultiline(v=""){return escapeHtml(v).replace(/\n/g,"<br>")}
function renderExamples(examples=[]){document.getElementById("forgeExamples").innerHTML=examples.map((x,i)=>`<div class="forge-example"><code>Example ${i+1}\nInput:\n${escapeHtml(x.input)}\n\nOutput:\n${escapeHtml(x.expectedOutput)}</code>${x.explanation?`<small>${escapeHtml(x.explanation)}</small>`:""}</div>`).join("")}
function testCard(t,i,kind){const hidden=kind==="hidden";return`<article class="forge-test-case" data-test-kind="${kind}" data-test-index="${i}"><span class="test-status-icon">${hidden?"◆":"○"}</span><span class="test-copy"><strong>${hidden?`Hidden test ${i+1}`:`Sample ${i+1}`}</strong><small>${hidden?"Private input • evaluated on submit":escapeHtml(t.explanation||"Visible test case")}</small><code>${hidden?"Input and expected output are hidden":`in: ${escapeHtml(t.input)} → out: ${escapeHtml(t.expectedOutput)}`}</code></span><span class="test-runtime">—</span></article>`}

function resetForgeJudgeUI(){
  const state=document.getElementById("forgeJudgeState");state.className="judge-state";state.textContent="Not run";
  document.getElementById("forgeSampleScore").textContent="Not run";document.getElementById("forgeHiddenScore").textContent="Runs on submit";
  document.getElementById("forgeMetricsPanel").hidden=true;
  document.getElementById("forgeSolutionPanel").hidden=true;
  document.getElementById("forgeSolutionPanel").classList.remove("accepted-solution");
  document.getElementById("forgeReviewSummary").textContent="Submit your solution to receive a language-specific review.";
  document.getElementById("forgeReviewStrengths").innerHTML="";
  document.getElementById("forgeReviewImprovements").innerHTML="";
}
function renderForgeChallenge(c){
  currentForgeChallenge=c;
  document.getElementById("forgeSourceBadge").textContent=c.sourceLabel||"Challenge";
  document.getElementById("forgeLanguageBadge").textContent=forgeConfig.language;
  document.getElementById("forgeLanguageLockText").textContent=`${forgeConfig.language} session`;
  document.getElementById("forgeLanguageLockNote").textContent=`Write, run, review, and compare solutions in ${forgeConfig.language} for this challenge.`;
  document.getElementById("forgeReviewLanguageBadge").textContent=forgeConfig.language;
  document.getElementById("forgeDifficultyBadge").textContent=c.difficulty;
  document.getElementById("forgeProblemDifficulty").textContent=c.difficulty;
  document.getElementById("forgeProblemTitle").textContent=c.title;
  document.getElementById("forgeProblemStatement").innerHTML=formatMultiline(c.statement);
  document.getElementById("forgeInputFormat").innerHTML=formatMultiline(c.inputFormat);
  document.getElementById("forgeOutputFormat").innerHTML=formatMultiline(c.outputFormat);
  document.getElementById("forgeConstraints").innerHTML=(c.constraints||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
  renderExamples(c.examples||[]);
  document.getElementById("forgeEditorLanguage").textContent=forgeConfig.language;
  document.getElementById("forgeEditorModeLabel").textContent=`${forgeConfig.language} mode`;

  const languageEditorConfig={
    JavaScript:{
      indent:"2 spaces · JavaScript blocks",
      contract:"Paste normal JavaScript code or solution logic",
      placeholder:"Write or paste your JavaScript solution here…\n\nNormal stdin-reading programs are supported."
    },
    Python:{
      indent:"4 spaces · Python indentation",
      contract:"Paste normal Python code or solution logic",
      placeholder:"Write or paste your Python solution here…\n\ninput(), sys.stdin and print() are supported."
    },
    Java:{
      indent:"4 spaces · Java blocks",
      contract:"Paste a normal Java program or solution logic",
      placeholder:"Write or paste your Java solution here…\n\nA normal main() program is supported."
    },
    "C++":{
      indent:"4 spaces · C++ blocks",
      contract:"Paste a normal C++ program or solution logic",
      placeholder:"Write or paste your C++ solution here…\n\nA normal int main() program is supported."
    }
  };

  const editorConfig=languageEditorConfig[forgeConfig.language];
  document.getElementById("forgeIndentLabel").textContent=editorConfig.indent;
  document.getElementById("forgeEditorContract").textContent=editorConfig.contract;

  const fallbackEditor=document.getElementById("forgeCodeEditor");
  if(fallbackEditor){
    fallbackEditor.value="";
    fallbackEditor.dataset.initial="";
    fallbackEditor.placeholder=editorConfig.placeholder;
  }

  setForgeCode("");
  syncForgeLineNumbers();

  // Upgrade to Monaco without blocking the challenge page.
  ensureForgeMonaco().then(editor=>{
    if(!editor) return;
    setForgeEditorLanguage(forgeConfig.language);
    editor.updateOptions({
      tabSize:getForgeTabSize(forgeConfig.language),
      insertSpaces:true
    });
    editor.layout();
    editor.focus();
  });
  document.getElementById("forgeSampleTests").innerHTML=(c.sampleTests||[]).map((t,i)=>testCard(t,i,"sample")).join("");
  document.getElementById("forgeHiddenTests").innerHTML=Array.from({length:c.hiddenTestCount||0},(_,i)=>testCard({},i,"hidden")).join("");
  resetForgeJudgeUI();
  document.getElementById("forgeConsoleOutput").innerHTML=`<p>&gt; Challenge loaded.</p><p>&gt; ${escapeHtml(c.runnerAvailable?"Local runner ready.":c.runnerMessage||"Runtime missing.")}</p><p>&gt; Run checks samples. Submit checks hidden cases.</p>`;
  document.getElementById("forgeConsoleStatus").textContent=c.runnerAvailable?"● ready":"● runner missing";
}
const forgeLoadingMessages=["Choosing a challenge pattern…","Building a complete question…","Generating visible sample tests…","Preparing private judge cases…","Validating the reference solution…"];
function beginForgeLoadingMessages(){let i=0,t=document.getElementById("forgeLoadingText");t.textContent=forgeLoadingMessages[0];clearInterval(forgeLoadingMessageInterval);forgeLoadingMessageInterval=setInterval(()=>{i=(i+1)%forgeLoadingMessages.length;t.textContent=forgeLoadingMessages[i]},950)}
async function generateForgeChallenge(){
  forgeLauncher.hidden=true;forgeWorkspace.hidden=true;forgeLoading.hidden=false;beginForgeLoadingMessages();cacheReflectionBounds();
  const leetcodeSeed=Math.random()<.45?chooseForgeLeetCodeSeed():null;
  try{
    const r=await fetch("/api/codeforge/challenge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...forgeConfig,leetcodeSeed})}),p=await r.json();
    if(!r.ok)throw new Error(p.error||`Challenge service returned ${r.status}`);
    renderForgeChallenge(p);forgeAiState.innerHTML=p.sourceLabel==="Local Challenge"?"<i></i> local fallback":"<i></i> AI connected";
  }catch(e){console.error(e);forgeLoading.hidden=true;forgeLauncher.hidden=false;forgeAiState.innerHTML="<i></i> service unavailable";alert(`CodeForge could not create a challenge: ${e.message}`);clearInterval(forgeLoadingMessageInterval);return}
  clearInterval(forgeLoadingMessageInterval);
  setTimeout(()=>{
    forgeLoading.hidden=true;
    forgeWorkspace.hidden=false;
    forgeWorkspace.classList.remove("forge-test-enter");
    void forgeWorkspace.offsetWidth;
    forgeWorkspace.classList.add("forge-test-enter");
    setTimeout(()=>forgeWorkspace.classList.remove("forge-test-enter"),1200);
    window.scrollTo({top:0,behavior:"smooth"});
    cacheReflectionBounds();
    if(forgeMonacoEditor){
      requestAnimationFrame(()=>forgeMonacoEditor.layout());
    }
  },420);
}
function busy(on,label="Running…"){document.getElementById("forgeRunCode").disabled=on;document.getElementById("forgeSubmitCode").disabled=on;const s=document.getElementById("forgeJudgeState");if(on){s.className="judge-state running";s.textContent=label}}
function clearCases(kind){document.querySelectorAll(`.forge-test-case[data-test-kind="${kind}"]`).forEach(c=>{c.classList.remove("passed","failed","running");c.querySelector(".test-status-icon").textContent=kind==="hidden"?"◆":"○";c.querySelector(".test-runtime").textContent="—";c.querySelector(".test-failure-detail")?.remove()})}
function paint(kind,r){const c=document.querySelector(`.forge-test-case[data-test-kind="${kind}"][data-test-index="${r.index}"]`);if(!c)return;c.classList.add(r.passed?"passed":"failed");c.querySelector(".test-status-icon").textContent=r.passed?"✓":"✕";c.querySelector(".test-runtime").textContent=`${Number(r.runtimeMs||0).toFixed(2)} ms`;if(!r.passed){const d=document.createElement("small");d.className="test-failure-detail";d.textContent=r.error||(kind==="sample"?`Actual: ${r.actualOutput||"(empty)"} • Expected: ${r.expectedOutput}`:"Hidden case failed");c.querySelector(".test-copy").appendChild(d)}}
async function judge(endpoint,label){
  if(!currentForgeChallenge?.challengeId)throw new Error("Challenge session is missing. Start a new challenge.");
  const code=getForgeCode();if(!code.trim())throw new Error("Write some code before running it.");
  busy(true,label);document.getElementById("forgeConsoleStatus").textContent="● running";document.getElementById("forgeConsoleOutput").innerHTML=`<p>&gt; ${escapeHtml(label)}</p>`;
  const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({challengeId:currentForgeChallenge.challengeId,code})}),p=await r.json();if(!r.ok)throw new Error(p.error||`Judge returned ${r.status}`);return p;
}
async function runForgeSamples(){
  clearCases("sample");document.getElementById("forgeSampleScore").textContent="Running…";
  try{const r=await judge("/api/codeforge/run","Running sample tests…");r.results.forEach(x=>paint("sample",x));const ok=r.passed===r.total;document.getElementById("forgeSampleScore").textContent=`${r.passed}/${r.total} passed`;const s=document.getElementById("forgeJudgeState");s.className=`judge-state ${ok?"passed":"failed"}`;s.textContent=ok?"Samples passed":"Samples failed";document.getElementById("forgeConsoleStatus").textContent=ok?"● samples passed":"● fix required";document.getElementById("forgeConsoleOutput").innerHTML=`
      <p>&gt; Sample judge complete: ${r.passed}/${r.total} passed.</p>
      <p>&gt; Mode: ${r.executionMode==="full-program"?"normal program":"solution-only"}.</p>
      <p>&gt; Total runtime: ${Number(r.totalRuntimeMs).toFixed(2)} ms.</p>
      ${r.runnerError?`<p>&gt; ${escapeHtml(r.runnerError)}</p>`:""}
    `}
  catch(e){const s=document.getElementById("forgeJudgeState");s.className="judge-state failed";s.textContent="Run failed";document.getElementById("forgeSampleScore").textContent="Error";document.getElementById("forgeConsoleStatus").textContent="● error";document.getElementById("forgeConsoleOutput").innerHTML=`<p>&gt; ${escapeHtml(e.message)}</p>`}finally{busy(false)}
}
async function submitForgeCode(){
  clearCases("sample");clearCases("hidden");document.getElementById("forgeSampleScore").textContent="Checking…";document.getElementById("forgeHiddenScore").textContent="Checking…";
  try{
    const r=await judge("/api/codeforge/submit","Submitting against hidden tests…");r.sampleResults.forEach(x=>paint("sample",x));r.hiddenResults.forEach(x=>paint("hidden",x));
    document.getElementById("forgeSampleScore").textContent=`${r.samplePassed}/${r.sampleTotal} passed`;document.getElementById("forgeHiddenScore").textContent=`${r.hiddenPassed}/${r.hiddenTotal} passed`;
    const s=document.getElementById("forgeJudgeState");s.className=`judge-state ${r.allPassed?"passed":"failed"}`;s.textContent=r.allPassed?"Accepted":"Not accepted";
    document.getElementById("forgeConsoleStatus").textContent=r.allPassed?"● accepted":"● submitted";
    document.getElementById("forgeConsoleOutput").innerHTML=`
      <p>&gt; Submission complete.</p>
      <p>&gt; Mode: ${r.executionMode==="full-program"?"normal program":"solution-only"}.</p>
      <p>&gt; Samples: ${r.samplePassed}/${r.sampleTotal}.</p>
      <p>&gt; Hidden: ${r.hiddenPassed}/${r.hiddenTotal}.</p>
      <p>&gt; Runtime: ${Number(r.totalRuntimeMs).toFixed(2)} ms.</p>
    `;
    const m=document.getElementById("forgeMetricsPanel");m.hidden=false;document.getElementById("forgeSubmissionTitle").textContent=r.allPassed?"Accepted — all tests passed":"Submission evaluated";const badge=document.getElementById("forgeSubmissionBadge");badge.className=`submission-badge ${r.allPassed?"success":"fail"}`;badge.textContent=r.allPassed?"Accepted":"Needs work";
    document.getElementById("forgeRuntimeMetric").textContent=`${Number(r.totalRuntimeMs).toFixed(2)} ms`;
    document.getElementById("forgeTimeComplexity").textContent=r.complexity?.timeComplexity||"—";
    document.getElementById("forgeSpaceComplexity").textContent=r.complexity?.spaceComplexity||"—";
    document.getElementById("forgeTimeComplexityNote").textContent=r.complexity?.timeNote||"Estimated from submitted code.";
    document.getElementById("forgeSpaceComplexityNote").textContent=r.complexity?.spaceNote||"Estimated from submitted code.";
    document.getElementById("forgeHiddenMetric").textContent=`${r.hiddenPassed}/${r.hiddenTotal}`;
    document.getElementById("forgeReviewTitle").textContent=`${forgeConfig.language} code review`;
    document.getElementById("forgeReviewLanguageBadge").textContent=forgeConfig.language;
    document.getElementById("forgeReviewSummary").textContent=r.complexity?.reviewSummary||`Review completed for your ${forgeConfig.language} submission.`;
    document.getElementById("forgeReviewStrengths").innerHTML=(r.complexity?.strengths||[]).map(item=>`<li>${escapeHtml(item)}</li>`).join("");
    document.getElementById("forgeReviewImprovements").innerHTML=(r.complexity?.improvements||[]).map(item=>`<li>${escapeHtml(item)}</li>`).join("");
    const sol=document.getElementById("forgeSolutionPanel");

    if(r.allPassed && r.bestSolution){
      sol.hidden=false;
      sol.classList.add("accepted-solution");
      document.getElementById("forgeBestTime").textContent=`Time ${r.bestTimeComplexity||"—"}`;
      document.getElementById("forgeBestSpace").textContent=`Space ${r.bestSpaceComplexity||"—"}`;
      document.getElementById("forgeBestSolution").textContent=r.bestSolution;
    }else{
      sol.hidden=true;
      sol.classList.remove("accepted-solution");
      document.getElementById("forgeBestSolution").textContent="";
    }

    setTimeout(()=>{m.scrollIntoView({behavior:"smooth",block:"start"});cacheReflectionBounds()},160);
  }catch(e){const s=document.getElementById("forgeJudgeState");s.className="judge-state failed";s.textContent="Submit failed";document.getElementById("forgeHiddenScore").textContent="Error";document.getElementById("forgeConsoleStatus").textContent="● error";document.getElementById("forgeConsoleOutput").innerHTML=`<p>&gt; ${escapeHtml(e.message)}</p>`}finally{busy(false)}
}



function syncForgeLineNumbers(){
  const editor=document.getElementById("forgeCodeEditor");
  const gutter=document.getElementById("forgeLineNumbers");
  if(!editor||!gutter)return;

  const count=Math.max(1,editor.value.split("\n").length);
  gutter.textContent=Array.from({length:count},(_,index)=>String(index+1)).join("\n");
  gutter.scrollTop=editor.scrollTop;
}

document.getElementById("forgeCodeEditor")?.addEventListener("input",syncForgeLineNumbers);
document.getElementById("forgeCodeEditor")?.addEventListener("scroll",event=>{
  const gutter=document.getElementById("forgeLineNumbers");
  if(gutter)gutter.scrollTop=event.currentTarget.scrollTop;
});

function getEditorIndentUnit(language){
  return language === "JavaScript" ? "  " : "    ";
}

function getCurrentLine(text, position){
  const start=text.lastIndexOf("\n",position-1)+1;
  const end=text.indexOf("\n",position);
  return {
    start,
    end:end===-1?text.length:end,
    text:text.slice(start,end===-1?text.length:end)
  };
}

document.getElementById("forgeCodeEditor")?.addEventListener("keydown",event=>{
  const editor=event.currentTarget;
  const indent=getEditorIndentUnit(forgeConfig.language);

  if(event.key==="Tab"){
    event.preventDefault();
    const start=editor.selectionStart;
    const end=editor.selectionEnd;

    if(start===end){
      editor.setRangeText(indent,start,end,"end");
      syncForgeLineNumbers();
      return;
    }

    const selected=editor.value.slice(start,end);
    const lineStart=editor.value.lastIndexOf("\n",start-1)+1;
    const indented=selected.split("\n").map(line=>indent+line).join("\n");
    editor.setRangeText(indented,lineStart,end,"select");
    syncForgeLineNumbers();
    return;
  }

  if(event.key==="Enter"){
    event.preventDefault();

    const pos=editor.selectionStart;
    const line=getCurrentLine(editor.value,pos);
    const leading=(line.text.match(/^\s*/)||[""])[0];
    const beforeCursor=editor.value.slice(line.start,pos).trimEnd();

    let extra="";
    if(forgeConfig.language==="Python" && beforeCursor.endsWith(":")){
      extra=indent;
    }else if(
      forgeConfig.language!=="Python" &&
      (beforeCursor.endsWith("{") || beforeCursor.endsWith("("))
    ){
      extra=indent;
    }

    const insertion="\n"+leading+extra;
    editor.setRangeText(insertion,pos,editor.selectionEnd,"end");
    syncForgeLineNumbers();
  }
});

startForgeSession?.addEventListener("click",generateForgeChallenge);
newForgeSession?.addEventListener("click",()=>{
  currentForgeChallenge=null;
  setForgeCode("");
  forgeWorkspace.hidden=true;
  forgeLoading.hidden=true;
  forgeLauncher.hidden=false;
  window.scrollTo({top:0,behavior:"smooth"});
  cacheReflectionBounds();
});
document.getElementById("forgeResetCode")?.addEventListener("click",()=>{
  setForgeCode("");
  syncForgeLineNumbers();
  clearCases("sample");
  clearCases("hidden");
  resetForgeJudgeUI();
  document.getElementById("forgeConsoleOutput").innerHTML="<p>&gt; Editor cleared.</p>";
  focusForgeCodeEditor();
});
document.getElementById("forgeRunCode")?.addEventListener("click",runForgeSamples);
document.getElementById("forgeSubmitCode")?.addEventListener("click",submitForgeCode);

// ===== v5 Problem Vault randomized session launcher =====
const vaultLauncher = document.getElementById("vaultLauncher");
const vaultSession = document.getElementById("vaultSession");
const startVaultSession = document.getElementById("startVaultSession");
const exitVaultSession = document.getElementById("exitVaultSession");
const sessionSummary = document.getElementById("sessionSummary");

const vaultConfig = {
  language: "JavaScript",
  difficulty: "Easy",
  timerMode: "off",
  time: null
};

const starterCodeByLanguage = {
  JavaScript: "function solve(input) {",
  Python: "def solve(input):",
  Java: "class Solution {",
  "C++": "class Solution {"
};

function updateVaultSummary() {
  const timeText = vaultConfig.timerMode === "on"
    ? `${vaultConfig.time || 30} min`
    : "Untimed";

  sessionSummary.textContent =
    `${vaultConfig.language} · ${vaultConfig.difficulty} · ${timeText}`;
}

document.querySelectorAll("[data-choice-group]").forEach(group => {
  group.addEventListener("click", event => {
    const choice = event.target.closest(".choice-card");
    if (!choice) return;

    group.querySelectorAll(".choice-card").forEach(button => {
      button.classList.remove("active");
    });

    choice.classList.add("active");
    const groupName = group.dataset.choiceGroup;

    if (groupName === "timerMode") {
      vaultConfig.timerMode = choice.dataset.value;
      const customTime = document.getElementById("vaultCustomTime");
      customTime.hidden = vaultConfig.timerMode !== "on";

      if (vaultConfig.timerMode === "on") {
        const input = document.getElementById("vaultTimeInput");
        vaultConfig.time = Math.max(1, Math.min(180, Number(input.value) || 30));
      } else {
        vaultConfig.time = null;
      }
    } else {
      vaultConfig[groupName] = choice.dataset.value;
    }

    updateVaultSummary();
  });
});

document.getElementById("vaultTimeInput")?.addEventListener("input", event => {
  const minutes = Math.max(1, Math.min(180, Number(event.target.value) || 1));
  vaultConfig.time = minutes;
  updateVaultSummary();
});

function chooseRandomProblem(difficulty) {
  const eligible = problems.filter(problem => problem.difficulty === difficulty);
  const pool = eligible.length ? eligible : problems;
  return pool[Math.floor(Math.random() * pool.length)];
}

let vaultTimerInterval = null;

function startSessionTimer(minutes) {
  clearInterval(vaultTimerInterval);

  let remaining = minutes * 60;
  const timerEl = document.getElementById("sessionTimer");

  function paintTimer() {
    const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
  }

  paintTimer();

  vaultTimerInterval = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(vaultTimerInterval);
      return;
    }
    remaining -= 1;
    paintTimer();
  }, 1000);
}

function openRandomizedSession() {
  const problem = chooseRandomProblem(vaultConfig.difficulty);

  document.getElementById("sessionLanguage").textContent = vaultConfig.language;
  document.getElementById("sessionDifficulty").textContent = vaultConfig.difficulty;
  document.getElementById("previewLanguage").textContent = vaultConfig.language;
  document.getElementById("challengeTitle").textContent = problem.title;
  document.getElementById("challengeTopic").textContent = problem.topic;
  document.getElementById("challengeDifficultyTag").textContent = problem.difficulty;
  document.getElementById("challengeIndex").textContent =
    `RANDOM CHALLENGE · #${String(problem.id).padStart(3, "0")}`;
  document.getElementById("starterCode").textContent =
    starterCodeByLanguage[vaultConfig.language];

  startVaultSession.classList.add("launching");

  setTimeout(() => {
    vaultLauncher.hidden = true;
    vaultSession.hidden = false;
    vaultSession.classList.remove("session-entering");
    void vaultSession.offsetWidth;
    vaultSession.classList.add("session-entering");

    const timerWrap = document.getElementById("vaultSessionTimerWrap");

    if (vaultConfig.timerMode === "on" && vaultConfig.time) {
      timerWrap.hidden = false;
      startSessionTimer(vaultConfig.time);
    } else {
      clearInterval(vaultTimerInterval);
      timerWrap.hidden = true;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    cacheReflectionBounds();
    startVaultSession.classList.remove("launching");
  }, 380);
}

startVaultSession?.addEventListener("click", openRandomizedSession);

exitVaultSession?.addEventListener("click", () => {
  clearInterval(vaultTimerInterval);
  vaultSession.hidden = true;
  vaultLauncher.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  cacheReflectionBounds();
});

updateVaultSummary();
