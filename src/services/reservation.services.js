import axios from "axios";

// create reservation
const createReservation = (idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/reservation/${idEvent}`,
  });
};

export default createReservation;
