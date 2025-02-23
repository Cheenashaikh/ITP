

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signUp";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import User from "./pages/user/user";
function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  const handleLogin = (user) => {
    setLoggedIn(user);
  };

  const handleLogOut = () => {
    setLoggedIn(null);
  };

  return (
    <div className="App">
      <Router>
        <div className="app-container">
          {loggedIn && <Sidebar user={loggedIn} onLogout={handleLogOut} />}
          <div className="content-container">
            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <SignUp onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  loggedIn ? (
                    <Dashboard user={loggedIn} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/User"
                element={
                  loggedIn ? (
                    <User user={loggedIn} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
