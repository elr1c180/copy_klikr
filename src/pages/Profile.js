import React from "react";
import cl from './src/Profile/Profile.module.css'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import profile from './src/Profile/profile.png'
import { TonConnectButton } from "@tonconnect/ui-react";

const Profile = () => {
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
   
    window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
    window.Telegram.WebApp.setHeaderColor('#000000');
    const [username, setUsername] = useState('');

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
                setUsername(user.username || `${user.first_name} ${user.last_name}`);
            } else {
                setUsername('elesinanton')
            }
        }
    }, []);
    return (
        <div className={cl.profileWrap}>
    <img src={profile} className={cl.profileImg} alt="profile"/>
    <p>@{username}</p>
    <hr className={cl.divider} />
    
    <div className={cl.centerButton}>
        <center><TonConnectButton/></center>
    </div>

    <div className={cl.infoSection}>
        <h2>WHATS QUICK CLICK?</h2>
        <p>It’s a play to earn game. Tap the screen to earn Quick points. User with the highest points wins cash prize end of every month!</p>
        
        <h2>HOW TO EARN MORE?</h2>
        <p>Quick Leagues! Join a different league to win their additional cash prize pools. Each league has its own boost tasks. Make sure to check every league's boost.</p>
        
        <h2>WHAT IS A LEAGUE?</h2>
        <p>If you want to promote your project, business/community, you can contact us. We will create a league where users can complete tasks to earn rewards. You decide how high the rewards and prizes are for completed tasks!</p>
        
        <h2>EARN MORE!? $500 AFFILIATE COMMISSION!</h2>
        <p>For every new project referred to Quick Click that starts a league you will earn $500.</p>
        
        <p>Remember admins will never message you first. Be careful of others posing as Quick Click Admins.</p>
    </div>
</div>

    )
}

export default Profile;