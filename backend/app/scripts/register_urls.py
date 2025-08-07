# app/scripts/register_urls.py
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.mpesa import register_c2b_urls

if __name__ == "__main__":
    try:
        result = register_c2b_urls()
        print(" URLs registered successfully:", result)
    except Exception as e:
        print(" Failed to register URLs:", str(e))

