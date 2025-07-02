# Step 1: backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Jaza Finance Backend")

# Allow frontend access (Vercel or localhost)
origins = [
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app"  # update this once deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Jaza API "}
