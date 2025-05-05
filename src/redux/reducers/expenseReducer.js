// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("expenses");
    return serializedState ? JSON.parse(serializedState) : { expenses: [], totalAmount: 0 };
  } catch (err) {
    console.error("Error loading expenses", err);
    return { expenses: [], totalAmount: 0 };
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem("expenses", JSON.stringify(state));
  } catch (err) {
    console.error("Error saving expenses", err);
  }
};

const initialState = {
  expenses: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload, category: action.payload.category }],
      };

    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.updatedData } : exp
        ),
      };


    case "DELETE_EXPENSE":
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      return {
        ...state,
        expenses: updatedExpenses,
      };

    default:
      return state;
  }
};

export default expenseReducer;
