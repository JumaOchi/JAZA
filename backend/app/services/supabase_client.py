# backend/app/services/supabase_client.py

import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE = os.getenv("SUPABASE_SERVICE_ROLE")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE)
if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE:
    raise RuntimeError("Supabase URL or Service Role is not set in the environment")
