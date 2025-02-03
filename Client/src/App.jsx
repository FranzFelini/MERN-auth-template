import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";
import "./App.css";
import Navbar from "./components/NavCmp";
import AddBookPage from "./pages/AddBookPage";
import DashboardPage from "./pages/DashboardPage";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/add-book" element={<AddBookPage />} />{" "}
        {/* Add new route */}
        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
