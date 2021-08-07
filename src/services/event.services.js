import axios from "axios";
import authHeader from "./auth-header";

// get all events
const getAllEvents = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events`,
    headers: authHeader(),
  });
};

// create event
const createEvent = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events`,
    data: payload,
    headers: authHeader(),
  });
};

// get event by id
const getEventById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/${id}`,
    headers: authHeader(),
  });
};

// modify event
const modifyEvent = (payload, id) => {
  return axios({
    method: "put",
    url: `${BASE_URL}/events/${id}`,
    data: payload,
    headers: authHeader(),
  });
};

// delete event
const deleteEvent = (id) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}/events/${id}`,
    headers: authHeader(),
  });
};

// affect author to event
const affectAuthorToEvent = (idEvent, idUser) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/affectAuthorToEvent/${idEvent}/${idUser}`,
    headers: authHeader(),
  });
};

// desAffect author from event
const desAffectAuthorEvent = (idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/desAffectAuthor/${idEvent}`,
    headers: authHeader(),
  });
};

// affect tag to event
const affectTagEvent = (idEvent, idTag) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/affectTagToEvent/${idEvent}/${idTag}`,
    headers: authHeader(),
  });
};

// desAffect tag from event
const desAffectTagEvent = (idEvent, idTag) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/desAffectTag/${idEvent}/${idTag}`,
    headers: authHeader(),
  });
};

// get event with author
const getEventWithAuthor = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getEventWithAuthor/${id}`,
    headers: authHeader(),
  });
};

// get all events with authors
const getAllEventsWithAllAuthor = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getAllEventsWithAuthor`,
    headers: authHeader(),
  });
};

// get event with tags
const getEventWithTags = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getEventWithTags/${id}`,
    headers: authHeader(),
  });
};

// get all events with all tags
const getAllEventsWithAllTags = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getAllEventsWithTags`,
    headers: authHeader(),
  });
};

export default {
  getAllEvents,
  createEvent,
  getEventById,
  modifyEvent,
  deleteEvent,
  affectAuthorToEvent,
  desAffectAuthorEvent,
  affectTagEvent,
  desAffectTagEvent,
  getEventWithAuthor,
  getAllEventsWithAllAuthor,
  getEventWithTags,
  getAllEventsWithAllTags,
};
