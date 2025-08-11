import { useState } from "react";
import AuthForm from "./components/AuthForm";
import Todos from "./components/Todos";

function App() {
  const [accessToken, setAccessToken] = useState("");

  if (!accessToken) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Login/Register</h2>
        <AuthForm setAccessToken={setAccessToken} />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Todos</h2>
      <Todos accessToken={accessToken} />
    </div>
  );
}

export default App;
