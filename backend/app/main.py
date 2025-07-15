# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load .env variables (important before anything else)
load_dotenv()

# Import routers AFTER .env
from app.api.routes import profile, income

app = FastAPI(title="Jaza Finance Backend")

# CORS setup so frontend can talk to backend locally and on Vercel
origins = [
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(profile.router)
app.include_router(income.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Jaza API"}
