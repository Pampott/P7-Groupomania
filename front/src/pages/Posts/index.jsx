import React from "react";
import logo from "../../assets/logo.svg";
import Logout from "../../components/Log/Logout";
import CreatePost from "../../components/Post/CreatePost";
import GetPost from "../../components/Post/GetPost";

const Posts = () => {
  return (
    <>
      <header>
        <div className="logo-container">
          <img src={logo} alt="Groupomania logo" height="200" width="200" />
        </div>
        <Logout />
      </header>
      <main>
        <CreatePost />
        <GetPost />
      </main>
    </>
  );
};

export default Posts;
