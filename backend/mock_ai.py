from models import Evaluation, Suggestion


def generate_suggestions(text: str) -> tuple[Evaluation, list[Suggestion]]:
    evaluation = Evaluation(
        clarity=0.7,
        tone=0.6,
        originality=0.5,
        comments=[
            "Tighten the opening for clarity.",
            "Consider varying sentence rhythm for a more engaging tone.",
            "Try replacing familiar phrases with fresher imagery.",
        ],
    )

    suggestions = [
        Suggestion(
            sid="s1",
            original="once upon a time",
            proposed="At dusk in a quiet village",
            rationale="Avoid cliché openings — set a specific scene instead.",
        ),
        Suggestion(
            sid="s2",
            original="very good",
            proposed="remarkable",
            rationale="'Very' weakens prose — use a stronger modifier or cut it.",
        ),
        Suggestion(
            sid="s3",
            original="walked slowly",
            proposed="crept",
            rationale="Choose a verb that conveys manner of movement.",
        ),
        Suggestion(
            sid="s4",
            original="was filled with",
            proposed="overflowed with",
            rationale="Consider rewriting in active voice for more energy.",
        ),
        Suggestion(
            sid="s5",
            original="broke the silence",
            proposed="shattered the quiet",
            rationale="Use a stronger verb for more impact.",
        ),
    ]

    return evaluation, suggestions
