import React, {
  useMemo,
  useState,
  useEffect,
  Fragment,
  useReducer,
} from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { usePagination } from "react-table/dist/react-table.development";
import ReactiveButton from "reactive-button";
import GlobalFilter from "./GlobalFilter";

const DataTable = ({ data, setState, getData }) => {
  const handleDelete = async (row) => {
    try {
      // const deleteRow = await fetch(
      //   `http://dbmserver.vonce.me/api/deleteLead/${row.original.id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      // if (deleteRow.status === 200) {
      //   // setState(data.filter((lead) => lead.id !== row.original.id));
      // }
      // setState(tableInstance.rows);

      setState(
        tableInstance.rows
          .map(({ original }) => original)
          .filter((lead) => lead.id !== row.original.id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // const handleKeyUp = async (e) => {
  //   let text = e.target.value;
  //   if (text === "") {
  //   } else {
  //   }
  // };

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
              onClick={() => {
                handleDelete(row);
              }}
            >
              Delete
            </button>
          </div>
        ),
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
      <table {...getTableProps()}>
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
      </table>
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

    // <Fragment>
    //   <div className="container table-responsive" style={{ marginTop: "50px" }}>
    //     <table className="table table-dark table-striped">
    //       <thead>
    //         <tr>
    //           <th scope="col">ID</th>
    //           <th scope="col">First Name</th>
    //           <th scope="col">Last Name</th>
    //           <th scope="col">Phone Number</th>
    //           <th scope="col">Email</th>
    //           <th scope="col">Youth</th>
    //           <th scope="col">Lead Manager ID</th>
    //           <th scope="col">Referred By</th>
    //           <th scope="col">Join Gym</th>
    //           <th scope="col">Class Registration</th>
    //           <th scope="col">Notes</th>
    //           <th scope="col">Edit</th>
    //           <th scope="col">Delete</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((lead) => (
    //           <tr key={lead.id}>
    //             <td>{String(lead.id)}</td>
    //             <td>{String(lead.firstname)}</td>
    //             <td>{String(lead.lastname)}</td>
    //             <td>{String(lead.phonenumber)}</td>
    //             <td>{String(lead.email)}</td>
    //             <td>{String(lead.youth)}</td>
    //             <td>{String(lead.leadmanagerid)}</td>
    //             <td>{String(lead.referredby)}</td>
    //             <td>{String(lead.joingym)}</td>
    //             <td>{String(lead.classregistration)}</td>
    //             <td>{String(lead.notes)}</td>
    //             <td>Edit</td>
    //             <td>
    //               <button
    //                 className="btn btn-danger"
    //                 onClick={() => handleDelete(lead.id)}
    //               >
    //                 Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </Fragment>
  );
};
export default DataTable;
