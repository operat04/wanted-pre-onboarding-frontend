import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("AccessToken") ? "" : navigate("/signin");
  });
  return (
    <div>
      <h1>Todos</h1>
      <input data-testid="new-todo-input"></input>
      <button data-testid="new-todo-add-button">추가</button>
      <ul>
        <li>
          <label>
            <input type="checkbox"></input>
            <span>todo</span>
          </label>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </li>
      </ul>
    </div>
  );
};

export default Todos;
