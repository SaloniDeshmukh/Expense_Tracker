import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ExpensePieChart from "./PieChart";
import { FaEdit } from "react-icons/fa";

// Background gradient animation
const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Fade-in animation
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  min-height: 100vh;
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #ffdde1);
  animation: ${gradientBG} 10s ease infinite;
`;

const DashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.8s ease-in-out;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  color: #ffffff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
`;

const StatCard = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

const IncomeCard = styled(StatCard)`
  background: rgba(46, 204, 113, 0.3);
  color: #27ae60;
`;

const ExpenseCard = styled(StatCard)`
  background: rgba(255, 99, 132, 0.3);
  color: #ff4757;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  gap: 10px;
`;

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

  &.add-income {
    background: linear-gradient(90deg, #2ecc71, #27ae60);
    color: white;
  }

  &.add-income:hover {
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    transform: scale(1.05);
  }

  &.add-expense {
    background: linear-gradient(90deg, #36d1dc, #5b86e5);
    color: white;
  }

  &.add-expense:hover {
    background: linear-gradient(90deg, #5b86e5, #36d1dc);
    transform: scale(1.05);
  }

  &.view {
    background: linear-gradient(90deg, #ff9a9e, #ff6f61);
    color: white;
  }

  &.view:hover {
    background: linear-gradient(90deg, #ff6f61, #ff9a9e);
    transform: scale(1.05);
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");

  const income = useSelector((state) => state.finance?.income || []);
  const expenses = useSelector((state) => state.expenses?.expenses || []);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const formattedData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find((item) => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const budgetLimit = 1000; // Set a budget limit
  const isOverBudget = totalExpense > budgetLimit;


  const handleAddIncome = () => {
    if (!incomeAmount || isNaN(incomeAmount) || Number(incomeAmount) <= 0) {
      alert("Please enter a valid income amount.");
      return;
    }

    dispatch({
      type: "ADD_INCOME",
      payload: {
        id: Date.now(),
        name: "New Income",
        amount: Number(incomeAmount),
        date: new Date().toISOString(),
        type: "income",
      },
    });


    setIncomeAmount("");
    setShowModal(false); // Close the modal after adding income
  };

  const exportToCSV = () => {
    if (!expenses || expenses.length === 0) {
      alert("No expenses to export!");
      return;
    }

    const csvContent =
      "ID,Amount,Category,Date\n" +
      expenses.map((exp) => `${exp.id},${exp.amount},${exp.category},${exp.date}`).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    window.URL.revokeObjectURL(url); 
  };


  return (
    <DashboardContainer>
      <DashboardCard>
        <Title>💰 Expense Tracker Dashboard</Title>
        <IncomeCard>Total Income: ${totalIncome.toFixed(2)}</IncomeCard>
        <ExpenseCard>Total Expenses: ${totalExpense.toFixed(2)}</ExpenseCard>
        <ButtonGroup>
          <Button className="add-income" onClick={() => setShowModal(true)}>➕ Add Income</Button>
          <Button className="add-expense" onClick={() => navigate("/add-expense")}>➕ Add Expense</Button>
          <Button className="view" onClick={() => navigate("/view-expenses")}>📊 View Expenses</Button>
        </ButtonGroup>

        <StatCard style={{ background: "rgba(4, 0, 252, 0.34)", color: "#0400fc" }}>
          Net Balance: ${balance.toFixed(2)}
        </StatCard>

        {isOverBudget && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            ⚠ Warning: You have exceeded your budget!
          </p>
        )}

<Button className="export" onClick={exportToCSV}>📥 Export to CSV</Button>
      </DashboardCard>

      {/* Show Modal When Needed */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Add Income</h3>
            <Input
              type="number"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              placeholder="Enter income amount"
            />
            <Button className="add-income" onClick={handleAddIncome}>✔ Confirm</Button>
            <Button className="view" onClick={() => setShowModal(false)}>❌ Cancel</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      {formattedData.length > 0 ? (
        <div>
          <h3>Expense Distribution</h3>
          <ExpensePieChart expenseData={formattedData} />
        </div>
      ) : (
        <p>No expenses added yet.</p>
      )}


    </DashboardContainer>
  );
};

export default Dashboard;