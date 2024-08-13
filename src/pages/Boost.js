import React from "react";
import cl from './src/Boost/Boost.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import tg from './src/Boost/telegram.png'
import X from './src/Boost/twitter.png'
import logo from '../components/main/logo.png'

const Boost = () => {
    const location = useLocation();

  useEffect(() => {
    // Проверяем текущий маршрут
    const isBoostPage = location.pathname === '/boost/';

    // Устанавливаем overflow в зависимости от текущего маршрута
    document.body.style.overflow = isBoostPage ? 'auto' : 'hidden';

    // Очистка стиля при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  console.log(location.pathname)
    window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
    window.Telegram.WebApp.setHeaderColor('#000000');
    
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        BackButton.hide();
    });
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });
    let text = `You have been invited to QuickClick`;
                
    let shareLink = `https://t.me/share/url?url=https://t.me/clicktapcoin_bot?start=${userId}&text=${text}`

    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUserId(user.id || `${user.first_name} ${user.last_name}`);
            }
        }
    }, []);

    
    useEffect(() => {
        async function fetchUser() {
            if (!userId) return; // Если userId пуст, ничего не делать
                const response = await fetch(`https://clicktothesky.com/api/get_user_profile/?chat_id=${userId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных пользователя');
                }
                const data = await response.json();
                setUser(data);
            try {
                const response = await fetch(`https://clicktothesky.com/api/get_user_profile/?chat_id=${userId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных пользователя');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError('Ошибка при загрузке данных пользователя');
                console.error('Ошибка при загрузке данных пользователя:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [userId]);

    const handleButtonClickTelegram = async () => {
        try {
            // Отправляем запрос на обновление данных пользователя
            const response = await fetch('https://clicktothesky.com/api/update_user_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: userId, platform: 'telegram' }),
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении профиля');
            }

            // Обновляем состояние пользователя
            setUser(prevUser => ({ ...prevUser, telegram: true, balance: (prevUser?.balance || 0) + 50000 }));
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            setError('Ошибка при обновлении профиля');
        } finally {
            // После обновления данных, открываем ссылку
            window.location.href = "https://t.me/QuickClickOfficialBot";
        }
    };

    const handleButtonClickTwitter = async () => {
        try {
            // Отправляем запрос на обновление данных пользователя
            const response = await fetch('https://clicktothesky.com/api/update_user_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: userId, platform: 'twitter' }),
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении профиля');
            }

            // Обновляем состояние пользователя
            setUser(prevUser => ({ ...prevUser, twitter: true, balance: (prevUser?.balance || 0) + 50000 }));
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            setError('Ошибка при обновлении профиля');
        } finally {
            // После обновления данных, открываем ссылку
            window.location.href = "https://x.com/QuickClickBot";
        }
    };

    if (loading) {
        return <div className={cl.loading}><img src={logo} /><p className={cl.LoadingText}>Loading...</p></div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
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

            <div className={`${cl.baseBlock} ${user && user.telegram ? cl.Completed : ''}`}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                        Join Telegram Chat
                    </span>
                    <span className={cl.Reward}>
                        5,000
                    </span>
                </div>
                
                <button to="https://t.me/QuickClickOfficialBot" className={`${cl.Button} ${user && user.telegram ? cl.Completed : ''}`} disabled={user && user.telegram} onClick={handleButtonClickTelegram}>
                <h6><img src={tg} alt="telegram"/>Join</h6>
                </button>
                <div className={cl.Description}>
                    <span>Join the Telegram Chat to earn points</span>
                </div>
            </div>

            <div className={`${cl.baseBlock} ${user.twitter ? cl.Completed : ''}`}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                        Follow Twitter(X) Account
                    </span>
                    <span className={cl.Reward}>
                        5,000
                    </span>
                </div>
                
                <button to="https://x.com/QuickClickBot" className={`${cl.Button} ${user && user.twitter ? cl.Completed : ''}`} disabled={user && user.twitter} onClick={handleButtonClickTwitter}>
                         <h6><img src={X} alt="twitter"/>Follow</h6>
                </button>
                <div className={cl.Description}>
                    <span>Follow the Twitter Account to earn points</span>
                </div>
            </div>

            <div className={cl.PartnerBlock}>
                <div className={cl.Header}>
                    <span className={cl.Title}>
                    PARTNERSHIP CHALLENGE
                    </span>
                </div>

                <div className={cl.HeaderMain}>
                    <span className={cl.TitleMain}>
                        Earn up to <span className={cl.textGreen}>500$</span>
                    </span>
                </div>

                <div className={cl.MainText}>
                Join our mission to expand our League system!<br/>Bring in projects or Telegram groups to join QuickClick and receive $500 commission. The more partners you recruit, the greater benefits you’ll receive.
                </div>
                
                <Link to="https://t.me/MoneyWithNeno" className={cl.Button}>
                         <h6>Contact Us</h6>
                </Link>
    
            </div>
        </div>
    )
}

export default Boost;