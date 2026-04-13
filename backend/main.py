from apply_engine import apply_decisions
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mock_ai import generate_suggestions
from models import (
    ApplyRequest,
    ApplyResponse,
    SubmitRequest,
    SubmitResponse,
    SuggestRequest,
    SuggestResponse,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/suggest", response_model=SuggestResponse)
def suggest(req: SuggestRequest):
    evaluation, suggestions = generate_suggestions(req.text)
    return SuggestResponse(evaluation=evaluation, suggestions=suggestions)


@app.post("/api/apply", response_model=ApplyResponse)
def apply(req: ApplyRequest):
    decisions_dicts = []
    for d in req.decisions:
        decisions_dicts.append(d.model_dump())
    result = apply_decisions(req.text, decisions_dicts)
    return ApplyResponse(text=result)


@app.post("/api/submit", response_model=SubmitResponse)
def submit(req: SubmitRequest):
    return SubmitResponse(status="submitted")
