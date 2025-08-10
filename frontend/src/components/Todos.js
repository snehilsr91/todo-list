import { useState } from "react";
import Item from "./Item";

function Todos({ accessToken }) {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
  return (
    <>
      <button onClick={fetchTodos}>Fetch Todos</button>
      <ul>
        {todos.map((todo) => (
          <Item todo={todo} />
        ))}
      </ul>
    </>
  );
}

export default Todos;
