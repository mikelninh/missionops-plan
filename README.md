# MissionOps — Plan International Proof of Work

**Unofficial proof of work for the KI Engineer (d/w/m) role at Plan International Deutschland e.V.**

MissionOps demonstrates one focused workflow:

> **Project report → evidence gaps → safeguarding/PII gate → human-approved follow-up → audit trail**

The demo is intentionally small. It is designed to show how an internal AI system can help programme teams work faster while keeping evidence, privacy, safeguarding and human accountability visible.

## Golden case

A synthetic midterm programme report is reviewed by an AI workflow that:

1. extracts programme claims and indicators,
2. links each claim to evidence,
3. flags unsupported or weakly supported statements,
4. detects and masks sensitive information before model processing,
5. recommends a follow-up action,
6. requires explicit human approval before execution,
7. records the complete audit trail.

## Why this proof exists

The role at Plan International combines internal AI interfaces, workflow automation, RAG/LLMs, stakeholder requirements, privacy, operations and continuous improvement. MissionOps turns those concerns into one inspectable end-to-end flow.

## Demo principles

- **Evidence first** — no important claim without a traceable source.
- **Safeguarding by design** — sensitive data is detected and minimised before AI processing.
- **Human authority** — external actions require explicit approval.
- **Auditable AI** — retrieval, model steps, approvals and actions are visible.
- **Synthetic data only** — the demo contains no real beneficiary or programme data.

## Run locally

Open `index.html` directly in a browser or serve the repository as a static site.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Status

Demo build in progress.
