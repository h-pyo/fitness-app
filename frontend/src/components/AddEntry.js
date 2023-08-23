import { useState } from "react";
import { useJournalContext } from "../hooks/useJournalContext";
import { useUserAuthContext } from "../hooks/useUserAuthContext";

const AddEntry = () => {
  const { dispatch } = useJournalContext();
  const [sleep, setSleep] = useState('');
  const [calories, setCalories] = useState('');
  const [happiness, setHappiness] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useUserAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }

    const entry = { sleep, calories, happiness, notes };

    const response = await fetch('/server/journal', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setSleep('');
      setCalories('');
      setHappiness('');
      setNotes('');
      setError(null);
      console.log('New entry added', json);
      dispatch({ type: 'CREATE_ENTRY', payload: json });
    }
  };

  const handleChange = (e) => {
    setHappiness(e);
  };

  return (
    <form onSubmit={handleSubmit} className="create-entry">
      <h3>Add a Daily Entry</h3>
      
      <div>
        <label>Hours of sleep: </label>
        <input
          type="number"
          onChange={(e) => setSleep(e.target.value)}
          value={sleep}
          className={emptyFields.includes('sleep') ? 'error' : ''}
        />
      </div>

      <div>
        <label>Calories (kCal): </label>
        <input
          type="number"
          onChange={(e) => setCalories(e.target.value)}
          value={calories}
          className={emptyFields.includes('calories') ? 'error' : ''}
         />
      </div>

      <div>
        <label>Happiness Level: </label>
        <select
          value={happiness}
          onChange={(e) => handleChange(e.target.value)}
          className={emptyFields.includes('happiness') ? 'error' : ''}
        >
          <option value={null}></option>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>

      <div className="notes">
        <label>Notes on Today: </label>
        <textarea
          type="text"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <button>Add Entry to Journal</button>
      {error && <div className="create-entry-error">{error}</div>}
    </form>
  )
}

export default AddEntry