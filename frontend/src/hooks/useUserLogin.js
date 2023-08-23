import { useState } from "react";
import { useUserAuthContext } from "./useUserAuthContext";

export const useUserLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('https://fitness-app-gjaf.onrender.com/server/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })  
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      //save the user to local storage for when they sign back on
      localStorage.setItem('user', JSON.stringify(json));

      //update the auth context
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};