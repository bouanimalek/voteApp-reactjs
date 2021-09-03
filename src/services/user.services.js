import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get user by id
const getUserById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/users/${id}`,
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

const getAuthenticatedUserRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded) {
      return decoded.role;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const getAuthenticatedUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded) {
      return decoded;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export default {
  getUserById,
  getAuthenticatedUserId,
  isAuthenticated,
  getAuthenticatedUserRole,
  getAuthenticatedUser,
};
