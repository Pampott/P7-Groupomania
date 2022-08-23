import axios from "axios";

export function getPosts() {
  return new Promise(resolve => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`)
      .then((res) => console.log(res.data))
      .catch(console.error);
  });
}
