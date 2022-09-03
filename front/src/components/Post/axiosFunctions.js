import axios from "axios";

export function fetchPosts(token) {
  return new Promise((resolve) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}

export function like(id, like, token) {
  return new Promise((resolve) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/posts/${id}/like`, like, 
        {
          headers: {
            Authorization : "Bearer " + token
          }
        })
      .then((res) => {return res})
      .then(resolve)
      .catch(console.error);
  });
}

export function deletePost(id, token) {
  return new Promise((resolve) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " +  token,
        },
      })
      .then((res) => res.status)
      .then(resolve)
      .catch(console.error);
  });
}

export function modifyPost(id, data, token) {
  return new Promise((resolve) => {
    axios
      .putForm(`${process.env.REACT_APP_API_URL}api/posts/${id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {return res})
      .then(resolve)
      .catch(console.error);
  });
}