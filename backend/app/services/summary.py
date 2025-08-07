from datetime import datetime, timezone
from app.services.supabase_client import supabase


def parse_float(amount):
    try:
        return float(amount)
    except (TypeError, ValueError):
        return 0.0

async def get_dashboard_summary(user_id: str):
    # Fetch all income entries for the user
    response = supabase.table("income").select("*").eq("user_id", user_id).execute()
    records = response.data or []

    now = datetime.now(timezone.utc)
    today_str = now.strftime("%Y%m%d")

    total_income = 0.0
    manual_income = 0.0
    mpesa_income = 0.0
    today_income = 0.0

    for entry in records:
        amount = parse_float(entry.get("amount", 0))
        source = entry.get("source", "manual")
        timestamp = entry.get("timestamp")

        # Aggregate total
        total_income += amount

        # Source-specific totals
        if source == "mpesa":
            mpesa_income += amount
        else:
            manual_income += amount

        # Check if entry is from today
        if timestamp:
            entry_date = datetime.fromisoformat(timestamp).strftime("%Y%m%d")
            if entry_date == today_str:
                today_income += amount

    return {
        "summary": {
            "total_income": total_income,
            "today_income": today_income,
            "source_breakdown": {
                "mpesa": mpesa_income,
                "manual": manual_income
            },
            "entries_count": len(records)
        }
    }
