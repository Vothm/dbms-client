import React, { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import ReactiveButton from "reactive-button";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faThumbsUp,
  faBomb,
} from "@fortawesome/free-solid-svg-icons";
import { formatPhoneNumber, getAge } from "../Utility/util.js";

const InputInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [datePicker, setDatePicker] = useState("");
  const [reactiveButton, setReactiveButton] = useState("idle");

  const onSubmitForm = async (e) => {
    console.log("Submit form...");
    e.preventDefault();

    let phoneNumber = formatPhoneNumber(phone);

    if (datePicker !== "") {
      const formattedDate = `${
        datePicker.getMonth() + 1
      }/${datePicker.getDate()}/${datePicker.getFullYear()}`;

      if (getAge(formattedDate) <= 1) {
        setReactiveButton("error");
        setTimeout(() => {
          setReactiveButton("idle");
        }, 2000);
        return;
      }
    }

    if (
      firstName === "" ||
      lastName === "" ||
      // address === "" ||
      phone === "" ||
      email === "" ||
      datePicker === "" ||
      phoneNumber === null
    ) {
      setReactiveButton("error");
      setTimeout(() => {
        setReactiveButton("idle");
      }, 2000);
      return;
    }

    try {
      setReactiveButton("loading");
      let youth = false;
      if (getAge(datePicker) < 18) {
        youth = true;
      }
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
          leadManagerID: null,
          referredBy: null,
          joinGym: null,
          classRegistration: 0,
          notes: null,
        }),
      });

      if (response.status === 200) {
        setReactiveButton("success");
        setTimeout(() => {
          setReactiveButton("idle");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setReactiveButton("error");
      setTimeout(() => {
        setReactiveButton("idle");
      }, 2000);
    }
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
                  {/* <input
                    type="text"
                    className="form-control margin-bottom"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onClick={() => setAddress("")}
                    placeholder="Address"
                  /> */}
                  <input
                    type="text"
                    className="form-control margin-bottom"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onClick={() => setPhone("")}
                    placeholder="Phone Number: +1 000-000-0000"
                  />
                </div>
                <div className="float-child">
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
                    dateFormat="MM/dd/yyyy"
                  />
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
                    width={"100%"}
                    height={null}
                    animation={true}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default InputInformation;
