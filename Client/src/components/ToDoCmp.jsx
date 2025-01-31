import axios from "axios";
import { useEffect, useState } from "react";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch todos after login
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos", { withCredentials: true })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (!newTask) return;

    axios
      .post(
        "http://localhost:8000/api/todos",
        { task: newTask },
        { withCredentials: true }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTask(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
    </div>
  );
}

export default ToDoList;
