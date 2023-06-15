import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    margin: 10px 0;
    width: 250px;
  }
  div {
    color: gray;
    font-size: 15px;
  }
  button {
    margin: 10px 0 5px 0;
  }
`;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => localStorage.setItem("AccessToken", res.data.access_token))
      .then(() => navigate("/todo", { replace: true }))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    localStorage.getItem("AccessToken") ? navigate("/todo") : "";
  }, []);

  return (
    <InputContainer>
      <h1>SignIn Page</h1>
      <input
        data-testid="email-input"
        placeholder="이메일을 입력해주세요"
        onChange={handleEmail}
      ></input>
      {email.includes("@") ? (
        <div></div>
      ) : (
        <div>이메일 형식에 맞게 입력해주세요.</div>
      )}
      <input
        data-testid="password-input"
        placeholder="비밀번호를 입력해주세요"
        onChange={handlePassword}
        type="password"
      ></input>
      {password.length < 8 ? (
        <div>비밀 번호를 8자리 이상 입력해주세요</div>
      ) : (
        <div></div>
      )}
      <button
        data-testid="signin-button"
        disabled={password.length < 8 || !email.includes("@")}
        onClick={handleSubmit}
      >
        로그인
      </button>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </InputContainer>
  );
};

export default Signin;
