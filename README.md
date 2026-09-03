# MissionOps — Plan International Proof of Work

[![MissionOps CI](https://github.com/mikelninh/missionops-plan/actions/workflows/ci.yml/badge.svg)](https://github.com/mikelninh/missionops-plan/actions/workflows/ci.yml)

**Unofficial proof of work for the KI Engineer (d/w/m) role at Plan International Deutschland e.V.**

MissionOps demonstrates one focused operating workflow:

> **Project report → evidence gaps → safeguarding/privacy gate → human-approved follow-up → audit trail**

The point is not to build another generic NGO chatbot. The point is to show how an AI-assisted operating workflow can move faster while keeping evidence, sensitive data and human authority visible.

## 90-second demo

Open `index.html` and follow the golden case:

1. inspect claim-to-evidence links,
2. surface missing/weak evidence,
3. minimise synthetic sensitive identifiers before any downstream AI integration,
4. prepare a recommended clarification,
5. hit the explicit human approval gate,
6. inspect the resulting audit trail.

The interface is dependency-free so the proof can be hosted as a static site.

## The golden case

A synthetic midterm programme report is processed by a small deterministic control engine that:

- evaluates programme claims against a synthetic evidence fixture,
- preserves uncertainty instead of inventing missing support,
- minimises pre-labelled synthetic identifiers before downstream processing,
- recommends the next useful action from explicit rules,
- lets the automated step prepare but not autonomously execute an external action,
- requires explicit human approval for the side effect,
- records the decision path in an inspectable audit trail.

## What is actually implemented

This repository deliberately separates **working controls** from **production integration targets**.

### Implemented and testable today

- interactive 90-second static demo,
- deterministic evidence checks for the golden case,
- sensitive-context minimisation using explicitly labelled synthetic fixture data,
- explicit authority gate before an external side effect,
- simulated workflow adapter after approval,
- structured audit events,
- Python regression tests for the highest-risk control behaviours,
- GitHub Actions CI.

### Production integration targets — not pretended in this prototype

- organisation-approved LLM routing,
- scoped RAG / retrieval + reranking,
- Open WebUI / Langdock or equivalent internal interface,
- real PII/NER classification,
- identity, RBAC and authorised retrieval scopes,
- n8n / Power Automate execution adapters,
- encrypted storage and retention controls,
- production observability, security review and evals.

The UI labels these seams explicitly. There are no fake model calls, fake retrieval metrics or fabricated benchmark scores.

## Not just a mockup

The repository includes an executable control engine in `engine/missionops.py` plus tests for:

- synthetic-data-only enforcement,
- sensitive-context minimisation,
- unsupported comparative claims,
- weak qualitative evidence,
- blocked execution without approval,
- successful simulated execution only after approval,
- audit-event generation.

Run it with:

```bash
python engine/missionops.py
python -m unittest discover -s tests -v
```

No third-party Python packages are required.

## Repository map

```text
index.html                       interactive 90-second demo
styles.css / app.js              UI + guarded demo state machine
data/synthetic-midterm-report.md human-readable synthetic case
data/case.json                   machine-readable golden case
engine/missionops.py             evidence/privacy/authority controls
tests/test_missionops.py         safety + workflow tests
evals/golden-cases.md            production-oriented evaluation design
docs/architecture.md             trust boundaries + extension path
docs/plan-context.md             public Plan context used for this proof
.github/workflows/ci.yml         automated control-engine tests
.github/workflows/pages.yml      GitHub Pages deployment
```

## Why this proof exists

The advertised role combines internal AI interfaces, workflow automation, RAG/LLMs, stakeholder requirements, privacy, operations and continuous improvement. MissionOps turns those concerns into one inspectable end-to-end operating pattern rather than a list of technologies.

## Public Plan context used

This is an unsolicited prototype based only on public information. Plan International Deutschland states publicly that safeguarding applies to people with access to children, young people **or their data**, and that data about children and families must be treated confidentially. Its published materials also describe access-control concepts and differentiated rights for data systems.

Public sources:

- Safeguarding: https://www.plan.de/wie-wir-arbeiten/safeguarding-heisst-kinder-innerhalb-unserer-organisation-schuetzen.html
- Data protection: https://www.plan.de/datenschutz.html
- Safeguarding policy (2024): https://www.plan.de/fileadmin/website/09._Stiftung/Downloads/Plan_International_Deutschland_Safeguarding-Richtlinie_2024.pdf

These sources motivated the demo's emphasis on data minimisation, least privilege and explicit authority boundaries. They are **not** evidence about Plan's internal AI architecture.

## Design principles

- **Evidence first** — important claims link back to supporting material.
- **Uncertainty stays visible** — missing evidence is a valid result.
- **Safeguarding by design** — sensitive context is minimised before downstream AI integration.
- **Least privilege** — automated steps can prepare work without inheriting authority to execute it.
- **Human authority** — the demonstrated external side effect requires explicit approval.
- **Auditable controls** — policy decisions, approvals and actions leave a trace.
- **Synthetic data only** — no real beneficiary or programme data is used anywhere in the demo.

## Run the UI locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Production path

A real implementation would begin with the actual processing context, data classification, DPIA/security requirements and Plan-approved technology choices. The deterministic components in this proof are intentionally replaceable behind explicit interfaces for retrieval, model routing and workflow execution.

This prototype does **not** claim to be an approved Plan International system, an existing Plan workflow, or a complete GDPR/safeguarding implementation.
