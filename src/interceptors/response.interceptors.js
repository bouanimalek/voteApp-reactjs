import axios from "axios";

const createResponseInterceptor = (history) => {
  axios.interceptors.response.use(
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
        window.location.replace("http://localhost:3000/#/examples/404");
        //history.push("/examples/404");
      }
      if (error.response.status === 500) {
        // server error
        window.location.replace("http://localhost:3000/#/examples/500");
        //  history.push("/#/examples/500");
      }
      return Promise.reject(error);
    }
  );
};

export default createResponseInterceptor;
