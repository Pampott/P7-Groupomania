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

export function postLike(id, user, token) {
  return new Promise((resolve) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/posts/${id}/like`,
        { userId: user },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          auth: { userId: localStorage.getItem("userId") },
        }
      )
      .then((res) => res.status)
      .then(resolve)
      .catch(console.error);
  });
}

export function deletePost(id, token) {
  return new Promise((resolve) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/posts/${id}`, {
        headers: {
          Authorization: token,
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
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}

export function comment(id, data, token) {
  return new Promise((resolve) => {
    axios
      .post(`{process.env.REACT_APP_API_URL}api/posts/${id}/comment`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}

export function editComment(id, data, token) {
  return new Promise((resolve) => {
    axios
      .patch(`{process.env.REACT_APP_API_URL}api/posts/${id}/comment`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}

export function deleteComment(id, token) {
  return new Promise((resolve) => {
    axios
      .delete(`{process.env.REACT_APP_API_URL}api/posts/${id}/comment`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}
