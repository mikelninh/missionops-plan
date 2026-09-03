# Architecture — MissionOps

MissionOps is a deliberately narrow proof of work. Its purpose is not to claim production readiness; it demonstrates the control boundaries that would matter in a real internal AI workflow.

## End-to-end path

```text
Programme report
      ↓
Source preservation + fingerprint
      ↓
Sensitive-data / safeguarding classification
      ↓
Context minimisation
      ↓
Evidence retrieval
      ↓
Claim-to-evidence evaluation
      ↓
Recommended action
      ↓
Draft only
      ↓
Human approval gate
      ↓
Workflow adapter (n8n / Power Automate pattern)
      ↓
Audit event
```

## Trust boundaries

### 1. Source boundary

The original source is preserved. AI transformations do not overwrite the input artefact.

### 2. Sensitive-data boundary

PII/sensitive fields are classified before downstream model processing. The system should operate on the minimum context required for the task.

### 3. Evidence boundary

Important generated claims must be linked to retrieved evidence. Missing evidence is allowed to remain missing; the model must not fill the gap with plausible prose.

### 4. Authority boundary

The agent may prepare low-risk work but does not inherit authority to create external side effects. Actions such as sending messages, updating records or triggering downstream workflows require an explicit policy decision and, for this case, human approval.

### 5. Audit boundary

Material steps emit structured events: source ingestion, sensitive-data classification, retrieval, claim evaluation, proposal, approval and execution.

## Production extension

A real deployment would replace the static demo components with:

- organisation-approved model routing,
- identity and role-based access control,
- encrypted document storage,
- configurable retention policies,
- retrieval over authorised document scopes,
- structured policy evaluation,
- real n8n / Power Automate connectors,
- observability and failure handling,
- evaluation suites and regression gates,
- DPIA / security review appropriate to the actual data and processing context.

## Non-claims

This repository does **not** claim to be an approved Plan International system, a production safeguarding solution, or a complete GDPR compliance implementation. It is an unsolicited technical proof of work built entirely with synthetic data.
