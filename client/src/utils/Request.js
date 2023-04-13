import axios from "axios";
// const baseURL = "http://localhost:8800/api/";
const baseURL = "http://192.168.100.42:8800/api/";
const Request = axios.create({
  baseURL: baseURL,
});

export default Request;
