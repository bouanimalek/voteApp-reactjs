import axios from "axios";
import authHeader from "./auth-header";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get all users
const getAllUsers = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/users`,
    headers: authHeader(),
  });
};

// get user by id
const getUserById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/users/${id}`,
    headers: authHeader(),
  });
};

// modify user
const modifyUser = (payload, id) => {
  return axios({
    method: "put",
    url: `${BASE_URL}/users/${id}`,
    data: payload,
    headers: authHeader(),
  });
};

// delete user
const deleteUser = (id) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}/users/${id}`,
    headers: authHeader(),
  });
};

// affect event to user
const affectEventToUser = (idUser, idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/users/affectEventToUser/${idUser}/${idEvent}`,
    headers: authHeader(),
  });
};

// desAffect event from user
const desAffectEventFromUser = (idUser, idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/users/desAffectEvent/${idUser}/${idEvent}`,
    headers: authHeader(),
  });
};

// get user with all events
const getUserWithAllEvents = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/userWithEvents/${id}`,
    headers: authHeader(),
  });
};

// get all users with all events
const getAllUsersWithAllEvents = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/usersWithEvents`,
    headers: authHeader(),
  });
};

//
const getAuthenticatedUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded) {
      return decoded.userId;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const validate = (token) => {
  const decoded = jwt_decode(token);
  if (decoded) {
    const currentDate = Date.now();
    const tokenDate = decoded.exp;
    if (tokenDate <= currentDate) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return validate(token);
  } else {
    return false;
  }
};
export default {
  getAllUsers,
  getUserById,
  modifyUser,
  deleteUser,
  affectEventToUser,
  desAffectEventFromUser,
  getUserWithAllEvents,
  getAllUsersWithAllEvents,
  getAuthenticatedUserId,
  isAuthenticated,
};
