import { UserAuthContext } from "../context/UserAuthContext";
import { useContext } from "react";

export const useUserAuthContext = () => {
  const context = useContext(UserAuthContext)

  if (!context) {
    throw Error('authContext must be used inside an AuthProvider');
  } 
  
  return context;
};