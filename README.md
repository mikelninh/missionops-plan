# MissionOps — Plan International Proof of Work

**Unofficial proof of work for the KI Engineer (d/w/m) role at Plan International Deutschland e.V.**

MissionOps demonstrates one focused operating workflow:

> **Project report → evidence gaps → safeguarding/PII gate → human-approved follow-up → audit trail**

The point is not to build another generic NGO chatbot. The point is to show how internal AI can help programme teams move faster while making evidence, privacy, safeguarding and human accountability more visible.

## 90-second demo

Open `index.html` and follow the golden case:

1. inspect claim-to-evidence links,
2. surface missing/weak evidence,
3. minimise synthetic sensitive identifiers before model processing,
4. generate a recommended clarification,
5. hit the explicit human approval gate,
6. inspect the resulting audit trail.

The interface is intentionally static and dependency-free so it can be deployed anywhere in seconds.

## The golden case

A synthetic midterm programme report is reviewed by a trustworthy AI workflow that:

- evaluates programme claims against evidence,
- preserves uncertainty instead of inventing missing support,
- detects and masks sensitive information before downstream AI processing,
- recommends the next useful action,
- lets the agent prepare but not autonomously send an external message,
- requires explicit human approval for the side effect,
- records the decision path in an inspectable audit trail.

## Not just a mockup

The repository includes a small executable control engine in `engine/missionops.py` plus tests for the highest-risk behaviours:

- sensitive-data minimisation,
- unsupported comparative claims,
- weak qualitative evidence,
- blocked execution without approval,
- successful execution only after approval,
- audit-event generation.

Run it with:

```bash
python engine/missionops.py
python -m unittest discover -s tests -v
```

No third-party Python packages are required.

## Repository map

```text
index.html                      interactive 90-second demo
styles.css / app.js             UI + demo state machine
data/synthetic-midterm-report.md human-readable synthetic case
data/case.json                  machine-readable golden case
engine/missionops.py            evidence/privacy/authority controls
tests/test_missionops.py        safety + workflow tests
evals/golden-cases.md           production-oriented evaluation design
docs/architecture.md            trust boundaries + extension path
.github/workflows/ci.yml        automated golden-case test run
```

## Why this proof exists

The advertised role combines internal AI interfaces, workflow automation, RAG/LLMs, stakeholder requirements, privacy, operations and continuous improvement. MissionOps turns those concerns into one inspectable end-to-end flow rather than a list of technologies.

## Design principles

- **Evidence first** — important claims link back to supporting material.
- **Uncertainty stays visible** — missing evidence is a valid result.
- **Safeguarding by design** — sensitive data is minimised before downstream AI processing.
- **Least privilege** — the agent can prepare work without inheriting authority to execute it.
- **Human authority** — external side effects require explicit approval in this case.
- **Auditable AI** — retrieval, policy decisions, approvals and actions leave a trace.
- **Synthetic data only** — no real beneficiary or programme data is used anywhere in the demo.

## Run the UI locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Production path

A production implementation would add organisation-approved model routing, identity/RBAC, encrypted storage, authorised retrieval scopes, configurable retention, real n8n/Power Automate adapters, observability, regression evals and the appropriate security/privacy review for the actual processing context.

This prototype does **not** claim to be an approved Plan International system or a complete GDPR/safeguarding implementation. It is an unsolicited technical proof of work built entirely with synthetic data.
