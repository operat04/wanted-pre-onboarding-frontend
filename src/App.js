import Signin from "./pages/SigninPage";
import Signup from "./pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodosPage from "./pages/TodosPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<TodosPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
