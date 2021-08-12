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
import TagService from "../../services/tag.services";
import { toast } from "react-toastify";

export default () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    TagService.createTag({ name, description })
      .then((response) => {
        console.log(response.data);
        toast.success("Tag created successfully!");
        setName("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        //console.log(name, description, price, startDate.toString(), address);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4 ">
            <Card.Body>
              <h5 className="mb-4">Add Tag</h5>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>Tag Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={name}
                        placeholder="Enter your tag name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="description">
                      <Form.Label>Tag Description</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        value={description}
                        placeholder="Enter tag description"
                        onChange={(e) => setDescription(e.target.value)}
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
        </Col>
      </Row>
    </>
  );
};
