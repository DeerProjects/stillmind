import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState(""); // ✅ not passwordHash
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // 👇 Add this line here!
    console.log("Logging in with:", username, passwordHash);
  
    try {
      const res = await axios.post("http://localhost:5276/api/Auth/login", {
        username,
        passwordHash,
      });
  
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
      alert("Invalid login");
      console.error(err);
    }
  };
  

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
