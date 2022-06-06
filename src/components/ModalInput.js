import React, { Fragment, useState } from "react";
import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import ReactiveButton from "reactive-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faThumbsUp,
  faBomb,
} from "@fortawesome/free-solid-svg-icons";
import { formatPhoneNumber, checkString } from "../Utility/util.js";

const ModalInput = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    handleSubmit();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [youth, setYouth] = useState("");
  const [leadManagerId, setLeadManagerId] = useState(null);
  const [referredBy, setReferredBy] = useState(null);
  const [joinGym, setJoinGym] = useState(null);
  const [classRegistration, setClassRegistration] = useState(0);
  const [notes, setNotes] = useState("");
  const [reactiveButton, setReactiveButton] = useState("idle");
  const [youthButton, setYouthButton] = useState("Youth?");
  const [joinGymButtom, setJoinGymButtom] = useState("Join Gym?");

  const handleSubmit = async () => {
    // Submit the form

    let phoneNumber = formatPhoneNumber(phone);

    if (
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      email === "" ||
      youth === "" ||
      phoneNumber === null ||
      !checkString(firstName) ||
      !checkString(lastName)
    ) {
      setReactiveButton("error");
      setTimeout(() => {
        setReactiveButton("idle");
      }, 2000);
      return false;
    }

    try {
      setReactiveButton("loading");

      const response = await fetch("http://dbmserver.vonce.me/api/newLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          // address: address,
          email: email,
          youth: youth,
          leadManagerID: leadManagerId,
          referredBy: referredBy,
          joinGym: joinGym,
          classRegistration: classRegistration,
          notes: notes,
        }),
      });
      if (response.status === 200) {
        console.log("success");
        setReactiveButton("success");
        setTimeout(() => {
          setReactiveButton("idle");
        }, 2000);
        return true;
      }
    } catch (error) {
      console.error(error);
      setReactiveButton("error");
      setTimeout(() => {
        setReactiveButton("idle");
      }, 2000);
      return false;
    }
  };

  return (
    <Fragment>
      <Button variant="success" onClick={handleShow}>
        Add a new Lead
      </Button>
      <Modal className="my-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Phone Number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email*</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Youth*</Form.Label>
              <DropdownButton title={youthButton} id="input-group-dropdown-2">
                <Dropdown.Item
                  onClick={() => {
                    setYouthButton("Youth");
                    setYouth(true);
                  }}
                >
                  Youth
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setYouthButton("Not Youth");
                    setYouth(false);
                  }}
                >
                  Not Youth
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group>
              <Form.Label>Lead Manager ID</Form.Label>
              <Form.Control
                onChange={(e) => setLeadManagerId(e.target.value)}
                type="text"
                placeholder="Lead Manager ID"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Referred By</Form.Label>
              <Form.Control
                onChange={(e) => setReferredBy(e.target.value)}
                type="text"
                placeholder="Referred By"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Class Registration*</Form.Label>
              <Form.Control
                defaultValue={0}
                type="text"
                placeholder="Class Registration"
                onChange={(e) => setClassRegistration(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                onChange={(e) => setNotes(e.target.value)}
                type="text"
                placeholder="Notes"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Join Gym</Form.Label>
              <DropdownButton title={joinGymButtom} id="input-group-dropdown-3">
                <Dropdown.Item
                  onClick={() => {
                    setJoinGymButtom("Joininig Gym");
                    setJoinGym(true);
                  }}
                >
                  Join Gym
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setJoinGymButtom("Not Joining Gym");
                    setJoinGym(false);
                  }}
                >
                  Not Joining Gym
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ReactiveButton
            buttonState={reactiveButton}
            color={"primary"}
            idleText={"Add a lead"}
            loadingText={
              <Fragment>
                <FontAwesomeIcon icon={faCircleNotch} spin /> Loading
              </Fragment>
            }
            successText={
              <Fragment>
                <FontAwesomeIcon icon={faThumbsUp} /> Successfully Registered!
              </Fragment>
            }
            errorText={
              <Fragment>
                <FontAwesomeIcon icon={faBomb} /> Error
              </Fragment>
            }
            type={"submit"}
            style={{ borderRadius: "5px" }}
            outline={false}
            shadow={true}
            rounded={true}
            size={"normal"}
            block={false}
            messageDuration={2000}
            disabled={false}
            buttonRef={null}
            width={"100%"}
            height={null}
            animation={true}
            onClick={handleSubmit}
          />
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default ModalInput;
