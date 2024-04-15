import axios from "axios";

export const SERVER_URL="http://localhost:8080/";

export const apiRequest = axios.create({
  baseURL: SERVER_URL+"api/",
});
