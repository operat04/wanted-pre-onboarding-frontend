import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  const handletodo = (e) => {
    setTodo(e.target.value);
  };
  const Addtodos = () => {
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          todo: todo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      )
      .then(() => setTodo(""));
  };
  useEffect(() => {
    localStorage.getItem("AccessToken") ? "" : navigate("/signin");
  }, []);

  useEffect(() => {
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, data);
  return (
    <div>
      <h1>Todos</h1>
      <input
        data-testid="new-todo-input"
        onChange={handletodo}
        value={todo}
      ></input>
      <button data-testid="new-todo-add-button" onClick={Addtodos}>
        추가
      </button>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox"></input>
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button">삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
