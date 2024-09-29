import axios from "axios";

export const editorRequest = axios.create({
  baseURL: "http://localhost:8080/api",
});
