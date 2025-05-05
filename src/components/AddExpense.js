import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { addExpense } from "../redux/actions/expenseActions";

// Background Animation
const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Fade-in Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Container for Full Page
const AddExpenseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #ffdde1);
  background-size: 400% 400%;
  animation: ${gradientBG} 10s ease infinite;
`;

// Card Styling
const ExpenseCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 450px;
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.8s ease-in-out;
`;

// Heading
const Title = styled.h2`
  font-size: 26px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
`;

// Form Styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Input Fields
const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  &:focus {
    transform: scale(1.02);
    box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

// Select Dropdown Styling
const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

// Button Styling
const Button = styled.button`
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1);
  background: linear-gradient(90deg, #ff758c, #ff7eb3);
  color: white;

  &:hover {
    background: linear-gradient(90deg, #ff7eb3, #ff758c);
    transform: scale(1.05);
  }
`;

const CancelButton = styled(Button)`
  background: linear-gradient(90deg, #5b86e5, #36d1dc);

  &:hover {
    background: linear-gradient(90deg, #36d1dc, #5b86e5);
  }
`;

const AddExpense = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Add Expense
  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    dispatch(
      addExpense({
        id: Date.now(),
        name,
        amount: Number(amount),
        category,
        date: new Date().toISOString(),
      })
    );

    setName("");
    setAmount("");
    setCategory("Food");
    navigate("/dashboard"); // Redirect after adding expense
  };

  return (
    <AddExpenseContainer>
      <ExpenseCard>
        <Title>📝 Add a New Expense</Title>
        <Form onSubmit={handleAddExpense}>
          <Input
            type="text"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
          </Select>
          <Button type="submit">💾 Save Expense</Button>
          <CancelButton type="button" onClick={() => navigate("/dashboard")}>
            ❌ Cancel
          </CancelButton>
        </Form>
      </ExpenseCard>
    </AddExpenseContainer>
  );
};

export default AddExpense;
