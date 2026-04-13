# Cori

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs on http://localhost:8000

## Backend Tests

```bash
cd backend
pytest test_apply_engine.py
```
