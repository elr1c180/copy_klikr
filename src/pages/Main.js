import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MainComponent from "../components/main/Main";
import cl from './src/Main/Main.module.css'
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Main = () => {
  const [platform, setPlatform] = useState('');
  const location = useLocation();

    useEffect(() => {
        // Прокрутка страницы к верху при каждом изменении маршрута
        window.scrollTo(0, 0);
      }, [location.pathname]);

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
    if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
            setPlatform(window.Telegram.WebApp.platform)
        }
    }
}, []);
  console.log(location.pathname)
    window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
    window.Telegram.WebApp.setHeaderColor('#000000');

    return (
      <>
            {platform !== 'tdesktop' && platform !== 'macos' ? (
                <div>
                    <MainComponent />
                    <Navbar />
                </div>
            ) : (
                <div className={cl.MobileAlert}>
                    <center><p>Only available on mobile</p></center>
                </div>
            )}
        </>
    );
}

export default Main;