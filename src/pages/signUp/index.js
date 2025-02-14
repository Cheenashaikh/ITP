// import React, { useState } from "react";
// import axios from "axios";
// import "./signup.css"

// function SignUp({ onLogin }) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleClick = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try {

//             await axios.get("/v1/sanctum/csrf-cookie", { withCredentials: true });
//             console.log("username:", username);
//             console.log("password:", password);
//             const response = await axios.post(
//                 "/v1/api/auth/login",
//                 { username, password },
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );


//             console.log("Login response:", response.data);

//             if (response.data.status) {
//                 onLogin(response.data.data);
//             } else {
//                 setError(response.data.message || "Invalid credentials.");
//             }
//         } catch (error) {
//             console.error("Error during login:", error);
//             setError("An error occurred during login. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="signUpContainer">
//             <div className="container_left">
              
//             <h2>Welcome Back</h2>
//                 <p className="welcome-text">
//                     We’re glad to have you here again! Sign in to access your account
//                     and continue your journey with us.
//                 </p>
//             </div>
//             <div className="container_right">
//                 <div className="content">
//                     <img src="http://103.209.53.71/layout/images/logo-dark.svg"
//                         alt="logo"
//                         className="logo"
//                     />
//                     <p className="header">sign in to continue</p>
//                     <form onSubmit={handleClick}>
//                         <div className="input_group">
//                             <input
//                                 value={username}
//                                 type="text"
//                                 id="username"
//                                 placeholder=" "
//                                 required
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             <label htmlFor="username">Username</label>
//                         </div>
//                         <div className="input_group">
//                             <input
//                                 value={password}
//                                 type="password"
//                                 id="password"
//                                 placeholder=" "
//                                 required
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <label htmlFor="password">Password</label>
//                         </div>
//                         <button type="submit" disabled={loading}>
//                             {loading ? "Signing in..." : "Sign in"}
//                         </button>
//                         {error && <p className="error">{error}</p>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SignUp;

import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

function SignUp({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.get("/v1/sanctum/csrf-cookie", { withCredentials: true });
            const response = await axios.post(
                "/v1/api/auth/login",
                { username, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.status) {
                onLogin(response.data.data);
            } else {
                setError(response.data.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signUpContainer">
            <div className="container_left">
                <h2>Welcome Back</h2>
                <p className="welcome-text">
                    We’re glad to have you here again! Sign in to access your account
                    and continue your journey with us.
                </p>
            </div>
            <div className="container_right">
                <div className="content">
                    <img
                        src="http://103.209.53.71/layout/images/logo-dark.svg"
                        alt="logo"
                        className="logo"
                    />
                    <p className="header">Sign in to Continue</p>
                    <form onSubmit={handleClick}>
                        <div className="input_group">
                            <input
                                value={username}
                                type="text"
                                id="username"
                                placeholder=" "
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input_group">
                            <input
                                value={password}
                                type="password"
                                id="password"
                                placeholder=" "
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;