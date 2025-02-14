import { useState } from "react";
import "./App.css";
import SignUp from "./pages/signUp";

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
      {!loggedIn ? (
        <SignUp onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Welcome, {loggedIn.username}!</h2>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
