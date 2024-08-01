import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './Main.module.css';
import top from './top.png';
import energy from './lightning.png';
import logo from './logo.png'

const MainComponent = () => {
    const [username, setUsername] = useState('');
    const [chatId, setChatId] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [responseMessage, setResponseMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [energyCount, setEnergy] = useState(2000);
    const [isClicked, setIsClicked] = useState(false);
    const [clickPositions, setClickPositions] = useState([]);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUsername(user.username || `${user.first_name} ${user.last_name}`);
                setChatId(user.id);
            } else {
                setUsername('elesinanton');
            }
        }
    }, []);

    async function sendData() {
        const userData = {
            chat_id: chatId || 123,  // Используйте переменные состояния, если они доступны
            username: username || "123"
        };

        try {
            const response = await fetch('https://clicktothesky.com/api/check_or_create_user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response:', data);
            
            if (data && data.message) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage('Неизвестный формат ответа от сервера');
            }
        } catch (error) {
            console.error('Ошибка при записи данных:', error);
            setError(`Ошибка сети: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        sendData();
    }, [username, chatId]);

    

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
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseMessage && <p>Ответ от сервера: {responseMessage}</p>}
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
                <img src={logo} className={`${isClicked ? cl.Clicked : ''}`} alt="" onTouchStart={handleClick}/>
                {clickPositions.map((pos) => (
                    <div
                        key={pos.id}
                        className={cl.clickCounter}
                        style={{ top: `${pos.y}px`, left: `${pos.x + 80}px` }}
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
    );
}

export default MainComponent;
