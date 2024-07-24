import React from "react";
import cl from './src/Rewards/Rewards.module.css'
import { useNavigate } from 'react-router-dom';

const Rewards = () => {
    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        WebApp.showAlert("BackButton clicked");
        BackButton.hide();
    });
    WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });

    return(
        
        <div>
            <div className={cl.rewardsHeader}>
                <h5>ClickTap league</h5>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>

            <div className={cl.Rewards}>
                <div className={cl.Place}><p>1.Place</p></div>
                <div className={cl.Reward}><p>300$</p></div>
            </div>
        </div>
    )
}

export default Rewards;