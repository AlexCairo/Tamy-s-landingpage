import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = React.createContext();
const { Provider } = UserContext;

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  function login(data) {
    const token = data.token;
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.user);
    setToken(token);
    localStorage.token = token;

    const tokenExpirationTime = new Date(decodedToken.exp * 1000).getTime();
    localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem('tokenExpirationTime');
    window.location.href = '/'
  }

  function isTokenExpired() {
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    if (tokenExpirationTime) {
      return new Date().getTime() >= tokenExpirationTime;
    }
    return true;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUser(decodedToken.user);
        setToken(storedToken);
        if (isTokenExpired()) {
          logout();
          window.location.href = '/login'
        }
      } catch (error) {
        console.log("Token inválido");
      }
    }
  }, []);

  useEffect(() => {
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    if (tokenExpirationTime) {
      const fiveMinutesBeforeExpiration = tokenExpirationTime - 5 * 60 * 1000;
      const currentTime = new Date().getTime();

      if (currentTime > fiveMinutesBeforeExpiration) {
        logout();
        window.location.href = '/login'
      } else {
        const timeoutId = setTimeout(() => {
          logout();
          window.location.href = '/login'
        }, fiveMinutesBeforeExpiration - currentTime);

        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  return (
    <Provider value={{ user, login, logout }}>
      {children}
    </Provider>
  )
}

export { UserProvider, UserContext };