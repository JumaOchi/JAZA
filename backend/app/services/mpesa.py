import os
import requests
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv

load_dotenv()

MPESA_BASE_URL = "https://sandbox.safaricom.co.ke"

def get_safaricom_token():
    consumer_key = os.getenv("MPESA_CONSUMER_KEY")
    consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
    token_url = f"{MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"

    response = requests.get(token_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))

    if response.status_code != 200:
        raise Exception(f"Failed to get access token: {response.text}")

    return response.json()["access_token"]

def register_c2b_urls():
    token = get_safaricom_token()  # corrected function call
    SHORTCODE = os.getenv("MPESA_SHORTCODE")
    callback_base = os.getenv("MPESA_CALLBACK_BASE_URL")

    url = f"{MPESA_BASE_URL}/mpesa/c2b/v1/registerurl"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        }

    payload = {
        "ShortCode": SHORTCODE,
        "ResponseType": "Completed",
        "ConfirmationURL": f"{callback_base}/payments/confirmation",
        "ValidationURL": f"{callback_base}/payments/validate",
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Failed to register C2B URLs: {response.text}")

    return response.json()
