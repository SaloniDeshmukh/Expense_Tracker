const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState ? JSON.parse(serializedState) : { isAuthenticated: false, user: null };
  } catch (err) {
    return { isAuthenticated: false, user: null };
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("authState", JSON.stringify(state));
  } catch (err) {
    console.error("Error saving state", err);
  }
};

const initialState = loadState();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const loggedInState = { ...state, isAuthenticated: true, user: action.payload };
      saveState(loggedInState);  // Save to localStorage
      return loggedInState;
    case "LOGOUT":
      saveState({ isAuthenticated: false, user: null });  // Clear storage
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;

export const loginUser = (user) => ({ type: "LOGIN_SUCCESS", payload: user });
export const logoutUser = () => ({ type: "LOGOUT" });
