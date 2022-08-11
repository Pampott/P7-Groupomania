import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        withCredentials: false,
        data: {
            email: email,
            password: password
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err))
  }
  return (
    <form action="" onSubmit={handleSignup} id="signup-form">
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
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default Signup;
