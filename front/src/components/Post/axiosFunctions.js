import axios from "axios";

export function fetchPosts() {
  return new Promise((resolve) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`)
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}

export function fetchSinglePost(id) {
  return new Promise((resolve) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts/${id}`)
      .then((res) => res.data)
      .then(resolve)
      .catch(console.error);
  });
}
