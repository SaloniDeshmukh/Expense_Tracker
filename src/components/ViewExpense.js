import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExpense, editExpense } from "../redux/actions/expenseActions";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewExpenses = () => {
    const expenses = useSelector((state) => state.expenses.expenses || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editId, setEditId] = useState(null);
    const [newAmount, setNewAmount] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredExpenses = filter === "All" ? expenses : expenses.filter(exp => exp.category === filter);

    const handleDelete = (id) => {
        dispatch(deleteExpense(id));
    };

    const handleEditExpense = (expenseId) => {
        dispatch({
            type: "EDIT_EXPENSE",
            payload: {
                id: expenseId,
                updatedData: { amount: newAmount, category: newCategory },
            },
        });

        setEditId(null); // Exit edit mode
    };

    const startEditing = (expense) => {
        setEditId(expense.id);
        setNewAmount(expense.amount);
        setNewCategory(expense.category);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>All Expenses</h2>

            <label style={{ fontWeight: "bold", marginRight: "10px" }}>Filter by Category:</label>
            <select onChange={(e) => setFilter(e.target.value)} style={{ padding: "8px", borderRadius: "5px", fontSize: "16px" }}>
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
            </select>

            {filteredExpenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <table style={{ width: "90%", maxWidth: "600px", margin: "20px auto", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Expense Name</th>
                            <th>Amount ($)</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense, index) => (
                            <tr key={expense.id}>
                                <td>{index + 1}</td>
                                <td>{expense.name}</td>
                                <td>
                                    {editId === expense.id ? (
                                        <input
                                            type="number"
                                            value={newAmount}
                                            onChange={(e) => setNewAmount(e.target.value)}
                                        />
                                    ) : (
                                        `$${expense.amount}`
                                    )}
                                </td>
                                <td>
                                    {editId === expense.id ? (
                                        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                            <option value="Food">Food</option>
                                            <option value="Rent">Rent</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Bills">Bills</option>
                                        </select>
                                    ) : (
                                        expense.category
                                    )}
                                </td>
                                <td>
                                    {editId === expense.id ? (
                                         <button 
                                         onClick={() => handleEditExpense(expense.id)}
                                         style={{
                                             background: "#4CAF50", color: "white", border: "none", 
                                             padding: "6px 10px", borderRadius: "5px", cursor: "pointer", margin: "20px"
                                         }}
                                     >
                                         Save
                                     </button>
                                 ) : (
                                     <button 
                                         onClick={() => startEditing(expense)}
                                         style={{
                                             background: "#2196F3", color: "white", border: "none", 
                                             padding: "6px 10px", borderRadius: "5px", cursor: "pointer", margin: "20px"
                                         }}
                                     >
                                         <FaEdit />
                                     </button>
                                 )}

                                 <button 
                                     onClick={() => handleDelete(expense.id)}
                                     style={{
                                         background: "#FF5733", color: "white", border: "none", 
                                         padding: "6px 10px", borderRadius: "5px", cursor: "pointer"
                                     }}
                                 >
                                     <FaTrash />
                                 </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <button
                style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", background: "red", color: "white", fontSize: "16px", cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default ViewExpenses;