import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import AuthLoader from "../components/AuthLoader";
import Signupbtn from "../components/Signupbtn";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer"); // ✅ default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name,
        email,
        password,
        role, // ✅ send role
      });
      setTimeout(() => navigate("/"), 1200);
    } catch {
      setLoading(false);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <>
      {loading && <AuthLoader text="Creating your account…" />}

      <AuthLayout showSignupLink={false}>
        <h2 className="text-sm text-gray-700 mb-6">Create your account</h2>

        <form onSubmit={signup} className="w-full space-y-3">
          {/* Name */}
          <input
            type="text"
            required
            className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          {/* Role Selection */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="Viewer">Viewer (Read Only)</option>
              <option value="Analyst">Analyst (Upload & View)</option>
            </select>
          </div>

          {/* Error */}
          {error && <p className="text-xs text-red-600 text-left">{error}</p>}

          {/* Signup button */}
          <button type="submit" disabled={loading} className="w-full mt-3">
            <Signupbtn />
          </button>
        </form>

        {/* Login link */}
        <p className="text-xs mt-4 text-gray-700 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-medium cursor-pointer hover:underline"
          >
            Login →
          </button>
        </p>
      </AuthLayout>
    </>
  );
}
