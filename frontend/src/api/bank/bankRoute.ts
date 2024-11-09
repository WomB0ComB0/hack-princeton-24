interface bank {
  id: number;
  name: string;
  routing_number: string;
}

async function fetchBanks(): Promise<bank[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching banks');
  }

  const bank = (await response.json()) as bank[];
  return bank;
}
