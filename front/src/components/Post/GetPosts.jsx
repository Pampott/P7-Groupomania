import React, { useState, useEffect } from "react";
import { fetchPosts } from "./axiosFunctions";
import '../../pages/Posts/index.css'
import Card from "./Card";

const GetPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  //const userObject = JSON.parse(localStorage.getItem("user"))
  //const user = userObject.firstName;
  useEffect(() => {
    fetchPosts(token).then((res) => setPosts(res))
  }, [token])

  return (
    <div id="postsContainer">
      {posts.map((post) => {
        return <Card post={post} key={post._id} />
      })}
    </div>
  );
};

export default GetPosts;
