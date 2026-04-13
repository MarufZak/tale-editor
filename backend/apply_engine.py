def apply_decisions(text: str, decisions: list[dict]) -> str:
    for d in decisions:
        if d["action"] != "approve":
            continue

        original = d["original"]
        proposed = d["proposed"]
        idx = text.find(original)

        if idx == -1:
            continue

        text = text[:idx] + proposed + text[idx + len(original) :]

    return text
