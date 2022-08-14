import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const posterId = localStorage.getItem('posterId')

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}api/posts`, {
        posterId: posterId,
        message: message,
        imageUrl: imageUrl
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err))
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="id-container">
        <p id="userId"></p>
      </div>
      <br />
      <label htmlFor="message">Message</label>
      <input
        type="text"
        name="message"
        id="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <label htmlFor="image">Insérer une image</label>
      <input
        type="file"
        src=""
        alt=""
        name="image"
        id="image"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br />
      <input type="submit" value="Créer ce post" />
    </form>
  );
};

export default CreatePost;
