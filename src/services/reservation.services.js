import axios from "axios";
import authHeader from "./auth-header";

// create reservation
const createReservation = (idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/reservation/${idEvent}`,
    headers: authHeader(),
  });
};

export default createReservation;
