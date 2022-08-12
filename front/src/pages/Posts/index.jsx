import React from "react";
import logo from '../../assets/logo.svg'
import Logout from "../../components/Log/Logout";

const Posts = () => {
  return( 
    <header>
      <div className="logo-container">
        <img src={logo} alt="Groupomania logo" height= "200" width="200"/>
      </div>
      <Logout />
    </header>
  );
};

export default Posts;
