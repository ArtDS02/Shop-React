import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://ircnv.id.vn:8080/v1/api/authen/signin", { email, password });
      const data = response.data;

      if (data.user && data.user.token) {
        Cookies.set('token', data.user.token, { expires: 7 });
        setError(""); 
        console.log("Login successful");
        window.location.href = "/";
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  }

  return (
    <div className="body-list">
      <div className="main-content-list">
        <h2>Login</h2>
        <br /><br />
        <form onSubmit={handleLogin}>
          <div className="control">
            <input
              className="input-box"
              type="text"
              placeholder="Email"
              onBlur={(e) => setEmail(e.target.value)}
            /><br /><br />
          </div>
          <div className="control">
            <input
              className="input-box"
              type="password"
              placeholder="Password"
              onBlur={(e) => setPassword(e.target.value)}
            /><br /><br />
          </div>
          <div className="control">
            <button className="btn">Submit</button><br />
            <a className="forget">Forget pass ?</a>
          </div>
            {error && <p className="text-danger" style={{color:"red",fontWeight:"bolder"}}>{error}</p>}
          <a className="forget" href="/signup" style={{ textDecoration: "none", color: "black" }}>Create new account?</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
