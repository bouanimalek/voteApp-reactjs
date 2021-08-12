import axios from "axios";
import authHeader from "./auth-header";

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

export default {
  getAllUsers,
  getUserById,
  modifyUser,
  deleteUser,
  affectEventToUser,
  desAffectEventFromUser,
  getUserWithAllEvents,
  getAllUsersWithAllEvents,
};
