import { useJournalContext } from "../hooks/useJournalContext";
import { useUserAuthContext } from "../hooks/useUserAuthContext";
import { format } from 'date-fns';
import { FaTrashAlt } from 'react-icons/fa';

const EntryInfo = ({ entry }) => {
  const { user } = useUserAuthContext();
  const { dispatch } = useJournalContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/server/journal/${entry._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_ENTRY', payload: json });
    }
  };

  return (
    <div className="entry-info">
      <div className="entry-info-header">
        <h4>{format(new Date(entry.createdAt), 'MM/dd/yyyy')}</h4>
        <FaTrashAlt onClick={handleClick} className="delete-button" />
      </div>
      <p><strong>Hours slept: </strong>{entry.sleep}</p>
      <p><strong>Calories(kCal): </strong>{entry.calories}</p>
      <p><strong>Happiness Level: </strong>{entry.happiness}</p>
      <p className="notes-text"><strong>Notes: </strong>{entry.notes}</p>

    </div>
  )
}

export default EntryInfo