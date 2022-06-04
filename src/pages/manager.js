import React, { Fragment, useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import Navbar from "../components/Navbar";

const Manager = () => {
  let port = 5000;

  console.log(process.env);
  console.log(port);
  const [allLeads, setAllLeads] = useState([]);

  const getAllLeads = async () => {
    try {
      const response = await fetch(`http://dbmserver.vonce.me/api/getAllLeads`);
      console.log(response);
      const jsondata = await response.json();
      setAllLeads(jsondata);
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
        <DataTable arr={allLeads} setState={setAllLeads} />
      </div>
      {/* <div className="float-container">
        <div
          className="container table-responsive float-child"
          style={
            ({ marginTop: "200px" },
            { overflow: "scroll" },
            { height: "400px" })
          }
        >
          <table
            id="dtVerticalScrollExample"
            className="table table-dark table-striped "
          >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Youth</th>
                <th scope="col">Lead Manager ID</th>
                <th scope="col">Referred By</th>
                <th scope="col">Join Gym</th>
                <th scope="col">Class Registration</th>
                <th scope="col">Notes</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{String(lead.id)}</td>
                  <td>{String(lead.firstname)}</td>
                  <td>{String(lead.lastname)}</td>
                  <td>{String(lead.phonenumber)}</td>
                  <td>{String(lead.email)}</td>
                  <td>{String(lead.youth)}</td>
                  <td>{String(lead.leadmanagerid)}</td>
                  <td>{String(lead.referredby)}</td>
                  <td>{String(lead.joingym)}</td>
                  <td>{String(lead.classregistration)}</td>
                  <td>{String(lead.notes)}</td>
                  <td>Edit</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(lead.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </Fragment>
  );
};
export default Manager;
