import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MainComponent from "../components/main/Main";

const Main = () => {
    window.Telegram.WebApp.setBackgroundColor('#000000');
    window.Telegram.WebApp.setHeaderColor('#ffffff');
    return (
        <div>
            <MainComponent/>
            <Navbar/>
        </div>
    )
}

export default Main;