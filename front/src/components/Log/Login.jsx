import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios
      .post(`${process.env.REACT_APP_API_URL}api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if(res.status === 200) {
          localStorage.setItem('posterId', res.data.userId)
          window.location = "/posts"
        } else {
          emailError.innerHTML = 'Identifiants incorrects' + res.status;
          passwordError.innerHTML = 'Identifiants incorrects' + res.status
        }

      })
      .catch((err) => {
        emailError.innerHTML = 'Identifiants incorrects : ' + err
        passwordError.innerHTML = 'Identifiants incorrects : ' + err;
      });
  };
  return (
    <form action="" onSubmit={handleLogin} id="login-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
      <br />
    </form>
  );
};

export default Login;
