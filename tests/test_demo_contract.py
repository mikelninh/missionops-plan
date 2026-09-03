import json
import unittest
from pathlib import Path

from engine.missionops import MissionOpsEngine


ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")
APP = (ROOT / "app.js").read_text(encoding="utf-8")
CASE = json.loads((ROOT / "data" / "case.json").read_text(encoding="utf-8"))


class DemoContractTests(unittest.TestCase):
    def test_ui_claim_count_matches_executable_engine(self):
        engine = MissionOpsEngine(CASE)
        engine.validate_case()
        results = engine.review_claims()
        gaps = sum(1 for result in results if result["status"] != "supported")
        total = len(results)

        self.assertIn(f"{gaps} claims need attention", INDEX)
        self.assertIn(f'<strong id="score-number">{gaps}</strong><small>/{total}</small>', INDEX)

    def test_ui_does_not_claim_removed_fake_metrics_or_integrations(self):
        forbidden = [
            "hybrid + rerank",
            "Confidence: <b>0.94</b>",
            "Approved model route selected",
            "evidence-review@1.2.0",
            "12</strong><span>evidence passages retrieved",
        ]
        for phrase in forbidden:
            self.assertNotIn(phrase, INDEX)

        self.assertIn("not integrated in prototype", INDEX)
        self.assertIn("not called in prototype", INDEX)

    def test_browser_demo_locks_unreached_steps(self):
        self.assertIn("if (current > maxStep) return;", APP)
        self.assertIn("step.disabled = locked;", APP)
        self.assertIn("setStep(5, true);", APP)


if __name__ == "__main__":
    unittest.main()
