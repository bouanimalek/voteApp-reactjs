import axios from "axios";
import { history } from "../index";

const responseInterceptor = axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //console.log(error);
    console.log(error);
    if (error.response.status === 401) {
      // unauthorized
      history.push("/sign-in");
    }
    if (error.response.status === 404) {
      // not found
      history.push("/404");
    }
    if (error.response.status === 500) {
      // server error
      history.push("/500");
    }
    return Promise.reject(error);
  }
);

export default responseInterceptor;
