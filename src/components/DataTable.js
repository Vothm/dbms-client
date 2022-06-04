import React, { Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

const DataTable = ({ arr, setState }) => {
  // Delete row
  const handleDelete = async (id) => {
    try {
      const deleteRow = await fetch(
        `http://dbmserver.vonce.me/api/deleteLead/${id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteRow.status === 200) {
        setState(arr.filter((row) => row.id !== id));
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "firstname",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lastname",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "phonenumber",
      text: "Phone Number",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "youth",
      text: "Youth",
      sort: true,
    },
    {
      dataField: "leadmanagerid",
      text: "Lead Manager ID",
      sort: true,
    },
    {
      dataField: "referredby",
      text: "Referred By",
      sort: true,
    },
    {
      dataField: "joingym",
      text: "Join Gym",
      sort: true,
    },
    {
      dataField: "classregistration",
      text: "Class Registration",
      sort: true,
    },
    {
      dataField: "notes",
      text: "Notes",
      sort: true,
    },
    {
      dataField: "edit",
      text: "Edit",
      sort: true,
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prevPageText: "<",
    prePageText: "<",
    showTotal: true,
  });

  return (
    <Fragment>
      <ToolkitProvider keyField={"id"} data={arr} columns={columns} search>
        {(props) => (
          <div>
            <SearchBar {...props.searchProps} />
            <BootstrapTable {...props.baseProps} pagination={pagination} />
          </div>
        )}
      </ToolkitProvider>
    </Fragment>
  );
};

export default DataTable;
