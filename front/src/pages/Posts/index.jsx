import React from "react";
import logo from "../../assets/logo.svg";
import Logout from "../../components/Log/Logout";
import CreatePost from "../../components/Post/CreatePost";
import GetPost from "../../components/Post/GetPost";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import '../Posts/index.css';

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 1px -11px 11px 6px ${colors.tertiary};
    height: 60px;
` 

const Posts = () => {
  return (
    <div className="post-page">
      <StyledHeader>
        <div className="logo-container">
          <img id="logo" src={logo} alt="Groupomania logo"/>
        </div>
        <Logout />
      </StyledHeader>
      <main>
        <CreatePost />
        <GetPost />
      </main>
    </div>
  );
};

export default Posts;
