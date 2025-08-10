function Item({ todo }) {
  return (
    <li key={todo.id}>
      {todo.task} {todo.done ? "✅" : "❌"}
    </li>
  );
}

export default Item;
