import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import EventService from "../../services/event.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { Fragment } from "react";
import Swal from "sweetalert2";

export default (props) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    EventService.getAllEvents()
      .then((response) => {
        setEvents(response.data);
        //console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete the Event?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        EventService.deleteEvent(id)
          .then((response) => {
            //console.log(response);
            Swal.fire("Event Deleted!", "", "success");
            setEvents(events);
            refreshList();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Internal server error");
          });
      }
    });
  };

  const handleEdit = (id) => {
    props.history.push(`/events/edit/${id}`);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <h5 className="mb-4">List Tags</h5>
              <Table
                responsive
                className="table-centered table-nowrap rounded mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">Name</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    return (
                      <Fragment key={event._id}>
                        <tr>
                          <td>{event.name}</td>
                          <td>{event.description}</td>
                          <td>
                            {" "}
                            <Button
                              variant="info"
                              type="button"
                              size="sm"
                              className="me-1"
                              onClick={handleEdit.bind(this, event._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="primary"
                              type="button"
                              size="sm"
                              onClick={handleDelete.bind(this, event._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
