import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";

const TodosPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  //할일 추가하기
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

  //할일 조회
  useEffect(() => {
    localStorage.getItem("AccessToken") ? "" : navigate("/signin");
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [data]);
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
      <TodoList data={data} />
    </div>
  );
};

export default TodosPage;
