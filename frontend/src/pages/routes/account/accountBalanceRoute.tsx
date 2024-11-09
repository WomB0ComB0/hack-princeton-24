interface accountBalance {
    id: Number,
    bank_account_id: Number,
    currency_id: Number,
    amount: Number,
    date_time: String,
}


async function fetchAccountBalance(): Promise<accountBalance[]> {

    const response = await fetch('http://localhost:8080/graphql');

    if (!response.ok) {
        throw new Error('Error fetching account balances');
    }

    const accountBalance = await response.json() as accountBalance[];
    return accountBalance;
}