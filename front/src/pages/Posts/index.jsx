import React from "react";
import logo from "../../assets/logo.svg";
import Logout from "../../components/Log/Logout";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import CreatePost from "../../components/Post/CreatePost";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 1px -11px 11px 6px ${colors.primary};
    height: 60px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin-bottom: 2em;
` 

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
      </main>
    </div>
  );
};

export default PostsPage;
