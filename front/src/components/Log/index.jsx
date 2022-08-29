import React from "react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={"auth-btn" (signUpModal ? "active-btn" : null)}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={"auth-btn" (loginModal ? "active-btn" : null)}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <Signup />}
        {loginModal && <Login />}
      </div>
    </div>
  );
};

export default Log;
