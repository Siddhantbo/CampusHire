import axios from "axios";

const API = axios.create({
  baseURL: " http://localhost:3000/api/auth", //backend url
 });

/*const API = axios.create({
  baseURL: "https://college-placement-management-backend-yyv6.onrender.com/api/auth", //backend url
});
*/
//Add token to request headers
API.interceptors.request.use((config) => {
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("userData")) || JSON.parse(localStorage.getItem("companyData"));
  } catch (e) {
    console.error("Error parsing user data from localStorage", e);
  }
  const token = userData?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
