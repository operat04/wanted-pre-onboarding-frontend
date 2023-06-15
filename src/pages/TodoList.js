import TodoItem from "./TodoItem";

const TodoList = (data) => {
  return (
    <ul>
      {data.data.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            id={todo.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
