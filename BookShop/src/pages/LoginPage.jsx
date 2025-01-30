import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access UserContext

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post(
        "/login",
        { email: data.email, password: data.password },
        { withCredentials: true } // Send cookies
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        setUser(response.user); // Save user in context
        setData({ email: "", password: "" }); // Clear input fields
        toast.success("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={loginUser}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
