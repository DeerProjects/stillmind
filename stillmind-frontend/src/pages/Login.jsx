import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../utils/token";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5276/api/Auth/login", {
        username,
        passwordHash,
      });
      setToken(res.data.token);
      navigate("/notes");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-900 to-purple-800 text-white">
      <h1 className="text-4xl mb-6">Login Page</h1>
      <form onSubmit={handleLogin} className="bg-purple-300 p-8 rounded-2xl w-80 text-black">
        <InputField placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField type="password" placeholder="Password" value={passwordHash} onChange={(e) => setPasswordHash(e.target.value)} />
        <Button type="submit" text="Login" />
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;