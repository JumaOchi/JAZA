# backend/app/api/routes/income.py

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from pydantic import BaseModel
from app.core.auth import get_current_user  # Handles JWT verification
from app.services.supabase_client import supabase  # Supabase service role client
from datetime import datetime , timedelta
from collections import defaultdict


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
    result = supabase.from_("income").insert({
        "user_id": user["sub"],
        "amount": income.amount,
        "source": income.source,
    }).execute()

    if result.data is None:
        raise HTTPException(status_code=500, detail="Failed to insert income. Supabase did not return data.")

    return {
        "message": "Income added successfully",
        "data": result.data
    }


@router.get("/")
async def list_user_income(
    user=Depends(get_current_user),
    start_date: str = Query(None),
    end_date: str = Query(None),
):
    query = supabase.from_("income").select("*").eq("user_id", user["sub"])

    # Filter by date range if provided
    if start_date:
        query = query.gte("created_at", start_date)
    if end_date:
        query = query.lte("created_at", end_date)

    query = query.order("created_at", desc=True)
    result = query.execute()

    if result.data is None:
        raise HTTPException(status_code=500, detail="Failed to fetch income.")

    return {
        "income": result.data
    }



@router.get("/summary/daily")
async def get_daily_income_summary(user=Depends(get_current_user)):
    # Calculate start date for last 5 days
    today = datetime.now()
    start_date = (today - timedelta(days=4)).date().isoformat()

    # Pull all income records from last 5 days
    result = supabase \
        .from_("income") \
        .select("amount, created_at") \
        .eq("user_id", user["sub"]) \
        .gte("created_at", start_date) \
        .execute()

    if result.data is None:
        raise HTTPException(status_code=500, detail="Failed to fetch income summary")

    # Group totals by date
    daily_totals = defaultdict(float)
    for row in result.data:
        date_str = row["created_at"][:10]  # e.g. "2025-07-15"
        daily_totals[date_str] += float(row["amount"])

    # Ensure all 5 days are present even if 0 income
    summary = []
    for i in range(5):
        date_obj = today - timedelta(days=4 - i)
        date_str = date_obj.date().isoformat()
        summary.append({
            "date": date_str,
            "total": round(daily_totals[date_str], 2)
        })

    return summary


from dateutil import parser

@router.get("/summary/monthly")
async def get_monthly_income_summary(user=Depends(get_current_user)):
    result = supabase \
        .from_("income") \
        .select("amount, created_at") \
        .eq("user_id", user["sub"]) \
        .execute()

    if result.data is None:
        raise HTTPException(status_code=500, detail="Failed to fetch monthly summary")

    monthly_totals = defaultdict(float)

    for row in result.data:
        dt = parser.isoparse(row["created_at"])
        key = dt.strftime("%Y-%m")  # e.g., "2025-07"
        monthly_totals[key] += float(row["amount"])

    summary = [{"month": k, "total": round(v, 2)} for k, v in sorted(monthly_totals.items())]
    return summary
 
@router.get("/summary/quarterly")
async def get_quarterly_income_summary(user=Depends(get_current_user)):
    result = supabase \
        .from_("income") \
        .select("amount, created_at") \
        .eq("user_id", user["sub"]) \
        .execute()

    if result.data is None:
        raise HTTPException(status_code=500, detail="Failed to fetch quarterly summary")

    quarterly_totals = defaultdict(float)

    for row in result.data:
        dt = parser.isoparse(row["created_at"])
        quarter = (dt.month - 1) // 3 + 1
        key = f"Q{quarter}-{dt.year}"  # e.g., "Q3-2025"
        quarterly_totals[key] += float(row["amount"])

    summary = [{"quarter": k, "total": round(v, 2)} for k, v in sorted(quarterly_totals.items())]
    return summary



@router.post("/payments/confirmation")
async def mpesa_confirmation(request: Request):
    try:
        # Parse JSON body
        try:
            body = await request.json()
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid JSON body")

        msisdn = body.get("MSISDN")
        trans_id = body.get("TransID")
        timestamp = body.get("TransTime")
        amount_raw = body.get("TransAmount", 0)
        
        print("Incoming M-Pesa payload:", body)

        # Validate essential fields
        if not msisdn or not trans_id or not timestamp:
            raise HTTPException(status_code=400, detail="Missing required M-Pesa fields")

        try:
            amount = float(amount_raw)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid amount format")

        # Normalize phone numbers (07... and 2547...)
        normalized_msisdn = msisdn.strip()
        local_format = "0" + normalized_msisdn[-9:]

        # Try to match user by phone number
        user_resp = supabase \
            .table("profiles") \
            .select("id") \
            .in_("phone_number", [normalized_msisdn, local_format]) \
            .execute()

        if not user_resp.data:
            raise HTTPException(status_code=404, detail="User not found")

        user_id = user_resp.data[0]["id"]

        # Check for duplicate transaction
        existing_txn = supabase \
            .table("income") \
            .select("id") \
            .eq("transaction_id", trans_id) \
            .execute()

        if existing_txn.data:
            return {"message": "Duplicate transaction received. Ignored."}

        # Insert the income record
        income_resp = supabase \
            .table("income") \
            .insert({
                "user_id": user_id,
                "amount": amount,
                "source": "mpesa",
                "transaction_id": trans_id,
                "created_at": timestamp,
            }) \
            .execute()

        if income_resp.status_code != 201:
            raise HTTPException(status_code=500, detail="Failed to save income record")

        return {"message": "Callback received successfully"}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


@router.post("/payments/validate")
async def mpesa_validation():
    return {"ResultCode": 0, "ResultDesc": "Accepted"}

