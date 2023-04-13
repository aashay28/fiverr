import axios from "axios";

const Request = axios.create({
  baseURL: "http://localhost:8800/api/",
});

export default Request;
