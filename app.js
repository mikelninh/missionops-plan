const evidence = {
  attendance: {
    title: "School attendance increased by 18%",
    verdict: "Supported. A baseline value and a comparable current-period value are present, with the same denominator definition.",
    blocks: [
      {
        source: "Synthetic Midterm Report · p. 7",
        score: "0.96",
        text: "Average monthly attendance among enrolled participants increased from 68% at baseline to 86% during the current reporting period."
      },
      {
        source: "Synthetic Attendance Register · rows 14–253",
        score: "0.92",
        text: "240 programme participants are represented in the attendance export used for the midterm calculation."
      }
    ]
  },
  participants: {
    title: "240 girls completed the programme",
    verdict: "Supported. The completion register contains 240 unique synthetic participant IDs with a completed status.",
    blocks: [
      {
        source: "Synthetic Completion Register · p. 2",
        score: "0.97",
        text: "Completion status: 240 unique programme participant IDs marked completed for the reporting period."
      }
    ]
  },
  dropout: {
    title: "Dropout decreased significantly",
    verdict: "Missing evidence. The report uses comparative language but the retrieved evidence contains no comparable baseline dropout rate or denominator.",
    blocks: [
      {
        source: "Synthetic Midterm Report · p. 8",
        score: "0.91",
        text: "Programme staff observed that dropout decreased significantly during the reporting period."
      },
      {
        source: "Evidence search result",
        score: "—",
        text: "No baseline dropout value, prior-period comparison, or denominator definition was found in the current evidence set."
      }
    ]
  },
  acceptance: {
    title: "Community acceptance improved",
    verdict: "Weak evidence. The direction is plausible, but three stakeholder interviews are not enough to support a broad population-level claim without qualification.",
    blocks: [
      {
        source: "Synthetic Interview Notes · INT-01",
        score: "0.82",
        text: "A parent representative described increased support for continued school attendance among families participating in the local sessions."
      },
      {
        source: "Synthetic Interview Notes · INT-02–03",
        score: "0.79",
        text: "Two additional stakeholders reported more positive discussion around girls' education, while noting that resistance remains in some households."
      }
    ]
  }
};

const views = {
  case: document.getElementById("case-view"),
  audit: document.getElementById("audit-view"),
  architecture: document.getElementById("architecture-view")
};

const navItems = [...document.querySelectorAll(".nav-item")];
const steps = [...document.querySelectorAll(".step")];
const panels = [...document.querySelectorAll(".step-panel")];
const workspace = document.getElementById("workspace");
const hero = document.querySelector(".hero-card");
const drawer = document.getElementById("evidence-drawer");
const drawerTitle = document.getElementById("drawer-title");
const drawerContent = document.getElementById("drawer-content");

function setView(name) {
  Object.entries(views).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === name);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setStep(stepNumber) {
  const current = Number(stepNumber);

  steps.forEach((step) => {
    const n = Number(step.dataset.step);
    step.classList.toggle("active", n === current);
    step.classList.toggle("done", n < current);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `step-${current}`);
  });

  const target = document.getElementById(`step-${current}`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function openDemo() {
  workspace.classList.remove("hidden");
  hero.style.display = "none";
  setStep(1);
  workspace.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openEvidence(key) {
  const item = evidence[key];
  if (!item) return;

  drawerTitle.textContent = item.title;
  drawerContent.innerHTML = `
    ${item.blocks.map((block) => `
      <div class="evidence-block">
        <div class="source">
          <span>${block.source}</span>
          <span>relevance ${block.score}</span>
        </div>
        <p>${block.text}</p>
      </div>
    `).join("")}
    <div class="evidence-verdict"><strong>Verdict</strong><br>${item.verdict}</div>
  `;

  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

navItems.forEach((item) => {
  item.addEventListener("click", () => setView(item.dataset.view));
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.jump));
});

document.getElementById("start-demo").addEventListener("click", openDemo);

steps.forEach((step) => {
  step.addEventListener("click", () => {
    if (!workspace.classList.contains("hidden")) {
      setStep(step.dataset.step);
    }
  });
});

document.querySelectorAll(".next-step").forEach((button) => {
  button.addEventListener("click", () => setStep(button.dataset.next));
});

document.querySelectorAll(".claim-row").forEach((row) => {
  row.addEventListener("click", () => openEvidence(row.dataset.claim));
});

document.querySelectorAll("[data-close-drawer]").forEach((el) => {
  el.addEventListener("click", closeDrawer);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawer();
});

document.getElementById("approve-action").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = "Executing…";

  window.setTimeout(() => {
    button.textContent = "Approved ✓";
    setStep(5);
  }, 520);
});
