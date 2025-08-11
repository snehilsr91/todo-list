import { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Todos from "./components/Todos";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // On page load, check if the user is already logged in via cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Login/Register</h2>
        <AuthForm onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Todos</h2>
      <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
        Logout
      </button>
      <Todos />
    </div>
  );
}

export default App;
