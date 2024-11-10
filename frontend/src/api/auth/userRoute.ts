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

//
// GETS
// MULTIPLE
// USERS 
//

// fetches all users
export async function fetchUsers(): Promise<user[]> {
    return await fetchUser<user[]>('/');
}

// fetches all users by first name
export async function fetchUsersByFirstName(first_name: string): Promise<user[]> {
    return await fetchUser<user[]>(`/${first_name}`);
}

// fetches all users by last name
export async function fetchUsersByLastName(last_name: string): Promise<user[]> {
    return await fetchUser<user[]>(`/${last_name}`);
}

// fetches all users by email
export async function fetchUsersByEmail(email: string): Promise<user[]> {
    return await fetchUser<user[]>(`/${email}`);
}

// fetches all users by id
export async function fetchUsersById(id: string): Promise<user[]> {
    return await fetchUser<user[]>(`/${id}`);
}

// fetches all users by birthdate
export async function fetchUsersByBirthDate(birthdate: string): Promise<user[]> {
    return await fetchUser<user[]>(`/${birthdate}`);
}

// fetches all users by phone number
export async function fetchUsersByPhoneNumber(phone_number: string): Promise<user[]> {
    return await fetchUser<user[]>(`/${phone_number}`);
}



//
// GETS
// A
// USER (GET)
//

// fetches a user by first name
export async function fetchUserByFirstName(first_name: string): Promise<user> {
    return await fetchUser<user>(`/${first_name}`);
}

// fetches a user by last name
export async function fetchUserByLastName(last_name: string): Promise<user> {
    return await fetchUser<user>(`/${last_name}`);
}

// fetches a user by email
export async function fetchUserByEmail(email: string): Promise<user> {
    return await fetchUser<user>(`/${email}`);
}

// fetches a user by id
export async function fetchUserById(id: string): Promise<user> {
    return await fetchUser<user>(`/${id}`);
}

// fetches a user by birthdate
export async function fetchUserByBirthDate(birthdate: string): Promise<user> {
    return await fetchUser<user>(`/${birthdate}`);
}

// fetches a user by phone number
export async function fetchUserByPhoneNumber(phone_number: string): Promise<user> {
    return await fetchUser<user>(`/${phone_number}`);
}



//
// GETS
// A
// USER (NON-GET)
//


// creates a user
export async function createUser(newUser: Partial<user>): Promise<user> {
    return await fetchUser<user>('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newUser),
    });
}

// updates a user
export async function updateUser(id: String, user: Partial<user>): Promise<user> {
    return await fetchUser<user>(`/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
}

// deletes a user
export async function deleteUser(id: String): Promise<user> {
    return await fetchUser(`/${id}`, {
        method: 'DELETE',
    });
}
