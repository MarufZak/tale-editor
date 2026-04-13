from pydantic import BaseModel


class SuggestRequest(BaseModel):
    text: str


class Suggestion(BaseModel):
    sid: str
    original: str
    proposed: str
    rationale: str


class Evaluation(BaseModel):
    clarity: float
    tone: float
    originality: float
    comments: list[str]


class SuggestResponse(BaseModel):
    evaluation: Evaluation
    suggestions: list[Suggestion]


class ApplyDecision(BaseModel):
    sid: str
    action: str
    original: str
    proposed: str


class ApplyRequest(BaseModel):
    text: str
    decisions: list[ApplyDecision]


class ApplyResponse(BaseModel):
    text: str


class SubmitRequest(BaseModel):
    text: str


class SubmitResponse(BaseModel):
    status: str
