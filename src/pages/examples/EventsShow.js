import React, { useState, useEffect } from "react";
import SubjectService from "../../services/subject.services";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Badge,
} from "@themesberg/react-bootstrap";
import { useHistory, Link } from "react-router";
import moment from "moment";
import "../../../src/test.css";
import image from "../../assets/img/vote.jpg";

const EventsShow = () => {
  let history = useHistory();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    SubjectService.getAllSubjects()
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEvent = (id) => {
    history.push(`/subjects/show/${id}`);
  };

  return (
    <Container className="py-4">
      <h5 className="mb-4">Les Sujets</h5>
      <Row className="g-4">
        {subjects.map((subject) => {
          return (
            <Col xs={4} xl={3} key={subject._id}>
              <Card
                style={{ cursor: "pointer" }}
                border="light"
                key={subject._id}
                onClick={handleEvent.bind(this, subject._id)}
                className="test"
              >
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title>
                    <Card.Link onClick={handleEvent.bind(this, subject._id)}>
                      {subject.title}
                    </Card.Link>
                  </Card.Title>
                  <Card.Text>{subject.description}</Card.Text>

                  <Card.Text>Yes Votes: {subject.vote.yesVote}</Card.Text>
                  <Card.Text>No Votes: {subject.vote.noVote}</Card.Text>
                  {/* <Button
                    variant="primary"
                    onClick={handleEvent.bind(this, event._id)}
                  >
                    Go somewhere
                  </Button> */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default EventsShow;
