import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Dash() {
  const { user } = useContext(UserContext);

  if (user === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-950 via-blue-950 to-indigo-600">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-80">
          <p className="text-gray-500 animate-pulse">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-950 via-blue-950 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-3xl p-8 text-center w-full sm:w-96">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Welcome, {user.name}! 👋
        </h1>
        <p className="text-gray-700 mt-2">Glad to see you back!</p>
        <h3 className="text-xl font-thin mt-4 text-gray-600">
          This is your dashboard
        </h3>

        <div className="mt-6">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200">
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dash;
