import React from "react";
import cl from './src/Rewards/Rewards.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

const Rewards = () => {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRewards() {
            try {
                const response = await fetch('https://clicktothesky.com/api/get_rewards/');
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
        
                const data = await response.json();
                console.log('Fetched rewards:', data); // Добавлено для отладки

                const sortedData = data.sort((a, b) => a.place - b.place);

                setRewards(sortedData);
            } catch (error) {
                setError('Ошибка при загрузке данных о наградах');
            } finally {
                setLoading(false);
            }
        }

        fetchRewards();
    }, []);

    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        
        BackButton.hide();
    });
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });

    return(
        
        <div>
            <div className={cl.rewardsHeader}>
                <h5>ClickTap league{error && <p style={{ color: 'red' }}>{error}</p>}</h5>
            </div>
            {loading && <p>Загрузка...</p>}
            

            {console.log(rewards)}
            {rewards.map((reward, index) => (
                    <div key={index} className={cl.Rewards}>
                        <div className={cl.Place}>
                            <p>{reward.place}. Place</p>
                        </div>
                        <div className={cl.Reward}>
                            <p>${reward.price}</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Rewards;