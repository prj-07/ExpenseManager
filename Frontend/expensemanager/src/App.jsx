import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import Expense from "./components/ExpensePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analysis" element={<Expense />} />
      </Routes>
    </Router>
  );
}

export default App;
