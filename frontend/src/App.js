import React, { useState } from "react";
import Form from "./components/Form";
import Todos from "./components/Todos";

function App() {
  const [accessToken, setAccessToken] = useState("");

  if (!accessToken) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Login</h2>
        <Form setAccessToken={setAccessToken} />
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
