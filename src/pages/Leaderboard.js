import React from "react";
import cl from './src/Leaderboard/Leaderboard.module.css'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Leaderboard = () => {
    const location = useLocation();

  useEffect(() => {
    // Проверяем текущий маршрут
    const isBoostPage = location.pathname === '/boost';

    // Устанавливаем overflow в зависимости от текущего маршрута
    document.body.style.overflow = isBoostPage ? 'auto' : 'hidden';

    // Очистка стиля при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  useEffect(() => {
    // Проверяем текущий маршрут
    const isWalletPage = location.pathname === '/profile/';

    // Устанавливаем overflow в зависимости от текущего маршрута
    document.body.style.overflow = isWalletPage ? 'auto' : 'hidden';

    // Очистка стиля при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);
    
    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        BackButton.hide();
    });
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });

    window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
    window.Telegram.WebApp.setHeaderColor('#000000');
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLeaders() {
            try {
                const response = await fetch('https://clicktothesky.com/api/top_user_leaderboard/');
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
        
                const data = await response.json();
                console.log('Fetched rewards:', data); // Добавлено для отладки

                const sortedData = data.sort((a, b) => a.place - b.place);

                setLeaders(sortedData);
            } catch (error) {
                setError('Ошибка при загрузке данных о наградах');
            } finally {
                setLoading(false);
            }
        }

        fetchLeaders();
    }, []);

    return(
        <div className={cl.leaderboardWrap}>
            <span className={cl.headSpan}>QuickClick League</span><br />
            <span className={cl.descriptionSpan}>Global Leaderboard</span>
            
            {/* <div className={cl.headTable}>
                <div className={cl.Item}>
                        <p>Place</p>
                </div>
                <div className={cl.Item}>
                         <p>Username</p>
                </div>
                <div className={cl.Item}>
                         <p>Balance</p>
                </div>
            </div> */}
            {leaders.map((leader, index) => (
            <div key={index}  className={cl.leader}>
                <div className={cl.Item}>
                        <p>{index+1}</p>
                </div>
                <div className={cl.Item}>
                         <p>{leader.username}</p>
                </div>
                <div className={cl.Item}>
                         <p>{leader.balance}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default Leaderboard