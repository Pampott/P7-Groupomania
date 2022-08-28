import axios from "axios";
import React, { useState } from "react";
import { StyledInput } from "../../styles/Atoms";

const CreatePost = () => {
  const [file, setFile] = useState("");
  const user = localStorage.getItem("user");
  let userObject = JSON.parse(user)


  const statusMessage = document.querySelector(".statusMessage");

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(document.getElementById("form"));
    formData.set("posterId", userObject.id);
    formData.set("firstName", userObject.firstName);
    formData.set("lastName", userObject.lastName);
    //formData.set("timestamp", new Date.now())
    formData.append("image", file);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setTimeout(() => {
          statusMessage.innerHTML = "Post créé !"
        }, 800);
        setTimeout(() => { window.location.reload(); }, 1000)
      })
      .catch((err) => {
        statusMessage.innerHTML = `Une erreur est survenue : ${err}`;
      });
  }

  return (
    <>
      <form
        action=""
        id="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="inputs-wrapper">
          <label htmlFor="message" className="label">Message :</label>
          <input type="text" name="message" id="message" />
          <br />
          <label htmlFor="image" className="label">Insérer une image :
            <input
              type="file"
              src=""
              alt=""
              name="image"
              id="image"
              onChange={(e) => setFile(e.target.files[0].name)}
            />
          </label>

        </div>
        <br />
        <StyledInput className="form-btn" type="submit" value="publier" />
        <div className="statusMessage"></div>
      </form>
    </>
  );
};

export default CreatePost;
