import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const returnHome = () => {
        navigate("/dashboard");
    }

    const signOut = () => {
        // Clear user data, e.g., local storage, context, etc.
        // localStorage.removeItem('user'); // Example
        // context.signOut(); // If using context
        navigate("/"); // Redirect to login page after signing out
    }

    const username = "Your Username"; // Replace with actual username

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <img 
                    className="navbar-item is-hoverable" 
                    width="300" 
                    src={require("./netcareLogo.png")} 
                    onClick={returnHome}
                    style={{cursor: 'pointer'}}
                    alt="Netcare Logo"
                />
            </div>
            <div className="navbar-end">
                <div 
                    className="navbar-item" 
                    onMouseEnter={() => setTooltipVisible(true)} 
                    onMouseLeave={() => setTooltipVisible(false)}
                    style={{ position: 'relative', fontSize: '1.5rem' }} // Position context for tooltip
                >
                    <FaRegUserCircle />
                    {isTooltipVisible && (
                        <div className="tooltip">
                            {username}
                        </div>
                    )}
                </div>
                <div className="navbar-item" onClick={signOut} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                    <FaSignOutAlt />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
