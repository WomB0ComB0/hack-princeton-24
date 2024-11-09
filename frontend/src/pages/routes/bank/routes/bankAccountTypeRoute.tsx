interface bankAccountType {
    id: Number,
    name: String,
}


async function fetchBankAccountTypes(): Promise<bankAccountType[]> {

    const response = await fetch('http://localhost:8080/graphql');

    if (!response.ok) {
        throw new Error('Error fetching bank account types');
    }

    const bankAccountType = await response.json() as bankAccountType[];
    return bankAccountType;
}