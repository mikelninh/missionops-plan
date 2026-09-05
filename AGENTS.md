# AGENTS.md — MissionOps

## Mission
Build an inspectable proof of an AI-assisted NGO operating workflow where evidence, safeguarding, uncertainty and human authority stay visible.

The demonstrated path is:

`project report -> evidence gaps -> safeguarding/privacy gate -> human-approved follow-up -> audit trail`

Do not turn this repository into a generic chatbot or imply Plan International uses this architecture internally.

## Start here
1. Read `README.md`.
2. Read `FREEZE.md` before changing a frozen surface.
3. Read `docs/architecture.md` for trust boundaries.
4. Read `evals/golden-cases.md` for behavioural expectations.
5. Read `tests/test_missionops.py` before modifying the control engine.

## Source-of-truth map
- Product scope and public claims: `README.md`
- Frozen reviewer experience: `FREEZE.md`
- Architecture and trust boundaries: `docs/architecture.md`
- Plan-specific public context: `docs/plan-context.md`
- Synthetic golden case: `data/case.json`, `data/synthetic-midterm-report.md`
- Deterministic controls: `engine/missionops.py`
- Regression truth: `tests/test_missionops.py`
- Evaluation design: `evals/golden-cases.md`
- CI truth: `.github/workflows/ci.yml`

## Build contract before substantial work
Define:
- goal and reviewer/user outcome,
- authoritative sources,
- requirements and non-goals,
- autonomy class,
- acceptance criteria,
- evidence required to call the task done,
- known unknowns and production seams.

Do not replace an unknown with a plausible story.

## Autonomy boundaries
- **A0 Observe** — inspect code, docs, tests and public sources. Automatic.
- **A1 Local reversible** — edit isolated code/docs, generate fixtures, run tests. Automatic.
- **A2 Shared reversible** — branch, pull request, preview deployment. Logged and normally automatic.
- **A3 Consequential** — publish externally, send messages, connect real organisation systems, or change live infrastructure. Human approval required.
- **A4 Sensitive/high-impact** — real beneficiary data, credentials, external side effects, privacy/safeguarding claims, or destructive production actions. Explicit human approval plus independent verification required.

The current public proof is synthetic. It must not silently cross into A4 behaviour.

## Verification
Minimum engineering gate:

```bash
python -m unittest discover -s tests -v
```

Also verify the 90-second golden path manually:
1. supported evidence remains linked,
2. missing/weak evidence remains visible,
3. labelled synthetic identifiers are minimised,
4. an external action cannot execute without approval,
5. approval enables the simulated action exactly once,
6. the audit trail records the decision path.

Never claim a test or deployment passed unless it was actually checked.

## Agent roles
Use roles when decomposition helps:
- **Shaper** — clarifies problem, constraints and reviewer outcome.
- **Builder** — implements the smallest change that satisfies the spec.
- **Verifier** — independently checks tests, claims, edge cases and regressions.
- **Critic** — looks for overclaiming, security gaps, unnecessary complexity and reviewer confusion.

The same agent may perform multiple roles sequentially, but verification should be a distinct pass.

## Hard boundaries
- Synthetic data is never production evidence.
- Missing evidence is a valid result.
- The prototype does not claim a production PII classifier.
- The automated step may prepare an external action but may not inherit authority to execute it.
- No fabricated retrieval, evaluation or production metrics.
- Do not imply this is an approved Plan International system or an existing Plan workflow.
- Prefer the smallest architecture that makes the control or evidence inspectable.

## Definition of done
A change is done only when:
- the stated acceptance criteria are met,
- relevant regression tests pass,
- the golden reviewer path still works,
- claims match observable evidence,
- human/agent authority boundaries remain explicit,
- remaining production gaps are stated rather than hidden.
