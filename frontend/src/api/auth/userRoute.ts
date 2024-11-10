export interface user {
    id: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    email: string;
    phone_number: string;
  }
  
  const BASE_URL = 'http://localhost:8080/graphql';
  
  // Generic function to handle all GraphQL queries
  async function fetchUserData<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }
    return await response.json() as T;
  }
  
  //
  // FUNCTIONS THAT RETURN MULTIPLE USERS
  //
  
  // Fetches all users
  export async function fetchUsers(): Promise<user[]> {
    const query = `
      query {
        users {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ users: user[] }>(query).then(response => response.users);
  }
  
  // Fetches users by first name
  export async function fetchUsersByFirstName(first_name: string): Promise<user[]> {
    const query = `
      query GetUsersByFirstName($first_name: String!) {
        users(first_name: $first_name) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ users: user[] }>(query, { first_name }).then(response => response.users);
  }
  
  // Fetches users by last name
  export async function fetchUsersByLastName(last_name: string): Promise<user[]> {
    const query = `
      query GetUsersByLastName($last_name: String!) {
        users(last_name: $last_name) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ users: user[] }>(query, { last_name }).then(response => response.users);
  }
  
  // Fetches users by email
  export async function fetchUsersByEmail(email: string): Promise<user[]> {
    const query = `
      query GetUsersByEmail($email: String!) {
        users(email: $email) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ users: user[] }>(query, { email }).then(response => response.users);
  }
  
  // Fetches users by birthdate
  export async function fetchUsersByBirthDate(birthdate: string): Promise<user[]> {
    const query = `
      query GetUsersByBirthDate($birthdate: String!) {
        users(birthdate: $birthdate) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ users: user[] }>(query, { birthdate }).then(response => response.users);
  }
  
  // Fetches users by phone number
  export async function fetchUsersByPhoneNumber(phone_number: string): Promise<user[]> {
    const query = `
      query GetUsersByPhoneNumber($phone_number: String!) {
        users(phone_number: $phone_number) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ users: user[] }>(query, { phone_number }).then(response => response.users);
  }
  
  //
  // FUNCTIONS THAT RETURN A SINGLE USER
  //
  
  // Fetches a user by ID
  export async function fetchUserById(id: string): Promise<user> {
    const query = `
      query GetUserById($id: String!) {
        user(id: $id) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ user: user }>(query, { id }).then(response => response.user);
  }
  
  // Fetches a user by first name (assuming a unique first name)
  export async function fetchUserByFirstName(first_name: string): Promise<user> {
    const query = `
      query GetUserByFirstName($first_name: String!) {
        user(first_name: $first_name) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ user: user }>(query, { first_name }).then(response => response.user);
  }
  
  // Fetches a user by last name (assuming a unique last name)
  export async function fetchUserByLastName(last_name: string): Promise<user> {
    const query = `
      query GetUserByLastName($last_name: String!) {
        user(last_name: $last_name) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ user: user }>(query, { last_name }).then(response => response.user);
  }
  
  // Fetches a user by email (assuming a unique email)
  export async function fetchUserByEmail(email: string): Promise<user> {
    const query = `
      query GetUserByEmail($email: String!) {
        user(email: $email) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ user: user }>(query, { email }).then(response => response.user);
  }
  
  // Fetches a user by birthdate (assuming a unique birthdate)
  export async function fetchUserByBirthDate(birthdate: string): Promise<user> {
    const query = `
      query GetUserByBirthDate($birthdate: String!) {
        user(birthdate: $birthdate) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ user: user }>(query, { birthdate }).then(response => response.user);
  }
  
  // Fetches a user by phone number (assuming a unique phone number)
  export async function fetchUserByPhoneNumber(phone_number: string): Promise<user> {
    const query = `
      query GetUserByPhoneNumber($phone_number: String!) {
        user(phone_number: $phone_number) {
          id
          first_name
          last_name
          birthdate
          email
          phone_number
        }
      }
    `;
    return await fetchUserData<{ user: user }>(query, { phone_number }).then(response => response.user);
  }
  
