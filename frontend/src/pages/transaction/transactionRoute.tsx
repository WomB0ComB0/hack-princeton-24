interface transaction {
    id: Number,
    user_id: String,
    transaction_type_id: Number,
    currency_id: Number,
    amount: Number,
    date_time: String,
}


async function fetchTransactions(): Promise<transaction[]> {

    const response = await fetch('http://localhost:8080/graphql');

    if (!response.ok) {
        throw new Error('Error fetching transactions');
    }

    const transaction = await response.json() as transaction[];
    return transaction;
}