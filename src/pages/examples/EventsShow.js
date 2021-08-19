import React, { useState, useEffect } from "react";
import EventService from "../../services/event.services";
import { Card, Button, Row, Col, Container } from "@themesberg/react-bootstrap";
import { useHistory, Link } from "react-router";

const EventsShow = () => {
  let history = useHistory();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getAllEvents()
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEvent = (id) => {
    history.push(`/events/show/${id}`);
  };

  return (
    <Container className="py-4">
      <h5 className="mb-4">Evénements En ligne</h5>
      <Row className="g-4">
        {events.map((event) => {
          return (
            <Col xs={4} xl={3} key={event._id}>
              <Card
                style={{ cursor: "pointer" }}
                border="light"
                key={event._id}
                className="mb-3"
                onClick={handleEvent.bind(this, event._id)}
              >
                <Card.Img variant="top" src={event.eventImage} />
                <Card.Body>
                  <Card.Title>
                    <Card.Link onClick={handleEvent.bind(this, event._id)}>
                      {event.name}
                    </Card.Link>
                  </Card.Title>
                  <Card.Text>{event.description}</Card.Text>
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
