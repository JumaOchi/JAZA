from fastapi import APIRouter, Depends
from app.core.auth import get_current_user

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/")
def get_my_profile(user=Depends(get_current_user)):
    #print("Decoded JWT user payload:", user)
    return {
        "id": user["sub"],
        "email": user["email"],
        "role": user.get("role"),
    }
