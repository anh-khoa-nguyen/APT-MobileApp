import { useState } from 'react';

const useAuthStore = () => {
  const [user, setUser] = useState({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    role: 'resident', // Hoặc 'admin'
  });

  return { user, setUser };
};

export { useAuthStore };