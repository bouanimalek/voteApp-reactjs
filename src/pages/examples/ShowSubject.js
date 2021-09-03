import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  Container,
  Spinner,
  ProgressBar,
} from "@themesberg/react-bootstrap";
import { CounterWidget, CircleChartWidget } from "../../components/Widgets";
import SubjectService from "../../services/subject.services";
import VoteService from "../../services/vote.services";
import UserService from "../../services/user.services";
import { toast } from "react-toastify";
import { faYenSign, faNotEqual } from "@fortawesome/free-solid-svg-icons";

const EventShowDetails = () => {
  const { idSubject } = useParams();
  const [subject, setSubject] = useState([]);
  const [voted, setVoted] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const userId = UserService.getAuthenticatedUserId();
    SubjectService.getSubjectById(idSubject)
      .then((response) => {
        console.log(response.data);
        setSubject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    VoteService.getVoteByUser(userId, idSubject)
      .then((response) => {
        console.log(response.data);
        setVoted(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const trafficShares = [
    {
      id: 1,
      label: "Yes",
      value: subject.vote ? subject.vote.yesVote : null,
      color: "tertiary",
      icon: faYenSign,
    },
    {
      id: 2,
      label: "No",
      value: subject.vote ? subject.vote.noVote : null,
      color: "secondary",
      icon: faNotEqual,
    },
  ];

  const handleAddYesVote = (id) => {
    VoteService.addYesVote(id)
      .then((response) => {
        console.log(response.data);
        toast.success("Vote submitted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.danger("Error!");
      });
  };
  return (
    <Container className="py-4">
      <Row>
        <Col xl={12}>
          <h2>Subject Title</h2>
          <br></br>
          {subject.title}
        </Col>
        <Col xl={12} className="py-4">
          <h2>Description:</h2>
          {subject.description}
        </Col>
        <Col xs={12} sm={6} xl={12} className="mb-4">
          <CircleChartWidget title="Votes" data={trafficShares} />
        </Col>
        <Col xl={8} className="py-4">
          <ProgressBar
            variant="success"
            now={subject.vote ? subject.vote.yesVote : null}
          />
          <ProgressBar
            variant="danger"
            now={subject.vote ? subject.vote.noVote : null}
          />
        </Col>
        <Button
          variant="success"
          className="mb-1"
          onClick={handleAddYesVote.bind(this, subject._id)}
          disabled={voted === true ? true : false}
        >
          Yes
        </Button>
        <Button variant="danger" disabled={voted === true ? true : false}>
          No
        </Button>
      </Row>
    </Container>
  );
};

export default EventShowDetails;
