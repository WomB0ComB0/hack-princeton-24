interface message {
  id: number;
  user_id: string;
  content: string;
}

async function fetchMessages(): Promise<message[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching messages');
  }

  const message = (await response.json()) as message[];
  return message;
}
