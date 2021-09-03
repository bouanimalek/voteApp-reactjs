import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get all subjects
const getAllSubjects = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/subjects`,
  });
};

// get subject by id
const getSubjectById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/subjects/${id}`,
  });
};

// create subject
const createSubject = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/subjects`,
    data: payload,
  });
};

export default {
  getAllSubjects,
  getSubjectById,
  createSubject,
};
