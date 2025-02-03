import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function AuthForm({ type }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    // Update the endpoint to include the /api/user prefix
    const endpoint =
      type === "register" ? "/api/user/register" : "/api/user/login";

    try {
      const { data: responseData } = await axios.post(
        endpoint,
        {
          name,
          email,
          password,
        },
        {
          // If needed, set withCredentials to true to allow sending cookies
          withCredentials: true,
        }
      );

      if (responseData.error) {
        toast.error(responseData.error);
        return;
      }

      // Clear form fields after successful submission
      setData({ name: "", email: "", password: "" });

      if (type === "register") {
        toast.success("Registration successful! Please log in.");
        navigate("/login"); // Navigate to login after successful registration
      } else {
        setUser(responseData.user); // Set user context on login
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error in submission:", error);
      if (error.response) {
        toast.error(error.response.data?.error || "Something went wrong!");
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-950 via-blue-950 to-indigo-600 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          {type === "register" ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            {type === "register" ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {type === "register"
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              onClick={() =>
                navigate(type === "register" ? "/login" : "/register")
              }
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              {type === "register" ? " Login" : " Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};

export default AuthForm;
