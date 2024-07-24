import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MainComponent from "../components/main/Main";
import { useEffect } from "react";


const Main = () => {
    useEffect(() => {
        // Подключаем Telegram Web App SDK
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.ready(function() {
            window.Telegram.WebApp.expand();
          });
        }
      }, []);
    return (
        <div>
            <MainComponent/>
            <Navbar/>
        </div>
    )
}

export default Main;