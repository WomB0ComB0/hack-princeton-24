interface currency {
  id: number;
  name: string;
}

async function fetchCurrencies(): Promise<currency[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching messages');
  }

  const currency = (await response.json()) as currency[];
  return currency;
}
