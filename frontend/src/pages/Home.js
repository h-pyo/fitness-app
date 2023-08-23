import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useUserAuthContext } from "../hooks/useUserAuthContext";

//components
import WorkoutInfo from "../components/WorkoutInfo";
import AddWorkout from "../components/AddWorkout";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useUserAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://fitness-app-gjaf.onrender.com/server/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);


  return (
    <div className="home">
      <div className="workouts">

        <div className="day-container">
          <h2>Monday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Monday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
        </div>
        
        <div className="day-container">
          <h2>Tuesday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Tuesday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
        </div>

        <div className="day-container">  
          <h2>Wednesday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Wednesday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
        </div>

        <div className="day-container">
          <h2>Thursday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Thursday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
        </div>

        <div className="day-container">  
          <h2>Friday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Friday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
        </div>

        <div className="day-container">
          <h2>Saturday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Saturday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
         </div>
        
        <div className="day-container">
          <h2>Sunday</h2>
          <div className="day-workouts">
            {workouts && workouts.map(function (workout) {
              if (workout.days.includes("Sunday")) {
                return (
                  <WorkoutInfo
                    key={workout._id}
                    workout={workout}
                  />
                )
              }
            })}
          </div>
        </div>
          
      </div>
      <AddWorkout />
    </div>
  )
}



export default Home