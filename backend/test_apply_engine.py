from apply_engine import apply_decisions


def _approve(sid, original, proposed):
    return {"sid": sid, "action": "approve", "original": original, "proposed": proposed}


def _reject(sid, original, proposed):
    return {"sid": sid, "action": "reject", "original": original, "proposed": proposed}


def test_basic_approved_replacement():
    text = "The big dragon flew over the castle."
    decisions = [_approve("s1", "big", "vast")]
    assert apply_decisions(text, decisions) == "The vast dragon flew over the castle."


def test_rejected_decisions_leave_text_unchanged():
    text = "The big dragon flew over the castle."
    decisions = [_reject("s1", "big", "vast")]
    assert apply_decisions(text, decisions) == text


