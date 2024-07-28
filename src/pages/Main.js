import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MainComponent from "../components/main/Main";

import axios from 'axios';

const Main = () => {
    window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
    window.Telegram.WebApp.setHeaderColor('#000000');

    return (
        <div>
            <MainComponent/>
            <Navbar/>
        </div>
    )
}

export default Main;