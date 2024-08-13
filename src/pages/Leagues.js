import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import cl from './src/League/League.module.css';
import logo from '../components/main/logo.png'

const Leagues = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [chatId, setChatId] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [userRank, setUserRank] = useState(null);
    const [formattedBalance, setFormattedBalance] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        // Настройка Telegram WebApp
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
            window.Telegram.WebApp.setHeaderColor('#000000');
            const BackButton = window.Telegram.WebApp.BackButton;
            BackButton.show();

            BackButton.onClick(function() {
                BackButton.hide();
            });

            window.Telegram.WebApp.onEvent('backButtonClicked', function() {
                navigate('/main');
            });

            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUsername(user.username || `${user.first_name} ${user.last_name}`);
                setChatId(user.id);
            } else {
                setUsername('elesinanton');
            }
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`https://clicktothesky.com/api/get_user_profile/?chat_id=${chatId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setClickCount(data.balance);
                // Для показа пользователя и ранга одновременно
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                setError(`Ошибка сети: ${error.message}`);
                setLoading(false);
            }
        };

        const fetchUserRank = async () => {
            try {
                const response = await fetch(`https://clicktothesky.com/api/user_rank/${chatId}/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUserRank(data.rank);
                setFormattedBalance(data.formatted_balance);
                // Для показа пользователя и ранга одновременно
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении ранга пользователя:', error);
                setError(`Ошибка сети: ${error.message}`);
                setLoading(false);
            }
        };

        if (chatId) {
            fetchUserProfile();
            fetchUserRank();
        }
    }, [chatId]);

    // Показываем экран загрузки, пока данные загружаются
    if (loading) {
        return (
            <div className={cl.loading}>
                <img src={logo} alt="Loading" />
                <p className={cl.LoadingText}>Loading...</p>
            </div>
        );
    }

    return (
        <div className={cl.leagueWrap}>
            <p className={cl.head}>Trending now</p><br />
            <Link to="/">
                <div className={cl.league}>
                    <div className={cl.titleLeague}>
                        QuickLeague
                    </div>

                    <div className={cl.leagueScore}>
                        <div className={cl.currentScore}>
                            <span className={cl.infoScore}>
                                Current Score
                            </span><br />
                            <span className={cl.counter}>{clickCount}</span>
                        </div>

                        <div className={cl.Place}>
                            <span className={cl.infoPlace}>
                                Place
                            </span><br />
                            <span className={cl.counter}>{userRank}</span>
                        </div>

                    </div>

                    <div className={cl.leagueInfo}>
                        <div className={cl.currentScore}>
                            <p className={cl.infoName}>
                                QuickClick League
                            </p><br />
                            {/* <span className={cl.counter}>157</span> */}
                        </div>

                        <div className={cl.Place}>
                            <span className={cl.infoPlace}>
                                Prize Pool
                            </span><br />
                            <span className={cl.counter}>$1000</span>
                        </div>

                    </div>

                </div>
            </Link>
        </div>
    );
}

export default Leagues;
