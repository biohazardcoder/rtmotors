import axios from "axios";

const token = localStorage.getItem("token");

export const Fetch = axios.create({
  // baseURL: "http://localhost:4000/api/",
    baseURL: "https://server.rt-motors.com/api/",
  headers: {
    Authorization: token,
  },
});
