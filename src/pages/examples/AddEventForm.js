import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import EventService from "../../services/event.services";
import { toast } from "react-toastify";

export const AddEventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableTicketNumber, setavailableTicketNumber] = useState(Number);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");

  const startDateTime = new Date(startDate.valueOf()).toLocaleDateString(
    "fr-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );
  const endDateTime = new Date(endDate.valueOf()).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("price", price);
  data.append("availableTicketNumber", availableTicketNumber);
  data.append("address", address);
  data.append("startDateTime", startDateTime);
  data.append("endDateTime", endDateTime);
  data.append("images", image);

  const handleSave = () => {
    EventService.createEvent(data)
      .then((response) => {
        console.log(response.data);
        toast.success("Event created successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        //console.log(name, description, price, startDate.toString(), address);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Event</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your event name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Enter event description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="startDate">
                <Form.Label>Start Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setStartDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          startDate
                            ? moment(startDate).format("DD/MM/YYYY")
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
            <Col md={6} className="mb-3">
              <Form.Group id="endDate">
                <Form.Label>End Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setEndDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          endDate ? moment(endDate).format("DD/MM/YYYY") : ""
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
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="12 €"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="availableTicketNumber">
                <Form.Label>Number of tickets</Form.Label>
                <Form.Control required type="number" placeholder="0" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Select event photo</h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                      <Image fluid rounded src={Profile3} />
                    </div>
                    <div className="file-field">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex">
                          <span className="icon icon-md">
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="me-3"
                            />
                          </span>
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <div className="d-md-block text-start">
                            <div className="fw-normal text-dark mb-1">
                              Choose Image
                            </div>
                            <div className="text-gray small">
                              JPG, GIF or PNG. Max size of 800K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="button" onClick={handleSave}>
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
