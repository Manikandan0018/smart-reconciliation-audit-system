import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import AuthLoader from "../components/AuthLoader";
import Loginbtn from "../components/Loginbtn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <>
      {loading && <AuthLoader text="Logging you in…" />}

      <AuthLayout>
        <h2 className="text-sm text-gray-700 mb-6">Log in to your account</h2>

        <form onSubmit={login} className="w-full space-y-3">
          {/* Email */}
          <input
            type="email"
            required
            className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            required
            className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error */}
          {error && <p className="text-xs text-red-600 text-left">{error}</p>}

          {/* Login button */}
          <button type="submit" disabled={loading} className="w-full mt-3">
            <Loginbtn />
          </button>
        </form>

        {/* Signup */}
        <div className="mt-4 text-sm text-gray-700 text-center">
          Don’t have an Account?{" "}
          <button onClick={signup} className="font-medium cursor-pointer hover:underline">
            Sign up →
          </button>
        </div>
      </AuthLayout>
    </>
  );
}
