import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

const renderLabel = ({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`; 

const ExpensePieChart = ({ expenseData }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={expenseData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={renderLabel} 
      >
        {expenseData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default ExpensePieChart;
