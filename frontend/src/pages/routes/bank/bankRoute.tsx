interface bank {
    id: Number,
    name: String,
    routing_number: String,
}

async function fetchBanks(): Promise<bank[]> {

    const response = await fetch('http://localhost:8080/graphql');

    if (!response.ok) {
        throw new Error('Error fetching banks');
    }

    const bank = await response.json() as bank[];
    return bank;
}