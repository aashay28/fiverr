import React, { useState } from "react";
import "./Login.scss";
import Request from "../../utils/Request";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Request.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data.data));
      localStorage.setItem("accessToken", JSON.stringify(res.data.token));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor=''>Username</label>
        <input
          name='username'
          type='text'
          placeholder='aashayshah'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor=''>Password</label>
        <input
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
