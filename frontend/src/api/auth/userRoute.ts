interface user {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  email: string;
  phone_number: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchUser<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as T;
}

// fetches all users
async function fetchUsers(): Promise<user[]> {
  return await fetchUser<user[]>('/users');
}

// gets a user
async function fetchUserById(userId: string): Promise<user> {
  return await fetchUser<user>(`/users/${userId}`);
}

// creates a user
async function createUser(newUser: Partial<user>): Promise<user> {
  return await fetchUser<user>('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
}

// updates a user
async function updateUser(userId: string, user: Partial<user>): Promise<user> {
  return await fetchUser<user>(`/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
}

// deletes a user
async function deleteUser(userId: string): Promise<user> {
  return await fetchUser(`/users/${userId}`, {
    method: 'DELETE',
  });
}
