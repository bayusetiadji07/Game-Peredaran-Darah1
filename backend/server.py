"""Minimal FastAPI backend. Game uses localStorage only; backend exists to satisfy platform requirements."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Detektif Peredaran Darah API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/")
async def root():
    return {"message": "Detektif Peredaran Darah backend online"}


@app.get("/api/health")
async def health():
    return {"status": "ok"}
