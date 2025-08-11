function Item({ todo, onToggle }) {
  return (
    <li
      onClick={onToggle}
      className={`cursor-pointer flex justify-between items-center p-3 rounded border ${
        todo.done
          ? "bg-green-100 border-green-400"
          : "bg-red-100 border-red-400"
      }`}
    >
      <span
        className={todo.done ? "line-through text-green-700" : "text-red-700"}
      >
        {todo.task}
      </span>
      <span>{todo.done ? "✅" : "❌"}</span>
    </li>
  );
}

export default Item;
