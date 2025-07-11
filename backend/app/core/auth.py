from jose import jwt
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get Supabase JWT secret from environment
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
if not SUPABASE_JWT_SECRET:
    raise RuntimeError("SUPABASE_JWT_SECRET is not set in the environment")

ALGORITHM = "HS256"
security = HTTPBearer()

def verify_token(token: str):
    # Basic sanity check logs (optional)
    print("Incoming JWT token (truncated):", token[:40], "...")
    
    try:
        # Decode token while skipping audience verification (Supabase tokens use "authenticated" as aud)
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=[ALGORITHM],
            options={"verify_aud": False}
        )
        #print("Decoded JWT payload:", payload)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired.")
    except jwt.JWTError as e:
        print("JWT decoding error:", str(e))
        raise HTTPException(status_code=403, detail="Invalid token.")

# Dependency for protecting routes with Supabase JWT
async def get_current_user(request: Request, credentials=Depends(security)):
    token = credentials.credentials
    return verify_token(token)
