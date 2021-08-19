import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  Container,
} from "@themesberg/react-bootstrap";
import EventService from "../../services/event.services";

const EventShowDetails = () => {
  const { idEvent } = useParams();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    EventService.getEventById(idEvent)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="py-4">
      <Row>
        <Col xl={8}>
          <Image src={event.eventImage} className="img-fluid rounded" />
        </Col>
        <Col xl={4} className="d-flex align-items-stretch">
          <Card border="light" key={event._id} className="d-flex flex-column">
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                {event.name}
              </Card.Title>
              <Card.Text className="d-flex justify-content-center">
                {event.description}
              </Card.Text>
              <Button variant="primary ">Make reservation</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventShowDetails;
