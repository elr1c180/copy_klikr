import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MainComponent from "../components/main/Main";

const Main = () => {
    window.Telegram.WebApp.ready(function() {
        window.Telegram.WebApp.expand();
    });
    return (
        <div>
            <MainComponent/>
            <Navbar/>
        </div>
    )
}

export default Main;