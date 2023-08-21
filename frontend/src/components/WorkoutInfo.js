import { useUserAuthContext } from "../hooks/useUserAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaTrashAlt } from 'react-icons/fa';

const WorkoutInfo = ({workout}) => {
  const { user } = useUserAuthContext();
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/server/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-info">
      <div className="workout-info-header">
        <h4>{workout.title}</h4>
        <FaTrashAlt onClick={handleClick} className="delete-button" />
      </div>
      <p><strong>Load: </strong>{workout.load} lbs</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p className="date-created">Created {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
      
    </div>
  )
}

export default WorkoutInfo