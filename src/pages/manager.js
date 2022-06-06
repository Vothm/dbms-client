import React, { Fragment, useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import ModalInput from "../components/ModalInput";
import Navbar from "../components/Navbar";

const Manager = () => {
  const [allLeads, setAllLeads] = useState([]);

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

  useEffect(() => {
    getAllLeads();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div>
        <ModalInput />
      </div>
      <DataTable title={"All Leads"} data={allLeads} setState={setAllLeads} getData={getAllLeads} />
      {/* <div className="float-container">
        <div className="floater">
          <DataTable arr={allLeads} setState={setAllLeads} />
        </div>

        <div>
          <DataTable arr={allLeads} setState={setAllLeads} />
        </div>
      </div> */}
    </Fragment>
  );
};
export default Manager;
