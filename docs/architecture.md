# Architecture — MissionOps

MissionOps is deliberately narrow. It demonstrates a **control plane around an AI-assisted workflow** without pretending that every production adapter already exists.

## What executes in this repository

```text
Synthetic programme case
      ↓
Synthetic-data assertion
      ↓
Pre-labelled sensitive fixture
      ↓
Context minimisation
      ↓
Deterministic claim checks
      ↓
Recommended clarification action
      ↓
Draft-only authority boundary
      ↓
Human approval gate
      ↓
Simulated workflow adapter
      ↓
Structured audit events
```

## Production extension path

```text
Authorised programme source
      ↓
Source integrity / document controls
      ↓
PII + safeguarding classifier
      ↓
Context minimisation
      ↓
Authorised retrieval / RAG
      ↓
Claim-to-evidence evaluation
      ↓
Approved model / reasoning layer
      ↓
Policy engine
      ↓
Human approval where required
      ↓
n8n / Power Automate adapter
      ↓
Observability + audit
```

The two paths are intentionally separated so a reviewer can see what is **implemented now** and what is an **integration target**.

## Trust boundaries

### 1. Source boundary

The demo reads an explicitly synthetic fixture and refuses data that is not marked synthetic. A production implementation would add document integrity, authorised storage and retention controls.

### 2. Sensitive-data boundary

The demo uses pre-labelled synthetic identifiers to test whether downstream context is correctly minimised. It does **not** claim to implement a production PII/NER classifier. That classifier is a replaceable adapter in the production path.

### 3. Evidence boundary

The demo evaluates explicit evidence fields with deterministic rules. It demonstrates the behaviour that missing support must remain missing. Production retrieval would sit behind this boundary and would need its own citation and retrieval evals.

### 4. Authority boundary

The automated step may prepare low-risk work but does not inherit authority to create an external side effect. The Python engine raises a `PermissionError` if execution is attempted before approval. The browser demo mirrors this by keeping the final step locked until approval occurs.

### 5. Audit boundary

Material control-engine steps emit structured events: validation, context minimisation, claim review, proposal, approval, blocked execution and successful simulated execution.

## Why adapters matter

The advertised role spans internal AI interfaces, workflows, privacy and operational ownership. For that reason the prototype keeps model, retrieval and workflow execution replaceable rather than coupling trust decisions to one provider.

Potential production adapters include:

- Open WebUI / Langdock for the internal user surface,
- organisation-approved model routing,
- retrieval over authorised document scopes,
- identity and role-based access control,
- real n8n / Power Automate connectors,
- observability and failure handling,
- evaluation suites and regression gates,
- DPIA / security review appropriate to the actual data and processing context.

## Non-claims

This repository does **not** claim to be an approved Plan International system, a production safeguarding solution, an existing Plan workflow, or a complete GDPR compliance implementation. It is an unsolicited technical proof of work built entirely with synthetic data and public Plan context.
