import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const returnHome = () => {
        navigate("/home");
    }

    const username = "YourUsername"; // Replace with actual username

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <img 
                    className="navbar-item is-hoverable" 
                    width="300" 
                    src={require("./netcareLogo.png")} 
                    onClick={returnHome}
                    alt="Netcare Logo"
                />
            </div>
            <div className="navbar-end">
                <div 
                    className="navbar-item" 
                    onMouseEnter={() => setTooltipVisible(true)} 
                    onMouseLeave={() => setTooltipVisible(false)}
                    style={{ position: 'relative' }} // Ensure positioning context for the tooltip
                >
                    <FaRegUserCircle />
                    {isTooltipVisible && (
                        <div className="tooltip">
                            {username}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
