import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HomePage = () => {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3000);
  const [dailyBudget, setDailyBudget] = useState((income - expenses) / 30);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle Update and Navigate
  const handleUpdate = () => {
    setDailyBudget((income - expenses) / 30); // Update the daily budget
    navigate("/analysis", { state: { income, expenses } }); // Navigate to the Expense Analysis page with data
  };

  const data = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount",
        data: [income, expenses, income - expenses],
        backgroundColor: ["#36A2EB", "#FF6384", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="home-page">
      <h1>Expense Manager</h1>

      {/* Flex container for main content */}
      <div className="content-container">
        {/* Left Section: Chart and Update Form */}
        <div className="left-section">
          {/* Chart Section */}
          <div className="chart-section">
            <Bar data={data} />
          </div>

          {/* Update Income and Expenses Section */}
          <div className="update-section">
            <h2>Update Income and Expenses</h2>
            <div>
              <label>Income: </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label>Expenses: </label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
              />
            </div>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>

        {/* Right Section: Monthly Summary */}
        <div className="right-section">
          <h2>Monthly Summary</h2>
          <p>
            <strong>Income:</strong> ₹{income}
          </p>
          <p>
            <strong>Expenses:</strong> ₹{expenses}
          </p>
          <p>
            <strong>Savings:</strong> ₹{income - expenses}
          </p>
          <p>
            <strong>Daily Budget:</strong> ₹{dailyBudget.toFixed(2)} (based on
            30 days)
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
