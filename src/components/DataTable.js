import React, { useMemo, useState, useEffect, Fragment } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import ReactiveButton from "reactive-button";
import GlobalFilter from "./GlobalFilter";
import { Button } from "react-bootstrap";
import ModalEdit from "./ModalEdit";

// import "bootstrap/dist/css/bootstrap.min.css";

import BTable from "react-bootstrap/Table";

const DataTable = ({
  data,
  setState,
  getData,
  title,
  setAllBool,
  setAllStates,
}) => {
  const handleDelete = async (row) => {
    try {
      const deleteRow = await fetch(
        `http://dbmserver.vonce.me/api/deleteLead/${row.original.id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteRow.status === 200) {
        setState(
          tableInstance.rows
            .map(({ original }) => original)
            .filter((lead) => lead.id !== row.original.id)
        );
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: <div style={{ textAlign: "center" }}>{title}</div>,
        id: "title",
        columns: [
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
            accessor: (d) => String(d.youth),
          },
          {
            Header: "Lead Manager ID",
            accessor: (d) => String(d.leadmanagerid),
          },
          {
            Header: "Referred By",
            accessor: "referredby",
          },
          {
            Header: "Join Gym",
            accessor: (d) => String(d.joingym),
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
            Header: "Edit",
            Cell: ({ row }) => (
              <div>
                <ModalEdit
                  setAllBool={setAllBool}
                  setAllStates={setAllStates}
                  row={row.original}
                ></ModalEdit>
              </div>
            ),
          },
          {
            Header: "Delete",
            Cell: ({ row }) => (
              <div>
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(row);
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ],
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter, pageIndex },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = tableInstance;

  return (
    <Fragment>
      <BTable
        striped
        bordered
        hover
        size={"sm"}
        variant={"dark"}
        responsive
        {...getTableProps()}
      >
        <thead>
          <tr>
            <th colSpan={visibleColumns.length}>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </th>
          </tr>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedSec
                            ? "🔽"
                            : "🔼"
                          : "↕️"}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </BTable>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <ReactiveButton idleText="Previous Page" onClick={() => previousPage()}>
          Previous
        </ReactiveButton>
        <ReactiveButton idleText="Next Page" onClick={() => nextPage()}>
          Next
        </ReactiveButton>
      </div>
    </Fragment>
  );
};
export default DataTable;
