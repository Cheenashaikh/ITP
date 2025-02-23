
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import { BsFillCalendarDayFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import Cookies from "js-cookie";

function Dashboard() {
   
    const [data, setData] = useState({
       
    });
    const [error, setError] = useState(null);
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "8461|EKagm02MBQhiTQBDyhFnaixQToTQZSt447WfcYFL4b59a072";
                // await axios.get("/v1/sanctum/csrf-cookie", { withCredentials: true });
                const csrf = Cookies.get("XSRF-TOKEN");

                const response = await axios.get("/v1/api/dashboard", {
                    headers: {
                        "X-XSRF-TOKEN": csrf,
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    timeout: 60000,
                });
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };

        fetchData();
    }, []);


    if (error) return <p>Error: {error}</p>;

    return (
        <main className="main-container">
        <h1>Digital Sergeant</h1>
            <div className="main-cards">
              
                <div className="card">
                    <div className="card-inner">
                        <BsFillCalendarDayFill className="card-icon" style={{ color: "#007bff" }} />
                        <h3>Today's Report</h3>
                    </div>
                    <p>E-Ticket: <span>{data.todayRecords}</span></p>
                    <p>Fine Amount: <span>{data.totalAmountOfToday}</span></p>
                    <p>Paid: <span style={{ color: "green" }}>{data.totalPaidToday}</span></p>
                    <p>Unpaid: <span style={{ color: "red" }}>{data.totalUnpaidToday}</span></p>
                    <p>Paid Tickets: <span>{data.todayPaidTicket}</span></p>
                    <p>Unpaid Tickets: <span style={{ color: "red" }}>{data.todayUnPaidTicket}</span></p>
                </div>

              
                <div className="card">
                    <div className="card-inner">
                        <FaMoneyBillWave className="card-icon" style={{ color: "#ff9800" }} />
                        <h3>Week's Report</h3>
                    </div>
                    <p>E-Ticket: <span>{data.weeklyTotalRecord}</span></p>
                    <p>Fine Amount: <span>{data.totalAmountOfToWeek}</span></p>
                    <p>Paid: <span style={{ color: "green" }}>{data.paidThisWeek}</span></p>
                    <p>Unpaid: <span style={{ color: "red" }}>{data.UnpaidThisWeek}</span></p>
                    <p>Paid Tickets: <span>{data.weekPaidTicket}</span></p>
                    <p>Unpaid Tickets: <span style={{ color: "red" }}>{data.weekUnPaidTicket}</span></p>
                </div>

             
                <div className="card">
                    <div className="card-inner">
                        <BsFillCalendarDayFill className="card-icon" style={{ color: "#4caf50" }} />
                        <h3>Month's Report</h3>
                    </div>
                    <p>E-Ticket: <span>{data.monthlyTotalRecord}</span></p>
                    <p>Fine Amount: <span>{data.totalAmountOfToMonth}</span></p>
                    <p>Paid: <span style={{ color: "green" }}>{data.paidThisMonth}</span></p>
                    <p>Unpaid: <span style={{ color: "red" }}>{data.UnpaidThisMonth}</span></p>
                    <p>Paid Tickets: <span>{data.monthPaidTicket}</span></p>
                    <p>Unpaid Tickets: <span style={{ color: "red" }}>{data.monthUnPaidTicket}</span></p>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <FaMoneyBillWave className="card-icon" style={{ color: "#f44336" }} />
                        <h3>Year's Report</h3>
                    </div>
                    <p>E-Ticket: <span>{data.yearlyTotalRecord}</span></p>
                    <p>Fine Amount: <span>{data.totalAmountOfToYear}</span></p>
                    <p>Paid: <span style={{ color: "green" }}>{data.paidThisYear}</span></p>
                    <p>Unpaid: <span style={{ color: "red" }}>{data.UnpaidThisYear}</span></p>
                    <p>Paid Tickets: <span>{data.yearPaidTicket}</span></p>
                    <p>Unpaid Tickets: <span style={{ color: "red" }}>{data.yearUnPaidTicket}</span></p>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
