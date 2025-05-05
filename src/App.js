import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store/store";
import Navbar from "./components/Navbar";
import Login from "./Login"
import Register from "./Register";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpense";
import EditProfile from "./components/EditProdile";
import FullPage from "./components/FullPage";


const Home = () => <h2>Welcome to Home Page</h2>;

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  

  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<FullPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-expense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />} />
        <Route path="/view-expenses" element={isAuthenticated ? <ViewExpenses /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
