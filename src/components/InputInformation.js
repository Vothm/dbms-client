import React, { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ReactiveButton from "reactive-button";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faThumbsUp,
  faBomb,
} from "@fortawesome/free-solid-svg-icons";

const InputInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [datePicker, setDatePicker] = useState("");
  const [reactiveButton, setReactiveButton] = useState("idle");

  const onSubmitForm = async (e) => {
    console.log("Submit form...");
    e.preventDefault();
    let getAge = (dateString) => {
      let today = new Date();
      let birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    if (datePicker !== "") {
      const formattedDate = `${datePicker.getMonth() +
        1}/${datePicker.getDate()}/${datePicker.getFullYear()}`;
      console.log(firstName, lastName, address, phone, email, formattedDate);
      if (getAge(formattedDate) <= 1) {
        setReactiveButton("error");
        return;
      }
    } else {
      setReactiveButton("error");
      return;
    }

    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      phone === "" ||
      email === "" ||
      datePicker === ""
    ) {
      setReactiveButton("error");
      return;
    }

    try {
      setReactiveButton("loading");
      // const response = await fetch("http://localhost:5000/api/getAllLeads", {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // });

      // setReactiveButton("success");
    } catch (err) {
      console.log(err);
      setReactiveButton("error");
      setTimeout(() => {
        setReactiveButton("idle");
      }, 2000);
    }

    return;
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Input Information</h1>
      <div className="container">
        <div className="d-flex justify-content-center">
          <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <div className="d-flex flex-column center">
              <div className="float-container">
                <div className="float-child">
                  <input
                    type="text"
                    className="form-control margin-bottom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onClick={() => setFirstName("")}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    className="form-control margin-bottom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onClick={() => setLastName("")}
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    className="form-control margin-bottom"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onClick={() => setAddress("")}
                    placeholder="Address"
                  />
                </div>
                <div className="float-child">
                  <input
                    type="text"
                    className="form-control margin-bottom"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onClick={() => setPhone("")}
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    className="form-control margin-bottom"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onClick={() => setEmail("")}
                    placeholder="Email"
                  />
                  <DatePicker
                    className="form-control margin-bottom"
                    selected={datePicker}
                    onChange={(date) => setDatePicker(date)}
                    scrollableYearDropdown
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={100}
                    placeholderText="Date of Birth"
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <ReactiveButton
                buttonState={reactiveButton}
                color={"primary"}
                idleText={"Submit"}
                loadingText={
                  <Fragment>
                    <FontAwesomeIcon icon={faCircleNotch} spin /> Loading
                  </Fragment>
                }
                successText={
                  <Fragment>
                    <FontAwesomeIcon icon={faThumbsUp} /> Successfully
                    Registered!
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
                width={null}
                height={null}
                animation={true}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default InputInformation;
