import React, { useState, useEffect } from "react";
import { fetchPosts, postLike } from "./axiosFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {colors} from '../../styles/colors';

const GetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLiked, setisLiked] = useState(false)
  const token = localStorage.getItem("token");
  const userObject = JSON.parse(localStorage.getItem("user"))
  const user = userObject.firstName;
  console.log(user);
  useEffect(() => {
    fetchPosts(token).then((res) => setPosts(res))
  }, [token])

  return (
    <div id="postsContainer">
      {posts.map((post) => {
        const message = post.message;
        const image = post.imageUrl;
        const firstName = post.firstName;
        const lastName = post.lastName;
        const posterId = post.posterId;
        let likes = post.likes;
        let comments = post.comments.length;


        return (
          <div className="postContent" key={post._id}>
            <p>
              {firstName} {lastName}
            </p>
            {message === "" ? null : <h3>{message}</h3>}
            <div className="imageWrapper">
              {image === "" ? null : <img src={image} alt={posterId} />}
            </div>
            <div className="actionButtons">
              <div className="likesWrapper">
                <FontAwesomeIcon icon={faHeart} style={{color : colors.secondary}}className="icon heart" onClick={(e) => {
                  e.stopPropagation();
                  postLike(post._id, user, token)
                    .then(setisLiked(true))
                    .then()
                }} />
                <p>{likes}</p>
              </div>
              <div className="commentsWrapper">
                <div className="icon comments">comm</div>
                <p>{comments}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetPosts;
