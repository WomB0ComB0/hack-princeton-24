from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from databricks import sql

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Set up OpenAI API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Set up Databricks connection
connection = sql.connect(
    server_hostname=os.getenv("DATABRICKS_HOST"),
    http_path=os.getenv("DATABRICKS_HTTP_PATH"),
    access_token=os.getenv("DATABRICKS_TOKEN"),
    read_only=True
)

def generate_sql_query(user_question):
    system_prompt = """
    You are a SQL query generator for a financial database. The database name is 'hack_princeton_f24.financialplannerdb' and it contains the following tables:

    1. accountbalances (ID, BankAccountID, CurrencyID, Amount, DateTime)
    2. bankaccounts (ID, BankID, UserID, BankAccountTypeID, StatusID)
    3. bankaccountstatuses (ID, Name)
    4. bankaccounttypes (ID, Name)
    5. banks (ID, Name)
    6. currencies (ID, Symbol, Description)
    7. messages (ID, UserID, Content)
    8. securityassets (ID, Name)
    9. securitytypes (ID, Name)
    10. transactioncategories (ID, Name)
    11. transactions (ID, UserID, TransactionTypeID, CurrencyID, TransactionStatusID, TransactionCategoryID, Amount, DateTime)
    12. transactionstatuses (ID, Name)
    13. transactiontypes (ID, Name)
    14. users (ID, FirstName, LastName, Birthdate, Email, PhoneNumber)

    Important rules:
    1. Always fully qualify table names with 'hack_princeton_f24.financialplannerdb.' prefix
    2. Use appropriate table aliases (e.g., 'ab' for accountbalances, 'ba' for bankaccounts)
    3. Always reference columns with their table alias
    4. Include only the columns explicitly mentioned in the table descriptions above
    5. Format dates appropriately
    6. Assume UserID = 'U001' for all queries
    7. Always include a WHERE clause to filter by UserID when applicable
    8. To get account names, join the bankaccounts table with the banks table

    Return ONLY the SQL query, nothing else.
    """
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_question}
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )

    return response.choices[0].message.content.strip()

def execute_query(query):
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in result]
    except Exception as e:
        return None

def format_results(results):
    if not results:
        return ("I'm sorry, I couldn't retrieve that information as it may not be available. "
            "However, I can retrieve data related to account balances, "
            "bank accounts, banks, currencies, messages, security assets, security types, "
            "transaction categories, transactions, transaction statuses, transaction types, "
            "and users. Let me know if you would like to see a specific type of data.")

    results_str = json.dumps(results, default=str)
    
    system_prompt = """
    You are a helpful financial assistant. Your task is to interpret the given JSON data 
    and provide a clear, concise summary in natural language. Focus on the key information 
    and present it in a way that's easy for a user to understand. If the data is about 
    transactions or account balances, mention the amount, date, and status. Omit currency IDs 
    and transaction IDs unless specifically asked. Always round monetary values to two decimal places.
    Keep the response brief and to the point.
    """

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Please summarize this financial data: {results_str}"}
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.7,
    )

    return response.choices[0].message.content.strip()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')
    
    sql_query = generate_sql_query(user_input)
    results = execute_query(sql_query)
    response = format_results(results)
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)