import React from "react";
import cl from './Main.module.css';
import clicker from './dollar.png';
import energy from './lightning.png';
import top from './chart.png';
import { useState, useEffect } from "react";
import axios from "axios";

const MainComponent = () => {

    async function sendTestData() {
        const userData = {
            chat_id: window.Telegram.WebApp.initDataUnsafe.user.id,
            username: window.Telegram.WebApp.initDataUnsafe.user.username
        };
    
        try {
            const response = await axios.post('http://162.213.249.107:9000/api/check_or_create_user/', userData);
            
            if (response.data && response.data.message) {
                console.log('Ответ от сервера:', response.data.message);
            } else {
                console.error('Неизвестный формат ответа от сервера:', response);
            }
        } catch (error) {
            console.error('Ошибка при записи тестовых данных:', error);
        }
    }
    
    sendTestData();
    

    const [clickCount, setClickCount] = useState(0);
    const [energyCount, setEnergy] = useState(2000);
    const [isClicked, setIsClicked] = useState(false);
    const [clickPositions, setClickPositions] = useState([]);
    const [counter, setCounter] = useState(0);

    const handleClick = (event) => {
        if (energyCount > 0) {
            setClickCount(prevClickCount => prevClickCount + 1);
            setEnergy(prevEnergyCount => prevEnergyCount - 1);

            
            if (window.Telegram.WebApp.HapticFeedback) {
                console.log('HapticFeedback доступен.');
                
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
              }
        

        } else {
            window.Telegram.WebApp.showAlert("Energy is lost!");
        }

        setIsClicked(true);
        setCounter(prevCounter => prevCounter + 1);

        const boundingRect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.touches ? event.touches[0].clientX - boundingRect.left : event.clientX - boundingRect.left;
        const offsetY = event.touches ? event.touches[0].clientY - boundingRect.top : event.clientY - boundingRect.top;

        setClickPositions(prevClickPositions => [
            ...prevClickPositions, 
            { x: offsetX, y: offsetY, id: counter }
        ]);

        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setClickPositions(prevClickPositions => prevClickPositions.filter(pos => pos.id !== counter - 10));
        }, 1000);

        return () => clearInterval(interval);
    }, [counter]);

    return (
        <div className={cl.MainComponent}>
            <div className={cl.Leadersboard}>
                <div className={cl.Place}>
                    <img src={top} alt="top"/>
                    <span>Place 27k <i className="fa-solid fa-chevron-right"></i></span>
                </div>
                <span className={cl.End}>Ends in</span>
            </div>
            <div className={cl.Score}>
                <h2>{clickCount}</h2>
            </div>
            
            <div className={cl.Clicker}>
                <img src={clicker} className={`${isClicked ? cl.Clicked : ''}`} alt="" onTouchStart={handleClick}/>
                {clickPositions.map((pos) => (
                    <div
                        key={pos.id}
                        className={cl.clickCounter}
                        style={{ top: `${pos.y}px`, left: `${pos.x+80}px` }}
                    >
                        +1
                    </div>
                ))}
            </div>

            <div className={cl.Energy}>
                <label htmlFor="energy"> <img src={energy} alt="energy"/> <span>{energyCount}</span></label>
                <progress id="energy" className={cl.energyBar} max="2000" value={energyCount}></progress>
            </div>
        </div>
    )
}

export default MainComponent;
