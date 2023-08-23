import { useEffect } from "react";
import { useJournalContext } from "../hooks/useJournalContext";
import { useUserAuthContext } from "../hooks/useUserAuthContext";

//components
import AddEntry from "../components/AddEntry";
import EntryInfo from "../components/EntryInfo";
import Graph from "../components/Graph";


const Journal = () => {
  const { entries, dispatch } = useJournalContext();
  const { user } = useUserAuthContext();

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('/server/journal', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_ENTRIES', payload: json });
      }
    };
    if (user) {
      fetchEntries();
    }
  }, [dispatch, user]);

  return (
    <div className="journal">
      <div className="entries-graph">
        {!entries?.length ? <AddEntry /> : ''}
        <div className="graph-container">
          {entries?.length ? <Graph data={entries.slice(0,5)} /> : ''}
        </div>
        <div className="entries">
          {entries?.length ? entries.map((entry) => (
            <EntryInfo
              key={entry._id}
              entry={entry}
            />
          )) : ''}
        </div>
      </div>
      {entries?.length ? <AddEntry /> : ''}
    </div>
    
  )
}

export default Journal