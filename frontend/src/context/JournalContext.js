import { createContext, useReducer } from "react";

export const JournalContext = createContext();

export const journalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ENTRIES':
      return {
        entries: action.payload
      }
    case 'CREATE_ENTRY':
      return {
        entries: [action.payload, ...state.entries]
      }
    case 'DELETE_ENTRY':
      return {
        entries: state.entries.filter((entry) => entry._id !== action.payload._id)
      }
    default:
      return state;
  }
};

export const JournalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, {
    entries: null
  });

  return (
    <JournalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JournalContext.Provider>
  )
}