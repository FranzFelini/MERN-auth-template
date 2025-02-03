import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";
import "./App.css";
import Navbar from "./components/NavCmp";
import DashboardPage from "./pages/DashboardPage";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Set axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="top right" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editprofile" element={<EditProfile />} />

        {/* Protected route */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
