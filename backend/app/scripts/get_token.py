import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.mpesa import get_safaricom_token

if __name__ == "__main__":
    token = get_safaricom_token()
    print("Access Token:", token)
