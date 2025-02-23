
import React, { useState,useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar({ user, onLogout }) {
    const [expended, setExpended] = useState(window.innerWidth > 480);
    useEffect(() => {
        const handleResize = () => {
            setExpended(window.innerWidth > 480);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={expended ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
            <div className="nav-upper">
                <div className="nav-heading">
                    {expended && (
                        <div className="nav-brand">
                            <img src="https://timepay.com.pk/wp-content/uploads/2024/08/timepayweblogo.png" alt="" srcset="" />
                        </div>
                    )}
                    <button className={expended ? "hamburger hamburger-in" : "hamburger hamburger-out"} onClick={() => setExpended(!expended)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={expended ? "nav-menu" : "nav-menu menu-item-NX"}>
                    <div className="nav-option option1">
                        <i className="bi bi-house-door"></i> 
                        <Link to="/dashboard" style={{ textDecoration: "none" }}>
                            <h3>Dashboard</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-people"></i> 
                        <Link to="/User" style={{ textDecoration: "none" }}>
                            <h3>User</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-receipt"></i> 
                        <Link to="/digital" style={{ textDecoration: "none" }}>
                            <h3>Digital Challan Register</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-check-circle"></i>
                        <Link to="/verify" style={{ textDecoration: "none" }}>
                            <h3>Verify Payment Status</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-clipboard-data"></i> 
                        <Link to="/enforcement" style={{ textDecoration: "none" }}>
                            <h3>Enforcement Campaign Report</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-exclamation-triangle"></i> 
                        <Link to="/warning" style={{ textDecoration: "none" }}>
                            <h3>Warning Register</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-box-arrow-right"></i> 
                        <Link to="/" onClick={onLogout} style={{ textDecoration: "none" }}>
                            <h3>Logout</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;