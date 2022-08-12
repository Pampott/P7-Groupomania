import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    let signUpStatus = document.querySelector('.signup-status');
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
    .then(() => {
            signUpStatus.textContent = "Inscription réussie ! Essayez de vous connecter 😎"
    })
    .catch((err) => signUpStatus.textContent = `Oups ! Une erreur est survenue : ${err}`)
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
      <div className="signup-status"></div>
    </form>
  );
};

export default Signup;