import { useState } from "react";
import Item from "./Item";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos", {
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch todos");
      }

      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add todo");
      }

      setNewTask("");
      fetchTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button onClick={fetchTodos}>Fetch Todos</button>

      <ul>
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} />
        ))}
      </ul>

      <form onSubmit={addTodo} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default Todos;
