from jose import jwt
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer
import os

# Supabase project config
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")  # in .env
ALGORITHM = "HS256"

security = HTTPBearer()

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=[ALGORITHM])
        return payload  # includes `sub`, `email`, `role`, etc.
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired.")
    except jwt.JWTError:
        raise HTTPException(status_code=403, detail="Invalid token.")

# Dependency for FastAPI routes
async def get_current_user(request: Request, credentials=Depends(security)):
    token = credentials.credentials
    user_payload = verify_token(token)
    return user_payload
