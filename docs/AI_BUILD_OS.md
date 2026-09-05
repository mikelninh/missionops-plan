# AI Build OS — MissionOps

MissionOps uses a lightweight agentic software-development loop. The purpose is not to maximise agent autonomy. The purpose is to make every important build decision, action boundary and success claim inspectable.

## 01 — SHAPE
**Problem → user → constraints → architecture**

For this proof:
- problem: evidence gaps and sensitive follow-up work can create slow, opaque programme-report workflows;
- reviewer: a hiring manager or technical stakeholder evaluating an AI-assisted NGO operating pattern;
- constraints: synthetic data only, no invented Plan internals, no real external side effects;
- architecture: deterministic controls around evidence, minimisation, authority and auditability.

Output: `README.md`, `docs/architecture.md`, `docs/plan-context.md`.

## 02 — SPECIFY
**Requirements → boundaries → acceptance criteria**

The golden-case contract lives in `evals/golden-cases.md` and the regression behaviour in `tests/test_missionops.py`.

Key acceptance conditions:
- supported claims remain linked to evidence;
- unsupported claims do not gain invented support;
- weak evidence preserves uncertainty;
- labelled synthetic sensitive values are removed before downstream context;
- external execution is blocked without approval;
- approved execution occurs once and is auditable.

## 03 — DELEGATE
**Agents execute within explicit autonomy limits**

Agent work is classified in `AGENTS.md` from A0 observation through A4 sensitive/high-impact action.

The public proof never grants an agent authority over real beneficiary data, external messaging or production organisation systems.

## 04 — PROVE
**Tests → evals → adversarial cases → evidence**

Current proof:

```bash
python -m unittest discover -s tests -v
```

The six golden cases cover support, evidence gaps, qualitative overgeneralisation, minimisation, approval bypass and approved execution.

Future production integrations would need separate measured evals for retrieval, citation correctness, evidence-gap detection, sensitive-data classification, action-policy violations, latency and reviewer time saved. Those scores are deliberately not fabricated in this repository.

## 05 — SHIP
**CI → deployment gate → production**

GitHub Actions runs the control-engine regression suite. The static reviewer experience can be published with GitHub Pages.

A green prototype/CI result is not a production-readiness claim. Real deployment would require Plan-approved infrastructure, identity, access control, retention, privacy/security review and production integrations.

## 06 — WATCH
**Traces → logs → regressions → feedback**

For the portfolio proof, the audit trail and regression suite are the current observable surfaces.

For a production version, monitoring should include:
- tool/action failures,
- policy-block rates,
- retrieval/evidence quality regressions,
- approval-bypass attempts,
- duplicate execution,
- latency and reviewer corrections,
- security/privacy incidents.

Monitoring findings should feed back into the spec, tests and controls rather than becoming chat-only knowledge.

## Build principle

> Agents may propose and implement. Evidence decides whether the result is accepted; humans retain authority over consequential actions.
