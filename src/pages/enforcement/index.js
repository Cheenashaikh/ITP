import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { usePagination, useTable } from "react-table";

function Enforcement() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ticket, setTicket] = useState("");
    const [psid, setPsid] = useState("");
   

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
                (ticket === "" || row?.challanId?.toString().includes(ticket)) &&
                (psid === "" || row?.psid?.toString().includes(psid))
               
            );
        });
    }, [data, ticket, psid]);
    const columns = useMemo(() => [
        { Header: "Total Tickets", accessor: "total_tickets" },  
        { Header: "Total Fine", accessor: "total_fine" },                  
        { Header: "Motor Cycle", accessor: "motorcycle_tickets" },         
        { Header: "Other Vehicles", accessor: "other_vehicle_tickets" },                  
        { Header: "Total Impounded", accessor: "total_impounded" }, 
        { Header: "Impounded Motor Cycle", accessor: "impounded_motorcycle" },  
        { Header: "Impounded Other Vehicle", accessor: "impounded_other_vehicle" },             
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
         
            <h2>Enforcement Campaign Report</h2>
            <div className="input">
                <input
                    type="text"
                    placeholder="ticket No"
                    value={ticket}
                    onChange={(e) => setTicket(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="psid"
                    value={psid}
                    onChange={(e) => setPsid(e.target.value)}
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
            <span>Page {pageIndex+1} of { pageOptions.length}</span>
            <button onClick={nextPage} disabled={!canNextPage}>Next</button>
            </div>


        </div>
    );
}

export default Enforcement;

