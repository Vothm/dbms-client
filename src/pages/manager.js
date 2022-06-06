import React, { Fragment, useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import ModalInput from "../components/ModalInput";
import Navbar from "../components/Navbar";

const Manager = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [vinceLeads, setVinceLeads] = useState([]);
  const [aboudLeads, setAboudLeads] = useState([]);
  const [seirraLeads, setSeirraLeads] = useState([]);
  const [alexLeads, setAlexLeads] = useState([]);
  const [change, setChange] = useState(false);

  const getAllLeads = async () => {
    try {
      const response = await fetch(`http://dbmserver.vonce.me/api/getAllLeads`);
      const jsondata = await response.json();
      setAllLeads(jsondata);
      setChange(!change);
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
      setChange(!change);
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
      setChange(!change);
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
      setChange(!change);
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
      setChange(!change);
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
  }, []);

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

            <DataTable
              setAllBool={change}
              setAllStates={setChange}
              title={"All Leads"}
              data={allLeads}
              setState={setAllLeads}
              getData={getAllLeads}
            />
            <div style={{ marginTop: "70px" }}>
              <DataTable
                setAllBool={change}
                setAllStates={setChange}
                title={"Vince Leads"}
                data={vinceLeads}
                setState={setVinceLeads}
                getData={getVinceLeads}
              />
            </div>
            <div style={{ marginTop: "70px" }}>
              <DataTable
                setAllBool={change}
                setAllStates={setChange}
                title={"Aboud Leads"}
                data={aboudLeads}
                setState={setAboudLeads}
                getData={getAboudLeads}
              />
            </div>

            <div style={{ marginTop: "70px" }}>
              <DataTable
                setAllBool={change}
                setAllStates={setChange}
                title={"Seirra Leads"}
                data={seirraLeads}
                setState={setSeirraLeads}
                getData={getSeirraLeads}
              />
            </div>

            <div style={{ marginTop: "70px" }}>
              <DataTable
                setAllBool={change}
                setAllStates={setChange}
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
