import React, { useEffect, useState, Fragment } from "react";
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
  const [role, setRoleName] = useState("");
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

  const handleUserRole = (e) => {
    setLastName(e.target.value);
  };
  const handleReset = () => {
    UserService.modifyUser({ user }, idUser)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <h5 className="mb-4">User</h5>
              <Form>
                <Form.Group id="firstName" className="mb-4">
                  <Form.Label>FirstName</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      value={user ? user.firstname : ""}
                      onChange={handleFirstName}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>
                <Form.Group id="lastName" className="mb-4">
                  <Form.Label>Last Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={user ? user.lastname : ""}
                      onChange={handleLastName}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>
                <Form.Group id="role" className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={user ? user.role : ""}
                      onChange={handleUserRole}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="primary mb-1"
                  type="button"
                  className="w-100"
                  onClick={handleReset}
                >
                  Save
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  className="w-100"
                  onClick={() => props.history.push("/users")}
                >
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
