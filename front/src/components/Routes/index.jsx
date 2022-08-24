import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../../pages/Auth";
import Posts from "../../pages/Posts/index";
import SinglePost from "../Post/SinglePost";

const DefaultRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
        </Routes>
      </Router>
    </div>
  );
};

export default DefaultRoutes;
