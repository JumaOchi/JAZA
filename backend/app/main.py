# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  #  Load environment variables

load_dotenv()  # This line makes .env variables like SUPABASE_JWT_SECRET work

from app.api.routes import profile  # importing after .env is loaded

app = FastAPI(title="Jaza Finance Backend")

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

# Including API routers
app.include_router(profile.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Jaza API"}
