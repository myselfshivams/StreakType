import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';


interface AuthContextType {
  token: string | null;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
 
    const cookies = parseCookies();
    const storedToken = cookies.token || null;
    setToken(storedToken);

  
    if (storedToken) {
   
    }
  }, []);

  const login = (token: string) => {
    setToken(token);
   
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

  };

  const logout = () => {
    setToken(null);
    setUser(null);

    destroyCookie(null, 'token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
