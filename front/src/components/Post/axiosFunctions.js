import axios from "axios";

export function fetchPosts(token) {
  return new Promise((resolve) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`, {
        headers: {
          Authorization : "Bearer " + token
        }
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}

export function postLike(id, user, token) {
  return new Promise((resolve) => {
    axios.post(`${process.env.REACT_APP_API_URL}api/posts/${id}/like`, {userId : user}, {
      headers: {
        Authorization : "Bearer " + token
      },
      auth : {userId: localStorage.getItem("userId")}
    })
    .then((res) => res.status)
    .then(resolve)
    .catch(console.error)
  })
}
