import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

const instance = axios.create({
  baseURL: baseUrl + "/public",
});

export default instance;
