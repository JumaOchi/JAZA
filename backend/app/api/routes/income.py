# backend/app/api/routes/income.py

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.auth import get_current_user  # Handles JWT verification
from app.services.supabase_client import supabase  # Supabase service role client

router = APIRouter(
    prefix="/income",
    tags=["Income"]
)

# Request body model
class IncomeCreate(BaseModel):
    amount: float
    source: str  # Should be either 'manual' or 'mpesa'

@router.post("/")
async def add_income(income: IncomeCreate, user=Depends(get_current_user)):
    """
    Adds a new income entry to Supabase for the authenticated user.
    """
    # Insert income row into the 'income' table
    result = supabase.from_("income").insert({
        "user_id": user["sub"],
        "amount": income.amount,
        "source": income.source,
    }).execute()

    # Handle any Supabase error
    if result.get("error"):
        raise HTTPException(status_code=500, detail=result["error"]["message"])

    return {
        "message": "Income recorded successfully",
        "data": result["data"]
    }

@router.get("/")
async def list_user_income(user=Depends(get_current_user)):
    """
    Returns all income records for the logged-in user.
    """
    result = supabase.from_("income").select("*").eq("user_id", user["sub"]).order("created_at", desc=True).execute()

    if result.get("error"):
        raise HTTPException(status_code=500, detail=result["error"]["message"])

    return {
        "income": result["data"]
    }
