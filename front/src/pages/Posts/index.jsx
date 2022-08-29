import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import Logout from "../../components/Log/Logout";
import { StyledHeader, StyledInput } from "../../styles/Atoms";
import CreatePost from "../../components/Post/CreatePost";
import GetPosts from "../../components/Post/GetPosts";
import "./index.css";

const PostsPage = () => {
  const [toggled, setToggled] = useState(false);
  function toggle() {
    let toggle = document.getElementById("create-post-btn");
    toggle.classList.toggle("toggle");
    toggle.classList.contains("toggle")
      ? setToggled(true)
      : setToggled(false);
  }
  return (
    <div className="post-page">
      <StyledHeader>
        <div className="logo-container">
          <img id="logo" src={logo} alt="Groupomania logo" />
        </div>
        <Logout />
      </StyledHeader>
      <main>
        <StyledInput
          style={{letterSpacing : "0"}}
          id="create-post-btn"
          type="button"
          value={toggled ? "Fermer" : "Créer un post"}
          onClick={(e) => {
            toggle(e);
          }}
        />
        {toggled ? <CreatePost className="createPost" /> : null}
        <GetPosts />
      </main>
    </div>
  );
};

export default PostsPage;
