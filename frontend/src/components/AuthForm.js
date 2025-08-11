import { useState } from "react";

function AuthForm({ setAccessToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isRegister
        ? "http://localhost:5000/auth/register"
        : "http://localhost:5000/auth/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      if (isRegister) {
        setMessage("✅ Registration successful! You can now log in.");
        setIsRegister(false);
        setUsername("");
        setPassword("");
      } else {
        setAccessToken(data.accessToken);
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div>
      <h3>{isRegister ? "Register" : "Login"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>

      {message && <p>{message}</p>}

      <button
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
        }}
      >
        {isRegister ? "Have an account? Login" : "No account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
