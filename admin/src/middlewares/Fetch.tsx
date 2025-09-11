import axios from "axios";

const token = localStorage.getItem("token");

export const Fetch = axios.create({
  // baseURL: "https://rt-motors.mukammal-crm.uz/api/",
    baseURL: "https://server.rt-motors.com/api/",
  headers: {
    Authorization: token,
  },
});
