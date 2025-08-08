# app/api/routes/dashboard.py
from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.services import summary

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
async def get_dashboard_summary(user=Depends(get_current_user)):
    user_id = user['sub']
    return await summary.get_dashboard_summary(user_id)

