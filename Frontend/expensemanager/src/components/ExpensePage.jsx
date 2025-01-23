import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ExpensePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [income, setIncome] = useState(0);
  const [expenseDetails, setExpenseDetails] = useState({
    entertainment: 0,
    food: 0,
    travel: 0,
    grocery: 0,
    education: 0,
    miscellaneous: 0,
  });
  const [amount, setAmount] = useState(0); // Amount entered by user
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for expense

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Please select a category!");
      return;
    }
    setExpenseDetails((prevDetails) => ({
      ...prevDetails,
      [selectedCategory]:
        prevDetails[selectedCategory] + parseFloat(amount || 0),
    }));
    alert(`₹${amount} added to ${selectedCategory}`);
    setAmount(0);
    setSelectedCategory("");
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    alert(`Income updated to ₹${income}`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Expense Analysis</h1>

      {/* Modal Popup */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {!selectedOption ? (
          // Display options to choose Income or Expense
          <div>
            <h2>What would you like to update?</h2>
            <button onClick={() => setSelectedOption("income")}>Income</button>
            <button onClick={() => setSelectedOption("expense")}>
              Expense
            </button>
          </div>
        ) : selectedOption === "income" ? (
          // Form to update income
          <form onSubmit={handleIncomeSubmit}>
            <h2>Update Income</h2>
            <label>
              Enter new income:
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        ) : (
          // Form to update expenses with category selection
          <form onSubmit={handleExpenseSubmit}>
            <h2>Update Expenses</h2>
            <label>
              Enter Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              />
            </label>
            <label>
              Select Category:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">--Select--</option>
                <option value="entertainment">Entertainment</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="grocery">Grocery</option>
                <option value="education">Education</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </Modal>

      {/* Rest of the Expense Analysis Page */}
      <div>
        <h2>Summary</h2>
        <p>
          <strong>Total Income:</strong> ₹{income}
        </p>
        <p>
          <strong>Expense Breakdown:</strong>
        </p>
        <ul>
          {Object.entries(expenseDetails).map(([key, value]) => (
            <li key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: ₹{value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensePage;
