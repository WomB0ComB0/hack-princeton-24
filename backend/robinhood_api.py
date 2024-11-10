import robin_stocks.robinhood as r
import os
import sys
import pyotp
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve Robinhood credentials from environment variables
username = os.getenv('ROBINHOOD_USERNAME')
password = os.getenv('ROBINHOOD_PASSWORD')
totp_secret = os.getenv('ROBINHOOD_TOTP_SECRET')

# Ensure credentials are set
if not username or not password or not totp_secret:
    print("Error: Username, password, or TOTP secret not set in .env file.")
    sys.exit(1)

# Generate TOTP code
totp = pyotp.TOTP(totp_secret).now()
print("Generated TOTP code:", totp)  # For debugging, can remove this line later

# Log in to your account with TOTP
try:
    login = r.login(username, password, mfa_code=totp)
    print("Login response:", login)  # Print the login response for debugging
    if not login:
        print("Login failed.")
        sys.exit(1)
    print("Login successful!")
except Exception as e:
    print(f"Login error: {e}")
    sys.exit(1)

# Retrieve and display basic account profile details to confirm connection
try:
    account_data = r.profiles.load_account_profile()
    print("Account profile data:", account_data)
except Exception as e:
    print(f"Error retrieving account profile: {e}")

# Retrieve and display current positions
try:
    # Attempt to fetch account holdings
    positions_data = r.account.build_holdings()
    print("Checking account holdings...")

    if positions_data:
        print("Positions found using build_holdings():")
        for symbol, details in positions_data.items():
            print(f"Stock: {symbol}, Quantity: {details['quantity']}")
    else:
        print("No holdings data found using build_holdings(). Trying alternative method...")

        # Alternative method to fetch positions if build_holdings is empty
        positions_data_alt = r.account.get_open_stock_positions()
        print("Raw positions data from get_open_stock_positions():", positions_data_alt)  # Debug raw data

        if positions_data_alt:
            print("Alternative position data found:")
            for position in positions_data_alt:
                # Extract symbol and quantity information
                instrument_url = position.get('instrument', '')
                quantity = position.get('quantity', '0')

                # Fetch the stock symbol from the instrument link
                if instrument_url:
                    instrument_data = r.stocks.get_instrument_by_id(instrument_url.split('/')[-2])
                    symbol = instrument_data.get('symbol', 'N/A')
                    print(f"Stock: {symbol}, Quantity: {quantity}")
                else:
                    print("No instrument URL found for a position.")
        else:
            print("No holdings found with alternative method either.")
except Exception as e:
    print(f"Error retrieving holdings: {e}")

# Log out when done
finally:
    r.logout()
    print("Logged out.")
