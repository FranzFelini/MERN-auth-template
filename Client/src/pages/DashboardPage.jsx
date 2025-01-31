import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Dash() {
  const { user } = useContext(UserContext);

  if (user === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-80">
          <p className="text-gray-500 animate-pulse">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-80">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}! 👋
        </h1>
        <p className="text-gray-500 mt-2">Glad to see you!</p>
        <h3 className="text-xl font-thin mt-[0.5em]">This is your dashboard</h3>
      </div>
    </div>
  );
}

export default Dash;
