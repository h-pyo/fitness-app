import { useUserAuthContext } from "./useUserAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext";

export const useUserLogout = () => {
  const { dispatch } = useUserAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const logout = () => {
    //remove user from local storage
    localStorage.removeItem('user');
    
    //dispatch logout action
    dispatch({ type: 'LOGOUT' });
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
  };  
  return { logout };
};