import React from "react";
import cl from './src/Boost/Boost.module.css'
import { Link } from "react-router-dom";

const Boost = () => {
    return (
        <div className={cl.boostWrap}>
            <div className={cl.baseBlock}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                        Join Telegram Chat
                    </span>
                    <span className={cl.Reward}>
                        50,000
                    </span>
                </div>
                
                <Link to="https://t.me/QuickClickOfficialBot" className={cl.Button}>
                        <h6>Join</h6>
                </Link>
                <div className={cl.Description}>
                    <span>Join the Telegram Chat to earn points</span>
                </div>
            </div>
        </div>
    )
}

export default Boost;