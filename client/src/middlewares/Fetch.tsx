import axios from "axios";

const token = localStorage.getItem("token");

export const Fetch = axios.create({
  baseURL: "https://server.rt-motors.com/api/",
  // baseURL: "https://rt-motors.mukammal-crm.uz/api/",
  headers: {
    Authorization: token,
  },
});
