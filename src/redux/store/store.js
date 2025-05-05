import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import financeReducer from "../reducers/FinanceReducer";
import expenseReducer from "../reducers/expenseReducer";
import { thunk } from "redux-thunk";

// Function to load persisted state
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("financeState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Failed to load state", err);
    return undefined;
  }
};

// Function to save state
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("financeState", serializedState);
  } catch (err) {
    console.error("Failed to save state", err);
  }
};

// Load initial state from localStorage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer,
    expenses: expenseReducer,
  },
  preloadedState: persistedState, // Load saved state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Save state to localStorage whenever there is a change
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
