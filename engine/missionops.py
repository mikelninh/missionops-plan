from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any


@dataclass
class AuditEvent:
    event: str
    detail: str
    status: str = "ok"


class MissionOpsEngine:
    """Small deterministic engine for the synthetic MissionOps golden case.

    This is intentionally not an LLM implementation. It demonstrates the control
    logic around an AI-assisted workflow: evidence checks, context minimisation,
    action-bound approvals, idempotent execution and auditability. Model and
    retrieval components can sit behind these same boundaries in production.
    """

    def __init__(self, case: dict[str, Any]):
        self.case = case
        self.audit: list[AuditEvent] = []
        self.approved_action_key: str | None = None
        self.executed_action_keys: set[str] = set()

    def _log(self, event: str, detail: str, status: str = "ok") -> None:
        self.audit.append(AuditEvent(event=event, detail=detail, status=status))

    @staticmethod
    def _action_key(action: dict[str, Any]) -> str:
        canonical = json.dumps(action, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
        return hashlib.sha256(canonical.encode("utf-8")).hexdigest()

    def validate_case(self) -> None:
        if not self.case.get("synthetic"):
            raise ValueError("Demo engine only accepts explicitly synthetic data")
        self._log("case_validated", "Synthetic-data assertion verified")

    def minimise_sensitive_context(self) -> str:
        text = self.case.get("sensitive_text", "")
        identifiers = self.case.get("synthetic_identifiers", [])

        for item in identifiers:
            value = item["value"]
            token = f"[{item['type']}_REDACTED]"
            text = text.replace(value, token)

        self._log(
            "context_minimised",
            f"{len(identifiers)} pre-labelled synthetic identifiers removed from downstream context",
        )
        return text

    def review_claims(self) -> list[dict[str, Any]]:
        results: list[dict[str, Any]] = []

        for claim in self.case.get("claims", []):
            status = "supported"
            reason = "Evidence is present for the stated claim."

            if claim.get("comparative"):
                missing_comparison = (
                    claim.get("baseline") is None
                    or claim.get("current") is None
                    or not claim.get("denominator_defined", False)
                )
                if missing_comparison:
                    status = "missing_evidence"
                    reason = (
                        "Comparative language requires baseline, current value and "
                        "a defined denominator; at least one is missing."
                    )

            if claim.get("qualitative") and claim.get("interview_count", 0) < 5:
                status = "weak_evidence"
                reason = (
                    "A broad qualitative generalisation is supported by too few "
                    "interviews to treat it as strong evidence."
                )

            results.append(
                {
                    "claim_id": claim["id"],
                    "claim": claim["text"],
                    "status": status,
                    "reason": reason,
                    "evidence": claim.get("evidence", []),
                }
            )

        gaps = sum(1 for result in results if result["status"] != "supported")
        self._log("claims_reviewed", f"{len(results)} claims reviewed; {gaps} need attention")
        return results

    def propose_action(self, claim_results: list[dict[str, Any]]) -> dict[str, Any]:
        dropout = next((result for result in claim_results if result["claim_id"] == "dropout"), None)
        if not dropout or dropout["status"] != "missing_evidence":
            action = {
                "type": "none",
                "reason": "No high-priority clarification required",
                "requires_human_approval": False,
            }
        else:
            action = {
                "type": "prepare_clarification_request",
                "target": "programme_team",
                "reason": "Dropout claim lacks comparable baseline evidence",
                "requires_human_approval": True,
                "requested_fields": [
                    "baseline_dropout_value",
                    "current_dropout_value",
                    "denominator",
                    "population_comparability",
                ],
            }

        self._log("action_proposed", action["type"])
        return action

    def approve(self, action: dict[str, Any], approver: str) -> str:
        if not approver.strip():
            raise ValueError("Approver identity is required")

        action_key = self._action_key(action)
        self.approved_action_key = action_key
        self._log("human_approval", f"Approved by {approver}; action={action_key[:12]}")
        return action_key

    def execute(self, action: dict[str, Any]) -> dict[str, Any]:
        action_key = self._action_key(action)

        if action_key in self.executed_action_keys:
            self._log(
                "duplicate_execution_blocked",
                f"Action already executed; action={action_key[:12]}",
                status="blocked",
            )
            raise RuntimeError("Duplicate execution blocked")

        if action.get("requires_human_approval") and self.approved_action_key != action_key:
            self._log(
                "execution_blocked",
                f"No approval bound to requested action; action={action_key[:12]}",
                status="blocked",
            )
            raise PermissionError("Human approval for this exact action is required before execution")

        result = {
            "status": "simulated_success",
            "adapter": "n8n_or_power_automate_pattern",
            "action": action.get("type"),
            "action_key": action_key,
        }
        self.executed_action_keys.add(action_key)
        self._log("workflow_executed", f"{result['action']}; action={action_key[:12]}")
        return result

    def audit_dicts(self) -> list[dict[str, str]]:
        return [asdict(event) for event in self.audit]


def run_case(case_path: Path, approve: bool = True) -> dict[str, Any]:
    case = json.loads(case_path.read_text(encoding="utf-8"))
    engine = MissionOpsEngine(case)

    engine.validate_case()
    sanitised_context = engine.minimise_sensitive_context()
    claim_results = engine.review_claims()
    action = engine.propose_action(claim_results)

    execution: dict[str, Any] | None = None
    if approve and action.get("requires_human_approval"):
        engine.approve(action, "Demo User")
        execution = engine.execute(action)

    return {
        "case_id": case["case_id"],
        "sanitised_context": sanitised_context,
        "claims": claim_results,
        "action": action,
        "execution": execution,
        "audit": engine.audit_dicts(),
    }


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    result = run_case(root / "data" / "case.json", approve=True)
    print(json.dumps(result, indent=2, ensure_ascii=False))
