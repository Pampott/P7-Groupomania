import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const [file, setFile] = useState("")
  const posterId = localStorage.getItem("userId");

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(document.getElementById("form"));
    formData.set('posterId', posterId)
    formData.append('image', file)
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <form
        action=""
        id="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Créer un nouveau post ?</h1>
        <label htmlFor="message">Message :</label>
        <input type="text" name="message" id="message" />
        <br />
        <label htmlFor="image">Insérer une image :</label>
        <input type="file" src="" alt="" name="image" id="image" onChange={(e) => setFile(e.target.files[0].name)}/>
        <br />
        <input className="form-btn" type="submit" value="publier" />
      </form>
    </>
  );
};

export default CreatePost;
