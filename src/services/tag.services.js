import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get all tags
const getAllTags = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/tags`,
    headers: authHeader(),
  });
};

// get tag by id
const getTagById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/tags/${id}`,
    headers: authHeader(),
  });
};

// create tag
const createTag = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/tags`,
    data: payload,
    headers: authHeader(),
  });
};

// modify tag
const modifyTag = (payload, id) => {
  return axios({
    method: "put",
    url: `${BASE_URL}/tags/${id}`,
    data: payload,
    headers: authHeader(),
  });
};

// delete tag
const deleteTag = (id) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}/tags/${id}`,
    headers: authHeader(),
  });
};

export default {
  getAllTags,
  getTagById,
  createTag,
  modifyTag,
  deleteTag,
};
