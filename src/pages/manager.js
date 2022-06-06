import React, { Fragment, useState, useEffect } from "react";
import ReactiveButton from "reactive-button";
import DataTable from "../components/DataTable";
import ModalInput from "../components/ModalInput";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faThumbsUp,
  faBomb,
} from "@fortawesome/free-solid-svg-icons";

const Manager = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [vinceLeads, setVinceLeads] = useState([]);
  const [aboudLeads, setAboudLeads] = useState([]);
  const [seirraLeads, setSeirraLeads] = useState([]);
  const [alexLeads, setAlexLeads] = useState([]);
  const [change, setChange] = useState(false);
  const [reactiveButton, setReactiveButton] = useState("idle");

  const getAllLeads = async () => {
    try {
      const response = await fetch(`http://dbmserver.vonce.me/api/getAllLeads`);
      const jsondata = await response.json();
      setAllLeads(jsondata);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const getVinceLeads = async () => {
    try {
      const response = await fetch(
        `http://dbmserver.vonce.me/api/getVinceLeads`
      );
      const jsondata = await response.json();
      setVinceLeads(jsondata);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const getAboudLeads = async () => {
    try {
      const response = await fetch(
        `http://dbmserver.vonce.me/api/getAboudLeads`
      );
      const jsondata = await response.json();
      setAboudLeads(jsondata);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const getSeirraLeads = async () => {
    try {
      const response = await fetch(
        `http://dbmserver.vonce.me/api/getSierraLeads`
      );
      const jsondata = await response.json();
      setSeirraLeads(jsondata);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const getAlexLeads = async () => {
    try {
      const response = await fetch(
        `http://dbmserver.vonce.me/api/getAlexLeads`
      );
      const jsondata = await response.json();
      setAlexLeads(jsondata);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllLeads();
    getVinceLeads();
    getAboudLeads();
    getSeirraLeads();
    getAlexLeads();
  }, [change]);

  return (
    <Fragment>
      <Navbar />
      <div>
        <div style={{ width: "100%" }}>
          <div
            className="padding-bottom-10"
            style={{ marginTop: "50px", display: "table", margin: "0 auto" }}
          >
            <ModalInput />
            <ReactiveButton
              buttonState={reactiveButton}
              color={"violet"}
              idleText={"Refresh all data"}
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
              style={{ borderRadius: "5px" }}
              outline={false}
              shadow={true}
              rounded={true}
              size={"normal"}
              block={false}
              messageDuration={2000}
              disabled={false}
              buttonRef={null}
              height={null}
              animation={true}
              onClick={() => {
                setReactiveButton("loading");
                setChange(!change);
                setReactiveButton("success");
                setTimeout(() => {
                  setReactiveButton("idle");
                }, 2000);
              }}
            />
            <DataTable
              allDataBool={change}
              setAllData={setChange}
              title={"All Leads"}
              data={allLeads}
              setState={setAllLeads}
              getData={getAllLeads}
            />
            <div style={{ marginTop: "70px" }}>
              <DataTable
                allDataBool={change}
                setAllData={setChange}
                title={"Vince Leads"}
                data={vinceLeads}
                setState={setVinceLeads}
                getData={getVinceLeads}
              />
            </div>
            <div style={{ marginTop: "70px" }}>
              <DataTable
                allDataBool={change}
                setAllData={setChange}
                title={"Aboud Leads"}
                data={aboudLeads}
                setState={setAboudLeads}
                getData={getAboudLeads}
              />
            </div>

            <div style={{ marginTop: "70px" }}>
              <DataTable
                allDataBool={change}
                setAllData={setChange}
                title={"Sierra Leads"}
                data={seirraLeads}
                setState={setSeirraLeads}
                getData={getSeirraLeads}
              />
            </div>

            <div style={{ marginTop: "70px" }}>
              <DataTable
                allDataBool={change}
                setAllData={setChange}
                title={"Alex Leads"}
                data={alexLeads}
                setState={setAlexLeads}
                getData={getAlexLeads}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Manager;
