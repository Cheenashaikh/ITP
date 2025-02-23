
import React, { useState, useEffect, useMemo } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./user.css";

function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [beltNo, setBeltNo] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const [zone, setZone] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [editRowData, setEditRowData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (row) => {
    console.log("Editing row:", row.original); 
  
    if (!row.original.violator_id) {
      console.error("Error: Missing violator_id in row data:", row.original);
      return;
    }
  
    setEditRowData({
      ...row.original,
      _id: row.original.violator_id, 
    });
    setIsEditModalOpen(true);
  };
  
  

  const handleSaveEdit = async () => {
    console.log("editRowData before update:", editRowData); // Debugging
  
    const recordId = editRowData.violator_id; 
    if (!recordId) {
      console.error("No valid identifier (violator_id) for editing:", editRowData);
      return;
    }
  
    try {
      
      const response = await axios.put(
        `/v1/api/violatorPaymentInfoFront/${recordId}`,
        editRowData, 
        
      );
  
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.violator_id === recordId ? { ...item, ...editRowData } : item
          )
        );
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to update record:", response);
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/v1/api/violatorPaymentInfoFront/${id}`);

      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete record:", response);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        (beltNo === "" || row?.belt_number?.toString().includes(beltNo)) &&
        (username === "" || row?.username?.toLowerCase().includes(username.toLowerCase())) &&
        (mobileNo === "" || row?.mobile_number?.includes(mobileNo)) &&
        (role === "" || row?.role?.toLowerCase().includes(role.toLowerCase())) &&
        (zone === "" || row?.zone?.toLowerCase().includes(zone.toLowerCase())) &&
        (dateFrom === "" || new Date(row?.created_at) >= new Date(dateFrom)) &&
        (dateTo === "" || new Date(row?.created_at) <= new Date(dateTo))
      );
    });
  }, [data, beltNo, username, mobileNo, role, zone, dateFrom, dateTo]);

  const columns = useMemo(
    () => [
      { Header: "Belt No", accessor: "belt_number" },
      { Header: "Rank", accessor: "rank" },
      { Header: "Name", accessor: "name" },
      { Header: "Zone", accessor: "zone" },
      { Header: "Police Station", accessor: "police_station" },
      { Header: "Username", accessor: "username" },
      { Header: "Password", accessor: "password" },
      { Header: "Role", accessor: "role" },
      { Header: "Phone Number", accessor: "mobile_number" },
      { Header: "Created Date", accessor: "created_at" },
      {
        Header: "Action",
        accessor: "_id",
        Cell: ({ row }) => (
          <>
            <span onClick={() => handleEditClick(row)} className="icon edit-icon">
              <FaEdit />
            </span>
            <span onClick={() => handleDelete(row.original._id)} className="icon delete-icon">
              <FaTrash />
            </span>
          </>
        ),
      },
    ],
    []
  );

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
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 12 },
    },
    usePagination
  );

  return (
    <div className="table">
      <h2>Violator Payment Info</h2>

      <CSVLink data={filteredData} filename="filtered_data.csv">
        <button className="export-btn">Export CSV</button>
      </CSVLink>

      <div className="input">
        <input
          type="text"
          placeholder="Belt No"
          value={beltNo}
          onChange={(e) => setBeltNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile No"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="Sergeant">Sergeant</option>
          <option value="Reporting User">Reporting User</option>
          <option value="Branch">Branch User</option>
          <option value="Police Station">Police Station</option>
        </select>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="">Select Zone</option>
          <option value="Zone I">Zone I</option>
          <option value="Zone II">Zone II</option>
          <option value="Zone III">Zone III</option>
          <option value="Zone IV">Zone IV</option>
          <option value="Zone V">Zone V</option>
        </select>
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

      {isEditModalOpen && editRowData && (
  <div className="modal">
    <div className="overlay" onClick={() => setIsEditModalOpen(false)}></div>
    <div className="modal-content">
      <h3>Edit Row</h3>
      <div className="modal-body">
        <input
          type="text"
          placeholder="Belt Number"
          value={editRowData.belt_number || ""}
          onChange={(e) => setEditRowData({ ...editRowData, belt_number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rank"
          value={editRowData.rank || ""}
          onChange={(e) => setEditRowData({ ...editRowData, rank: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={editRowData.name || ""}
          onChange={(e) => setEditRowData({ ...editRowData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Zone"
          value={editRowData.zone || ""}
          onChange={(e) => setEditRowData({ ...editRowData, zone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Police Station"
          value={editRowData.police_station || ""}
          onChange={(e) => setEditRowData({ ...editRowData, police_station: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={editRowData.username || ""}
          onChange={(e) => setEditRowData({ ...editRowData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={editRowData.password || ""}
          onChange={(e) => setEditRowData({ ...editRowData, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={editRowData.role || ""}
          onChange={(e) => setEditRowData({ ...editRowData, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={editRowData.mobile_number || ""}
          onChange={(e) => setEditRowData({ ...editRowData, mobile_number: e.target.value })}
        />
      </div>
      <div className="modal-footer">
        <span className="save-btn" onClick={handleSaveEdit}>Save</span>
        <span className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>Cancel</span>
      </div>
    </div>
  </div>
)}


      <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default User;