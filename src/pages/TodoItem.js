import axios from "axios";
import { useEffect, useState } from "react";

const TodoItem = (todo) => {
  const [isedit, setIsedit] = useState(false);
  const [edittext, setEdittext] = useState(todo.todo);
  const [isChecked, setIsChecked] = useState(todo.isCompleted);
  //할일 삭제
  const Deletetodo = (id) => {
    axios.delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    });
  };
  //할일 수정
  const handleEdit = () => {
    setIsedit(!isedit);
  };
  const handleText = (e) => {
    setEdittext(e.target.value);
  };
  //수정 제출
  const submitText = (id) => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: edittext,
          isCompleted: todo.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      )
      .then(() => setIsedit(!isedit));
  };
  //할일 완료 체크
  const handleIsChecked = () => {
    setIsChecked(!isChecked);
  };
  const handleCompleted = (id) => {
    axios.put(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        todo: todo.todo,
        isCompleted: isChecked,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      }
    );
  };
  useEffect(() => {
    handleCompleted(todo.id);
  }, [isChecked]);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleIsChecked}
          onClick={() => handleCompleted(todo.id)}
        ></input>
        {isedit ? (
          <input
            data-testid="modify-input"
            value={edittext}
            onChange={handleText}
          ></input>
        ) : (
          <span className={todo.isCompleted ? "checked" : ""}>{todo.todo}</span>
        )}
      </label>
      {isedit ? (
        <button data-testid="submit-button" onClick={() => submitText(todo.id)}>
          제출{" "}
        </button>
      ) : (
        <button data-testid="modify-button" onClick={handleEdit}>
          수정
        </button>
      )}
      {isedit ? (
        <button data-testid="cancel-button" onClick={handleEdit}>
          취소
        </button>
      ) : (
        <button data-testid="delete-button" onClick={() => Deletetodo(todo.id)}>
          삭제
        </button>
      )}
    </>
  );
};

export default TodoItem;
