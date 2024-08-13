// Popup.js
import React from 'react';
import cl from './Main.module.css'; // Create this CSS file to style the popup

const Popup = ({ onClose }) => {
    return (
        <div className={cl.popupOverlay}>
            <div className={cl.popupContent}>
                <h2>Road Map</h2>
                <p><strong>Pre-Launch:</strong> DONE</p>
                <p><strong>Referrals:</strong> DONE</p>
                <p><strong>Earn Tasks:</strong> DONE</p>
                <p><strong>Daily Rewards:</strong> DONE</p>
                <p><strong>Basic Game:</strong> DONE</p>
                <p><strong>Splitting Pool Technology:</strong> DONE</p>
                <p><strong>Coming Soon:</strong></p>
                <ul>
                    <li>Auto Mining Rewards</li>
                    <li>Rank Ratings</li>
                    <li>AirDrop - Sept 25</li>
                    <li>PVP Battles</li>
                    <li>Web Game</li>
                    <li>Listing On Exchanges - Dec 1, 2024</li>
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
