import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
  const { user, setUser, logIn, logOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make a request to the backend to get the authenticated user's data
        const res = await fetch('/api/auth/user');
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return { user, logIn, logOut };
};

export default useAuth;
