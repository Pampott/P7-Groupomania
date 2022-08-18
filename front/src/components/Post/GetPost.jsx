import React from "react";
import axios from "axios";
import heart from "../../assets/heart.png";
import pencil from "../../assets/pencil.png";
import imageDefault from "../../assets/img-default.jpg";
import "../../pages/Posts/style/index.css";

const GetPost = () => {
  //Récupération des données de l'API avec axios
  axios
    .get(`${process.env.REACT_APP_API_URL}api/posts`)
    .then((res) => {
      const posts = res.data;
      //Pour chaque post, création d'un "composant"
      for (let post of posts) {
        document.getElementById("content-container").innerHTML += `
        <div class="post-container">
        <div class="img-container">
          <img id="data-image" src=${imageDefault} alt="" />
        </div>
        <div class="message-container">
          <p id="data-message"></p>
        </div>
        <div class="action-container">
          <div class="likes-number">
            <img class="heart icon" src=${heart} alt="icone pour les mentions j'aime"/>
            <p id="numberOfLikes">0</p>
          </div>

          <div class="comments-number">
            <img class="pencil icon" src=${pencil} alt="icone pour les commentaires" />
            <p id="numberOfComments">0</p>
          </div>
        </div>
        <div class="btn-comments">
              <input type="button" value="Ecrire..." />
        </div>
        <div class="comments-container">commentaires dynamiques</div>
      </div>
        `;
        //Si pas de message, efface la div message
        document.getElementById("data-message").innerText += post.message;

        //Si pas d'image, efface la div image
        //document.getElementById("data-image").textContent += post.imageUrl;

        //document.getElementById("numberOfLikes").innerHTML = post.likes;
        let comments = document.getElementById("numberOfComments");
        post.comments === []
          ? (comments.innerText = 0)
          : (comments.innerText = post.comments);
      }
    })

    .catch((err) => console.log(err));
  return <div id="content-container"></div>;
};

export default GetPost;
