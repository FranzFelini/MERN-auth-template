import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Dash() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-80">
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user.name}! 👋
            </h1>
            <p className="text-gray-500 mt-2">Glad to see you!</p>
          </>
        ) : (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dash;
