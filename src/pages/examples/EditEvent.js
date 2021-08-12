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
import EventService from "../../services/event.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { useParams } from "react-router-dom";

export default (props) => {
  const [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [description, setDescriprion] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(Number);
  const [availableTicketNumber, setAvailableTicketNumber] = useState(Number);
  const { idEvent } = useParams();

  useEffect(() => {
    EventService.getEventById(idEvent)
      .then((response) => {
        setEvent(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriprion(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleAvailableTicketNumber = (e) => {
    setAvailableTicketNumber(e.target.value);
  };

  const handleReset = () => {
    EventService.modifyEvent(event, idEvent)
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
              <h5 className="mb-4">Event</h5>
              <Form>
                <Form.Group id="name" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      value={event ? event.name : ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>
                <Form.Group id="description" className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={event ? event.description : ""}
                      onChange={handleDescription}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>
                <Form.Group id="location" className="mb-4">
                  <Form.Label>Location</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={event ? event.location : ""}
                      onChange={handleLocation}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>

                <Form.Group id="price" className="mb-4">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="number"
                      placeholder=""
                      value={event ? event.price : ""}
                      onChange={handlePrice}
                    />
                    <div className="text-start w-100 invalid-feedback d-block">
                      {}
                      {}
                    </div>
                  </InputGroup>
                </Form.Group>

                <Form.Group id="availableTicketNumber" className="mb-4">
                  <Form.Label>Available Ticket</Form.Label>
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      required
                      type="number"
                      placeholder=""
                      value={event ? event.availableTicketNumber : ""}
                      onChange={handleAvailableTicketNumber}
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
                  onClick={() => props.history.push("/events")}
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
