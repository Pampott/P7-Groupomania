import axios from "axios";
import React, { useState } from "react";
import "../../pages/Posts/style/index.css";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [imageUrl] = useState("");
  const posterId = localStorage.getItem("userId");

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/posts`,
        {
          posterId: posterId,
          message: message,
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      
      <form action="" id="form" onSubmit={handleSubmit} >
        <h1>Créer un nouveau post ?</h1>
        <label htmlFor="message">Message :</label>
        <input
          type="text"
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <label htmlFor="image">Insérer une image :</label>
        <input
          type="file"
          src=""
          alt=""
          name="image"
          id="image"
        />
        <br />
        <input
        className="form-btn"
        type="button"
        value="publier"
      />
      </form>
    </>
  );
};

export default CreatePost;
