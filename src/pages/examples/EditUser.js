import React, { useEffect, useState, Fragment } from "react";
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faPaperclip,
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import UserService from "../../services/user.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { useParams } from "react-router-dom";

export default (props) => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [phoneRequired, setPhoneRequired] = useState("");
  const [emailRequired, setEmailRequired] = useState("");
  const [addressRequired, setAddressRequired] = useState("");
  const [role, setRole] = useState("");
  const { idUser } = useParams();

  useEffect(() => {
    UserService.getUserById(idUser)
      .then((response) => {
        setUser(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFirstName = (e) => {
    const namee = e.target.value;
    setFirstName(namee);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUserRole = (e) => {
    setRole(e.target.value);
  };

  const birthdayDate = new Date(birthday.valueOf()).toLocaleDateString(
    "fr-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "numeric",
      // minute: "numeric",
    }
  );

  const authUserRole = UserService.getAuthenticatedUserRole();

  const validate = () => {
    let isValidForm = false;
    if (!firstName) {
      setFirstNameRequired("Firstname is required!");
    } else {
      setFirstNameRequired(null);
    }
    if (!lastName) {
      setLastNameRequired("Lastname is required!");
    } else {
      setLastNameRequired(null);
    }
    if (!phone) {
      setPhoneRequired("Phone is required!");
    } else {
      setPhoneRequired(null);
    }
    if (!email) {
      setEmailRequired("Email is required!");
    } else {
      setEmailRequired(null);
    }
    if (!address) {
      setAddressRequired("Address is required!");
    } else {
      setAddressRequired(null);
    }
    if (firstName && lastName && phone && email && address) {
      isValidForm = true;
    }
    return isValidForm;
  };
  const handleReset = () => {
    const userData = new FormData();
    userData.append("firstname", firstName);
    userData.append("lastname", lastName);
    userData.append("phone", phone);
    userData.append("email", email);
    userData.append("address", address);
    userData.append("birthDate", birthdayDate);
    if (authUserRole === "admin") {
      userData.append("role", role);
    }
    if (password !== "") {
      userData.append("password", password);
    }

    UserService.modifyUser(userData, idUser)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Row>
      <Col xs={12} xl={12}>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">General information</h5>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter your first name"
                      value={user ? user.firstname : ""}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {firstNameRequired}
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Also your last name"
                      value={user ? user.lastname : ""}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {lastNameRequired}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="mb-3">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="name@company.com"
                      value={user.email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {emailRequired}
                    </div>
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      value=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <Form.Group id="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="+12-345 678 910"
                      value={user ? user.phone : ""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {phoneRequired}
                    </div>
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group id="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      disabled={authUserRole === "admin" ? false : true}
                      defaultValue={user ? user.role : ""}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user" selected>
                        User
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={6} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Enter your home address"
                      value={user ? user.address : ""}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {addressRequired}
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Datetime
                      timeFormat={false}
                      onChange={setBirthday}
                      renderInput={(props, openCalendar) => (
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            required
                            type="text"
                            value={
                              birthday
                                ? moment(birthday).format("DD/MM/YYYY")
                                : ""
                            }
                            placeholder="dd/mm/yyyy"
                            onFocus={openCalendar}
                            onChange={() => {}}
                          />
                        </InputGroup>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="mt-3">
                <Button variant="primary" type="button" onClick={handleReset}>
                  Save All
                </Button>
                <Button
                  variant="primary ms-1"
                  type="button"
                  onClick={() => props.history.push("/users")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
