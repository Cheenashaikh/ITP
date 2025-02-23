


import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { usePagination, useTable } from "react-table";

function Verify() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateTo, setDateTo] = useState("");
    const [dateFrom, setDateFrom] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "8461|EKagm02MBQhiTQBDyhFnaixQToTQZSt447WfcYFL4b59a072";
                const response = await axios.get("/v1/api/violatorPaymentInfoFront", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    timeout: 60000,
                });

                if (response.data && Array.isArray(response.data.data)) {
                    setData(response.data.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setData([]);
                }
            } catch (err) {
                console.log("Error fetching data:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return (
              
                (dateFrom === "" || new Date(row?.created_at) >= new Date(dateFrom)) &&
                (dateTo === "" || new Date(row?.created_at) <= new Date(dateTo))
            );
        });
    }, [data, dateFrom, dateTo]);
    const columns = useMemo(() => [
        { Header: "Date", accessor: "date" },
        { Header: "Zone", accessor: "zone" },
        { Header: "eTicket", accessor: "challanId" },
        { Header: "Code", accessor: "violationCode" },
        { Header: "PSID", accessor: "psid" },
        { Header: "Status", accessor: "status" },
        { Header: "Violator Name", accessor: "name" },
        { Header: "CNIC", accessor: "cnic" },
        { Header: "Vehicle Number", accessor: "vehicle_number" },
        { Header: "Chassis Number", accessor: "chassis_number" },
        { Header: "Mobile No", accessor: "mobile_number" },
        { Header: "Time", accessor: "time" },
        { Header: "Doc Type", accessor: "document" },
        { Header: "Doc Number", accessor: "document_number" },
        { Header: "Vehicle", accessor: "vehicle_name" },
        { Header: "Vehicle Type", accessor: "VehicleType" },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable({
        columns,
        data: filteredData,
        initialState: { pageIndex: 0, pageSize: 5 },
    },
        usePagination);


    return (
        <div className="table">
             <h2>Verify Payment From OneLink</h2>
            <div className="input">
                
                <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
                <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </div>

            <table {...getTableProps()} className="content-table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length}>Loading...</td>
                        </tr>
                    ) : page.length > 0 ? (
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>No data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
                <span>Page {pageIndex + 1} of {pageOptions.length}</span>
                <button onClick={nextPage} disabled={!canNextPage}>Next</button>
            </div>


        </div>
    );
}

export default Verify;