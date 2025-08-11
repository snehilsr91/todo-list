import { useState } from "react";

function AuthForm({ onLogin }) {
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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Request failed");

      if (isRegister) {
        setMessage("✅ Registration successful! You can now log in.");
        setIsRegister(false);
        setUsername("");
        setPassword("");
      } else {
        onLogin();
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {isRegister ? "Register" : "Login"}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          } font-medium`}
        >
          {message}
        </p>
      )}

      <button
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
        }}
        className="mt-6 text-indigo-600 underline hover:text-indigo-800"
        type="button"
      >
        {isRegister ? "Have an account? Login" : "No account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
