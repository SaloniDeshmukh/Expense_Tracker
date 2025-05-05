const initialState = {
    income: [],
    expenses: [],
};

const financeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_INCOME":
            return { ...state, income: [...state.income, action.payload] };
        case "ADD_EXPENSE":
            return { ...state, expenses: [...state.expenses, action.payload] };
        default:
            return state;
    }
};

export default financeReducer;
