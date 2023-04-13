import axios from "axios";
// const baseURL = "http://localhost:8800/api/";
const baseURL = "http://192.168.100.42:8800/api/";
const newRequest = (token) =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

export default newRequest;
