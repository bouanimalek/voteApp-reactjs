import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// add yesVote
const addYesVote = (id) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/votes/addYesVote/${id}`,
  });
};

// get vote by user
const getVoteByUser = (id, subjectId) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/votes/getVoteByUser/${id}/${subjectId}`,
  });
};

export default {
  addYesVote,
  getVoteByUser,
};
