interface user {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  email: string;
  phone_number: string;
}

async function fetchUsers(): Promise<user[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  const user = (await response.json()) as user[];
  return user;
}
