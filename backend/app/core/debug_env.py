from dotenv import load_dotenv
import os

load_dotenv()
print("JWT from .env:", os.getenv("SUPABASE_JWT_SECRET"))
