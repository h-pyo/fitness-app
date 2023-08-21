import { useState, useRef } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useUserAuthContext } from "../hooks/useUserAuthContext";

import Checkbox from "./Checkbox";

const AddWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [days, setDays] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useUserAuthContext();
  const checkBoxesRef = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }

    const workout = { title, reps, load, days };

    const response = await fetch('/server/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    console.log(response.ok);
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle('');
      setReps('');
      setLoad('');
      days.forEach((day) => {
        document.getElementById(`${day}`).checked = false;
      });
      setDays([]);
      setError(null);
      console.log('New workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  const handleClick = (day) => {
    const newDays = [...days];
    //check if the day was already selected and removes it if it was
    const index = newDays.indexOf(day.id);
    if (index === -1) {
      newDays.push(day.id);
    } else {
      newDays.splice(index, 1);
    }
    setDays(newDays);
  };

  return (
    <form onSubmit={handleSubmit} className="create-workout">
      <h3>Create a Workout</h3>
      
      <div>
        <label>Exercise Title: </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
      </div>

      <div>
        <label>Reps: </label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
         />
      </div>

      <div>
        <label>Load(lbs): </label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
      </div>

      <div className="days">
        <Checkbox
          id="Monday"
          handleClick={(e) => handleClick(e.target)}
        />
        <Checkbox
          id="Tuesday"
          handleClick={(e) => handleClick(e.target)}
          reset={(element) =>  checkBoxesRef.current.push(element) }
        />
        <Checkbox
          id="Wednesday"
          handleClick={(e) => handleClick(e.target)}
          reset={(element) =>  checkBoxesRef.current.push(element) }
        />
        <Checkbox
          id="Thursday"
          handleClick={(e) => handleClick(e.target)}
        />
        <Checkbox
          id="Friday"
          handleClick={(e) => handleClick(e.target)}
        />
        <Checkbox
          id="Saturday"
          handleClick={(e) => handleClick(e.target)}
        />
        <Checkbox
          id="Sunday"
          handleClick={(e) => handleClick(e.target.id)}
        />
      </div>

      <button>Add Workout to Schedule</button>
      {error && <div className="create-workout-error">{error}</div>}
    </form>
  )
}

export default AddWorkout