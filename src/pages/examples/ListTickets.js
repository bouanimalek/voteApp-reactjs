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
import TicketService from "../../services/ticket.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { Fragment } from "react";
import Swal from "sweetalert2";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

export default (props) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    TicketService.getAllTickets()
      .then((response) => {
        setTickets(response.data);
        //console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete the Ticket?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        TicketService.deleteTicketById(id)
          .then((response) => {
            //console.log(response);
            Swal.fire("Ticket Deleted!", "", "success");
            setTickets(tickets);
            refreshList();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Internal server error");
          });
      }
    });
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <h5 className="mb-4">List Tickets</h5>
              <Table
                responsive
                className="table-centered table-nowrap rounded mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="border-0 text-center">Owner</th>
                    <th className="border-0">Event</th>
                    <th className="border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => {
                    return (
                      <Fragment key={ticket._id}>
                        <tr>
                          <td>
                            {ticket.owner
                              ? ticket.owner.firstname +
                                " " +
                                ticket.owner.lastname
                              : ""}{" "}
                          </td>
                          <td>{ticket.event ? ticket.event.name : ""}</td>
                          <td>
                            <Button
                              variant="primary"
                              type="button"
                              size="sm"
                              onClick={handleDelete.bind(this, ticket._id)}
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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl="http://localhost:4000/public/tickets_pdf/610e8b05378b0326d8266ece.pdf" />
        </Worker>
      </Row>
    </>
  );
};
