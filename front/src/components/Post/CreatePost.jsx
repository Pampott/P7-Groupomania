import axios from "axios";
import React, { useState } from "react";
import { StyledInput } from "../../styles/Atoms";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [imageUrl] = useState("");
  const posterId = localStorage.getItem("userId");
  const [isActive, setIsActive] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, {
        posterId: posterId,
        message: message,
        imageUrl: imageUrl,
      }, {
        headers: {
          "Authorization" : token
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  class ButtonToggle extends React.Component {
    render() {
      return (
        <input
          type="button"
          onClick={(e) => {
            e.currentTarget.classList.toggle("active")
            e.currentTarget.classList.contains("active")
              ? setIsActive(true)
              : setIsActive(false)
          }
        }
          value={this.props.value}
        />
      );
    }
  }

  return (
    <>
      <ButtonToggle value={isActive ? "Fermer" : "Créer un post"}/>
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
          src="back\images\image.jpg"
          alt=""
          name="image"
          id="image"
        />
        <br />
        <StyledInput type="submit" value="Soumettre"/>
      </form>
    </>
  );
};

export default CreatePost;
