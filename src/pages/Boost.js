import React from "react";
import cl from './src/Boost/Boost.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import tg from './src/Boost/telegram.png'
import X from './src/Boost/twitter.png'

const Boost = () => {
    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        BackButton.hide();
    });
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });

    return (
        <div className={cl.boostWrap}>
            <div className={cl.baseBlock}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                        Join Telegram Chat
                    </span>
                    <span className={cl.Reward}>
                        5,000
                    </span>
                </div>
                
                <Link to="https://t.me/QuickClickOfficialBot" className={cl.Button}>
                <h6><img src={tg} alt="telegram"/>Join</h6>
                </Link>
                <div className={cl.Description}>
                    <span>Join the Telegram Chat to earn points</span>
                </div>
            </div>

            <div className={cl.baseBlock}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                        Follow Twitter(X) Account
                    </span>
                    <span className={cl.Reward}>
                        5,000
                    </span>
                </div>
                
                <Link to="https://x.com/QuickClickBot" className={cl.Button}>
                         <h6><img src={X} alt="twitter"/>Follow</h6>
                </Link>
                <div className={cl.Description}>
                    <span>Follow the Twitter Account to earn points</span>
                </div>
            </div>
        </div>
    )
}

export default Boost;