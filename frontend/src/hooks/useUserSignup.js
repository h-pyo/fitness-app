import { useState } from "react";
import { useUserAuthContext } from "./useUserAuthContext";

export const useUserSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/server/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })  
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      //save the user to local storage for when they log back on
      localStorage.setItem('user', JSON.stringify(json));

      //update the auth context
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};