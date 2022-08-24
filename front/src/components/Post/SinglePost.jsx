import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSinglePost } from "./axiosFunctions";

const SinglePost = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        const id = (new URL(window.location).pathname.split('/posts/')[1])
        fetchSinglePost(id).then((res) => setPost(res))
    }, [])
    const message = post?.message;
    const image = post?.imageUrl;
    const firstName = post.firstName;
    const lastName = post.lastName;
    const posterId = post.posterId;
    const likes = post.likes;
    const comments = post.comments.length;
    return (
        <>
            <Link to={"/posts"}>retour à tous les posts</Link>

            <div className="postContent" key={post._id}>
            <Link to={post._id}>
              <p>
                {firstName} {lastName}
              </p>
              {message === "" ? null : <h3>{message}</h3>}
              <div className="imageWrapper">
                {image === "" ? null : <img src={image} alt={posterId} />}
              </div>
              <div className="actionButtons">
                <div className="likesWrapper">
                  <div className="icon heart">coeur</div>
                  <p>{likes}</p>
                </div>
                <div className="commentsWrapper">
                  <div className="icon comments">comm</div>
                  <p>{comments}</p>
                  
                </div>
              </div>
            </Link>
          </div>
        </>
    );
};

export default SinglePost;
