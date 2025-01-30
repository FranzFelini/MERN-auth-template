import axios from "axios";
import { useEffect, useState } from "react";

function ToDoCmp() {
  const [todos, setTodos] = useState([]); // State for todos
  const [newTodo, setNewTodo] = useState(""); // State for new todo

  // Fetch todos when component loads
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos", { withCredentials: true })
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to add a todo
  const addTodo = () => {
    if (!newTodo) return;

    axios
      .post(
        "http://localhost:8000/api/todos",
        { text: newTodo },
        { withCredentials: true }
      )
      .then((res) => {
        setTodos([...todos, res.data]); // Update state with new todo
        setNewTodo(""); // Clear input
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-4 p-4 bg-gray-200 rounded-lg">
      <h2 className="text-xl font-bold">Your To-Do List</h2>

      {/* Input for adding new todo */}
      <div className="flex mt-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>

      {/* Display todos */}
      <ul className="mt-2">
        {todos.map((todo) => (
          <li key={todo._id} className="p-2 bg-white rounded shadow my-2">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoCmp;
