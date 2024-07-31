import React from "react";
import cl from './src/Boost/Boost.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

import tg from './src/Boost/telegram.png'
import X from './src/Boost/twitter.png'
import logo from '../components/main/logo.png'

const Boost = () => {
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        BackButton.hide();
    });
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });

    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUserId(user.id || `${user.first_name} ${user.last_name}`);
            }
        }
    }, []);

    let text = `You have been invited to ClickTap< br>
                Rules are simple:< br>

                👉 Click to earn points< br>
                💌 Invite friends to get more points< br>
                🏆 Invite Friends, Click Together, Win Big`;
                
    let shareLink = `https://t.me/share/url?url=https://t.me/clicktapcoin_bot?start=${userId}&text=${text}`

    return (
        <div className={cl.boostWrap}>
            <div className={cl.boostHeader}>
                <img src={logo} alt="logo_boost"/>
                <br/>
                <span>get boost & <span className={cl.whiteText}>earn points</span></span>
            </div>

            <div className={cl.baseBlock}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                        Invite Friend Now
                    </span>
                    <span className={cl.Reward}>
                        50,000
                    </span>
                </div>
                
                <Link to={shareLink} className={cl.Button}>
                <h6><img src={tg} alt="telegram"/>Share</h6>
                </Link>
                <div className={cl.Description}>
                    <span>50,000 points for inviting a friend</span>
                </div>
            </div>

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

            <div className={cl.PartnerBlock}>
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