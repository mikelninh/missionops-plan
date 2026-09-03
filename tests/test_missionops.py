import json
import unittest
from pathlib import Path

from engine.missionops import MissionOpsEngine


ROOT = Path(__file__).resolve().parents[1]
CASE = json.loads((ROOT / "data" / "case.json").read_text(encoding="utf-8"))


class MissionOpsTests(unittest.TestCase):
    def setUp(self):
        self.engine = MissionOpsEngine(CASE)
        self.engine.validate_case()

    def test_sensitive_context_is_minimised(self):
        sanitised = self.engine.minimise_sensitive_context()
        for item in CASE["synthetic_identifiers"]:
            self.assertNotIn(item["value"], sanitised)
        self.assertIn("[CHILD_NAME_REDACTED]", sanitised)
        self.assertIn("[PHONE_REDACTED]", sanitised)

    def test_missing_comparative_evidence_is_flagged(self):
        claims = self.engine.review_claims()
        dropout = next(c for c in claims if c["claim_id"] == "dropout")
        self.assertEqual(dropout["status"], "missing_evidence")
        self.assertIn("baseline", dropout["reason"].lower())

    def test_weak_qualitative_evidence_is_preserved_as_uncertain(self):
        claims = self.engine.review_claims()
        acceptance = next(c for c in claims if c["claim_id"] == "acceptance")
        self.assertEqual(acceptance["status"], "weak_evidence")

    def test_external_execution_is_blocked_without_approval(self):
        claims = self.engine.review_claims()
        action = self.engine.propose_action(claims)
        with self.assertRaises(PermissionError):
            self.engine.execute(action)
        self.assertEqual(self.engine.audit[-1].status, "blocked")

    def test_approval_is_bound_to_exact_action(self):
        claims = self.engine.review_claims()
        action = self.engine.propose_action(claims)
        self.engine.approve(action, "Test Approver")

        changed_action = dict(action)
        changed_action["target"] = "different_team"

        with self.assertRaises(PermissionError):
            self.engine.execute(changed_action)
        self.assertEqual(self.engine.audit[-1].event, "execution_blocked")

    def test_approved_action_executes_and_is_audited(self):
        claims = self.engine.review_claims()
        action = self.engine.propose_action(claims)
        action_key = self.engine.approve(action, "Test Approver")
        result = self.engine.execute(action)
        self.assertEqual(result["status"], "simulated_success")
        self.assertEqual(result["action_key"], action_key)
        events = [event.event for event in self.engine.audit]
        self.assertIn("human_approval", events)
        self.assertIn("workflow_executed", events)

    def test_duplicate_execution_is_blocked(self):
        claims = self.engine.review_claims()
        action = self.engine.propose_action(claims)
        self.engine.approve(action, "Test Approver")
        self.engine.execute(action)

        with self.assertRaises(RuntimeError):
            self.engine.execute(action)
        self.assertEqual(self.engine.audit[-1].event, "duplicate_execution_blocked")
        self.assertEqual(self.engine.audit[-1].status, "blocked")


if __name__ == "__main__":
    unittest.main()
