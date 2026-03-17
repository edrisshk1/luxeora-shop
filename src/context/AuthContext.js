import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.warn('Auth error:', error.message);
      setLoading(false);
    }
  }, []);

  const logout = () => {
    try {
      return signOut(auth);
    } catch (error) {
      console.warn('Logout error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
