import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";
import "./App.css";
import Navbar from "./components/NavCmp";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="top right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>

        <Route></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
