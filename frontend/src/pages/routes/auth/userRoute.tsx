interface user {
    id: String;
    first_name: String,
    last_name: String,
    birthdate: String,
    email: String,
    phone_number: String,
}

async function fetchUsers(): Promise<user[]> {

    const response = await fetch('http://localhost:8080/graphql');

    if (!response.ok) {
        throw new Error('Error fetching users');
    }

    const user = await response.json() as user[];
    return user;
}