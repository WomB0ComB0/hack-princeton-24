interface bankAccountStatus {
    id: Number,
    name: String,
}

async function fetchBankAccountStatus(): Promise<bankAccountStatus[]> {

    const response = await fetch('http://localhost:8080/graphql');


    if (!response.ok) {
        throw new Error('Error fetching bank account statuses');
    }

    const bankAccountStatus = await response.json() as bankAccountStatus[];
    return bankAccountStatus;
}