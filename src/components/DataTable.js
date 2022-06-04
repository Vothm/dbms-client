import React, { useMemo, useState, useEffect, Fragment } from "react";
import { useTable } from "react-table";

const DataTable = ({ data, setState, getData }) => {
  const handleDelete = async (id) => {
    try {
      const deleteRow = await fetch(
        `http://dbmserver.vonce.me/api/deleteLead/${id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteRow.status === 200) {
        getData();
      }
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Phone Number",
        accessor: "phonenumber",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Youth",
        accessor: "youth",
      },
      {
        Header: "Lead Manager ID",
        accessor: "leadmanagerid",
      },
      {
        Header: "Referred By",
        accessor: "referredby",
      },
      {
        Header: "Join Gym",
        accessor: "joingym",
      },
      {
        Header: "Class Registration",
        accessor: "classregistration",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  console.log(rows);
  return (
    <Fragment>
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map((column) => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            row.id = row.original.id;
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};
export default DataTable;
