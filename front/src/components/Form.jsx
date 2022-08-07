import React from "react";


const Form = () => {
  return (
    <div className="form-wrapper">
      <form action="#">
        <div className="champ">
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" name="email" id="email" />
        </div>
        <div className="champ">
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input type="password" name="password" id="password" />
        </div>
        <div className="btn-wrapper">
            <button>Continuer</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
