import { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Todos from "./components/Todos";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          // Safe to parse JSON because status is 2xx
          await res.json();
          setIsLoggedIn(true);
        } else if (res.status === 401) {
          // Not logged in — no need to parse JSON or throw error
          setIsLoggedIn(false);
        } else {
          // Unexpected errors — parse JSON if possible, else fallback
          try {
            const data = await res.json();
            console.error("Unexpected auth error:", res.status, data);
          } catch {
            console.error(
              "Unexpected auth error with non-JSON response:",
              res.status
            );
          }
        }
      } catch (err) {
        // Network or other unexpected errors
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
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Login / Register
        </h2>
        <AuthForm onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Todos</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <Todos />
    </div>
  );
}

export default App;
