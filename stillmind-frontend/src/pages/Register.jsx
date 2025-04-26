import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5276/api/Auth/register", {
        username,
        password,
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-900 to-purple-800 text-white">
      <h1 className="text-4xl mb-6">Register Page</h1>
      <form onSubmit={handleRegister} className="bg-purple-300 p-8 rounded-2xl w-80 text-black">
        <InputField placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" text="Register" />
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
