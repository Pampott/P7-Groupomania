import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const [file, setFile] = useState("");
  const [value, setValue] = useState("Nouveau post");
  const posterId = localStorage.getItem("userId");
  const statusMessage = document.querySelector(".statusMessage");

  function handleClick(e) {
    //const form = document.getElementById("form");
     value === "Nouveau post"  ? setValue("Fermer") : setValue("Nouveau post");
  
  }
  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(document.getElementById("form"));
    formData.set("posterId", posterId);
    formData.append("image", file);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        statusMessage.textContent += "Post créé !";
      })
      .catch((err) => {
        statusMessage.textContent += `Une erreur est survenue : ${err}`;
      });
  }

  return (
    <>
      <input
        type="button"
        value={value}
        onClick={(e) => handleClick(e)}
      ></input>
      <form
        action=""
        id="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="message">Message :</label>
        <input type="text" name="message" id="message" />
        <br />
        <label htmlFor="image">Insérer une image :</label>
        <input
          type="file"
          src=""
          alt=""
          name="image"
          id="image"
          onChange={(e) => setFile(e.target.files[0].name)}
        />
        <br />
        <input className="form-btn" type="submit" value="publier" />
        <div className="statusMessage"></div>
      </form>
    </>
  );
};

export default CreatePost;
