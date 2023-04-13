import axios from "axios";

const newRequest = (token) =>
  axios.create({
    baseURL: "http://localhost:8800/api/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

export default newRequest;
