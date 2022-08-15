import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const posterId = localStorage.getItem("posterId");
  const [isActive, setIsActive] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, {
        posterId: posterId,
        message: message,
        imageUrl: imageUrl,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  class Button extends React.Component {
    render() {
      return (
        <input
          type="button"
          onClick={(e) => {
            e.currentTarget.classList.toggle("active");
            e.currentTarget.classList.contains("active")
              ? setIsActive(true)
              : setIsActive(false)
          }}
          value={this.props.value}
        />
      );
    }
  }

  return (
    <>
      <Button value={isActive ? "Fermer" : "Créer un post"} />
      <form action="" onSubmit={handleSubmit} id="form">
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
          onChange={(e) => setImageUrl(e.target.src)}
        />
        <br />
        <input type="submit" value="Soumettre" />
        <input type="button" value="Fermer" />
      </form>
    </>
  );
};

export default CreatePost;
