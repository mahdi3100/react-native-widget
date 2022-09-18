import React, {  forwardRef, useMemo, useState } from "react";
import 'bulma/css/bulma.min.css';
import {Button } from 'react-bulma-components';
import { usePagination, useSortBy, useFilters, useTable } from "react-table";
import "../Css/all.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/**Table Component  to generate Table Using React-Table props*/
function Table({ columns, data }) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    //rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    //setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable({
    columns,
    data
  },
    useFilters,
    useSortBy,
    usePagination
  );
  const [filterDate, setFilterDate] = useState(new Date());
  const [removeFilter, setRemoveFilter] = useState(false);
  const handleChangeDate = (date) => {
    let MyDateString = ('0' + date.getDate()).slice(-2) + '/'
      + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
      + date.getFullYear();
    setFilter("date", MyDateString)
    setFilterDate(date);
    setRemoveFilter(true)
  }
  const Icondatapicker = (column) => {
    if (column.Header == "Date") {
      const CustomInput = forwardRef((props, ref) => {
        return (
          <div style={{ textAlign: "center" }} onClick={props.onClick} ref={ref}>
            <i className="fa fa-calendar" style={{ paddingRight: "10px" }} aria-hidden="true"></i>
          </div>
        );
      });
      return (
        <>
          <DatePicker
            selected={filterDate}
            onChange={(date) => handleChangeDate(date)}
            customInput={<CustomInput />}
          />
          {(removeFilter) && <i onClick={() => { setFilter("date", null); setRemoveFilter(false) }}>Clear</i>}
        </>
      )
    }
  }
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(/* column.getSortByToggleProps() clickable for all the TH element which prevent others icon to be clickable */)}
                  className="styleTD">
                  <div style={{ display: "flex" }}>
                    {
                      <span onClick={() => { column.toggleSortBy()/*used instead of getSortByToggleProps() to controle event where to be fired*/ }}>
                        {column.isSorted
                          ? column.isSortedDesc
                            ?
                            <i className="fas fa-angle-down"></i>
                            : <i className="fas fa-angle-up"></i>
                          :
                          <i className="fas fa-sort"></i>
                        }</span>
                    }
                    {column.render("Header")}
                    {Icondatapicker(column)}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr  {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className="styleTD">{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        {(pageIndex > 1) &&
          <button onClick={() => gotoPage(0)} className="stylePagination" disabled={!canPreviousPage}>
            {'1'}
          </button>}{' '}
        {(pageIndex > 0) &&
          <button onClick={() => previousPage()} className="stylePagination" disabled={!canPreviousPage}>
            {'Prev'}
          </button>}{' '}
        <button disabled={true} className="stylePaginationActuel">
          {pageIndex + 1}
        </button>{' '}
        <button onClick={() => nextPage()} className="stylePagination" disabled={!canNextPage}>
          {'Next'}
        </button>{' '}
        {(pageCount != 1) &&
          <button onClick={() => gotoPage(pageCount - 1)} className="stylePagination" disabled={!canNextPage}>
            {pageOptions.length}
          </button>}{' '}
      </div>
    </>
  );
}
/** Desktoptable Component is a link -pass Data - From History to Table component to create Table  */
function Desktoptable(props) {
  var exchanges = props.exchanges;
  //useing MeMo to prevent Re-rendering for React-Table
  const columns = useMemo(
    () => [
      /*Header: " History",
      disableSortBy: true,*/
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Currency From",
        accessor: "currencyFrom"
      },
      {
        Header: "Amount From",
        accessor: "amountFrom"
      },
      {
        Header: "Currency To",
        accessor: "currencyTo"
      },
      {
        Header: "Amount to",
        accessor: "amountTo"
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: (props) => {
          return (<Button small="true" color={(props.value == "Exchange") ? "info" : "success"} >{props.value}</Button>)
        },
        getProps: (state, rowInfo, column) => {
          return {
            style: {
              width: "120px"
            },
          };
        }
      }
    ]
  );
  return (
    <div className="desktopTable">
    <Table  columns={columns} data={exchanges} />
    </div>
  );
}
export default Desktoptable;