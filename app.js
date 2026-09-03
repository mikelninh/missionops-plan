const evidence = {
  attendance: {
    title: "School attendance increased by 18%",
    verdict: "Supported in the synthetic fixture. A baseline value and a comparable current-period value are present with the same denominator definition.",
    blocks: [
      {
        source: "Synthetic Midterm Report · p. 7",
        text: "Average monthly attendance among enrolled participants increased from 68% at baseline to 86% during the current reporting period."
      },
      {
        source: "Synthetic Attendance Register · rows 14–253",
        text: "240 programme participants are represented in the attendance export used for the midterm calculation."
      }
    ]
  },
  participants: {
    title: "240 girls completed the programme",
    verdict: "Supported in the synthetic fixture. The completion register contains 240 unique synthetic participant IDs with a completed status.",
    blocks: [
      {
        source: "Synthetic Completion Register · p. 2",
        text: "Completion status: 240 unique programme participant IDs marked completed for the reporting period."
      }
    ]
  },
  dropout: {
    title: "Dropout decreased significantly",
    verdict: "Missing evidence in the synthetic fixture. Comparative language is present, but there is no comparable baseline dropout rate or denominator.",
    blocks: [
      {
        source: "Synthetic Midterm Report · p. 8",
        text: "Programme staff observed that dropout decreased significantly during the reporting period."
      },
      {
        source: "Synthetic evidence-set check",
        text: "No baseline dropout value, prior-period comparison, or denominator definition is present in the current fixture."
      }
    ]
  },
  acceptance: {
    title: "Community acceptance improved",
    verdict: "Weak evidence in the synthetic fixture. Three interviews do not justify a broad population-level claim without qualification.",
    blocks: [
      {
        source: "Synthetic Interview Notes · INT-01",
        text: "A parent representative described increased support for continued school attendance among families participating in the local sessions."
      },
      {
        source: "Synthetic Interview Notes · INT-02–03",
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
const editDraftButton = document.querySelector(".draft-card .secondary-btn");
const draftBody = document.querySelector(".draft-body");

let maxStep = 1;
let approved = false;

function polishLanding() {
  const eyebrow = document.querySelector(".topbar .eyebrow");
  const badge = document.querySelector(".hero-copy .badge");
  const title = document.querySelector(".hero-copy h2");
  const copy = document.querySelector(".hero-copy > p");
  const primary = document.getElementById("start-demo");
  const secondary = document.querySelector(".hero-actions .secondary-btn");

  if (eyebrow) eyebrow.textContent = "PLAN INTERNATIONAL · KI ENGINEER · UNOFFICIAL PROOF OF WORK";
  if (badge) badge.textContent = "Built specifically for this role";
  if (title) title.textContent = "A small proof of how I would make internal AI useful — without giving it unchecked authority.";
  if (copy) {
    copy.textContent = "The role combines AI interfaces, workflows, privacy-aware operations and stakeholder translation. MissionOps turns that into one concrete path: project report → evidence gap → sensitive-context gate → human-approved action.";
  }
  if (primary) primary.innerHTML = "Try the 90-second demo <span>→</span>";
  if (secondary) secondary.textContent = "Inspect the controls";

  if (copy && !document.querySelector(".hero-copy .scope-tags")) {
    const signals = document.createElement("div");
    signals.className = "scope-tags";
    signals.style.marginTop = "18px";
    signals.innerHTML = [
      "Evidence stays inspectable",
      "Sensitive context is minimised",
      "Humans keep authority"
    ].map((label) => `<span>${label}</span>`).join("");
    copy.insertAdjacentElement("afterend", signals);
  }
}

function setView(name) {
  Object.entries(views).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === name);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStepAccess() {
  steps.forEach((step) => {
    const n = Number(step.dataset.step);
    const locked = n > maxStep;
    step.disabled = locked;
    step.setAttribute("aria-disabled", String(locked));
    step.title = locked ? "Complete the previous control step first" : "";
  });
}

function setStep(stepNumber, unlock = false) {
  const current = Number(stepNumber);
  if (unlock) maxStep = Math.max(maxStep, current);
  if (current > maxStep) return;

  steps.forEach((step) => {
    const n = Number(step.dataset.step);
    step.classList.toggle("active", n === current);
    step.classList.toggle("done", n < current);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `step-${current}`);
  });

  renderStepAccess();

  const target = document.getElementById(`step-${current}`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function openDemo() {
  workspace.classList.remove("hidden");
  hero.style.display = "none";
  maxStep = 1;
  approved = false;
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
          <span>synthetic fixture</span>
        </div>
        <p>${block.text}</p>
      </div>
    `).join("")}
    <div class="evidence-verdict"><strong>Fixture verdict</strong><br>${item.verdict}</div>
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
  button.addEventListener("click", () => setStep(button.dataset.next, true));
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

if (editDraftButton && draftBody) {
  editDraftButton.addEventListener("click", () => {
    const editing = draftBody.getAttribute("contenteditable") === "true";
    draftBody.setAttribute("contenteditable", String(!editing));
    editDraftButton.textContent = editing ? "Edit draft" : "Finish editing";
    if (!editing) draftBody.focus();
  });
}

document.getElementById("approve-action").addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (approved) return;

  approved = true;
  button.disabled = true;
  button.textContent = "Executing simulated adapter…";

  window.setTimeout(() => {
    button.textContent = "Approved ✓";
    setStep(5, true);
  }, 520);
});

polishLanding();
renderStepAccess();
