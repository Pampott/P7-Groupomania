import React, { useEffect } from "react";
import { getPosts } from "./axiosFunctions";

const GetPosts = () => {
    useEffect(() => {
        getPosts()
    }, [])
  return <div></div>;
};

export default GetPosts;
