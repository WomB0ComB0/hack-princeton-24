import React, { createContext, useContext, useState } from 'react';

// Define user context type
interface UserContextType {
  userId: number | null;
  user: any; // Define this based on your `user` structure
  setUser: (user: any) => void;
}

// Create UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ userId, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
