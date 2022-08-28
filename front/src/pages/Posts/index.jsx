import React from "react";
import logo from "../../assets/logo.svg";
import Logout from "../../components/Log/Logout";
import { StyledHeader } from "../../styles/Atoms";
import CreatePost from "../../components/Post/CreatePost";
import GetPosts from "../../components/Post/GetPosts";
import './index.css';


const PostsPage = () => {
  return (
    <div className="post-page">
      <StyledHeader>
        <div className="logo-container">
          <img id="logo" src={logo} alt="Groupomania logo"/>
        </div>
        <Logout />
      </StyledHeader>
      <main>
        <CreatePost className="createPost"/>
        <GetPosts />
      </main>
    </div>
  );
};

export default PostsPage;
