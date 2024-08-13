// MainComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cl from './Main.module.css';
import top from './top.png';
import energy from './lightning.png';
import logo from './logo.png';
import Popup from './Popup'; // Import the Popup component

const MainComponent = () => {
    const [username, setUsername] = useState('');
    const [platform, setPlatform] = useState('');
    const [chatId, setChatId] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [responseMessage, setResponseMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(true);
    const [energyCount, setEnergy] = useState(2000);
    const [isClicked, setIsClicked] = useState(false);
    const [clickPositions, setClickPositions] = useState([]);
    const [counter, setCounter] = useState(0);
    const [userRank, setUserRank] = useState(null);
    const [formattedBalance, setFormattedBalance] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(true); // New state for popup visibility
    
    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUsername(user.username || `${user.first_name} ${user.last_name}`);
                setChatId(user.id);
                setPlatform(window.Telegram.WebApp.platform);
            } else {
                setUsername('elesinanton');
            }
        }
    }, []);

    async function sendData() {
        const userData = {
            chat_id: chatId,
            username: username
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
            setTimeout(() => {
                setIsLoadingScreenVisible(false);
            }, 1000);
        }
    }

    useEffect(() => {
        sendData();
    }, [username, chatId]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`https://clicktothesky.com/api/get_user_profile/?chat_id=${chatId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setClickCount(data.balance);
                setEnergy(data.energy);
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                setError(`Ошибка сети: ${error.message}`);
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
            } catch (error) {
                console.error('Ошибка при получении ранга пользователя:', error);
                setError(`Ошибка сети: ${error.message}`);
            }
        };
    
        if (chatId) {
            fetchUserProfile();
            fetchUserRank();
        }
    }, [chatId]);
    
    useEffect(() => {
        let timer;
        if (!isClicked && energyCount < 2000) {
            timer = setTimeout(() => {
                setEnergy(prevEnergy => {
                    const newEnergy = Math.min(prevEnergy + 1, 2000);
                    setEnergy(newEnergy);
                    return newEnergy;
                });
            }, 180000);
        }
    
        return () => clearTimeout(timer);
    }, [isClicked, energyCount]);
    
    async function handleClick(event) {
        if (energyCount > 0) {
            await fetch('https://clicktothesky.com/api/update_balance_and_energy/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: chatId }),
            });

            setClickCount(prevClickCount => prevClickCount + 1);
            setEnergy(prevEnergyCount => prevEnergyCount - 1);

            if (window.Telegram.WebApp.HapticFeedback) {
                console.log('HapticFeedback доступен.');
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
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
            }, 1500);
        } else {
            window.Telegram.WebApp.showAlert("Energy is lost!");
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setClickPositions(prevClickPositions => prevClickPositions.filter(pos => pos.id !== counter - 10));
        }, 1000);

        return () => clearInterval(interval);
    }, [counter]);

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    if (loading || isLoadingScreenVisible) {
        return <div className={cl.loading}><img src={logo} /><p className={cl.LoadingText}>Loading...</p></div>;
    }

    return (
        <div className={cl.MainComponent}>
            {isPopupVisible && <Popup onClose={closePopup} />} {/* Display popup if visible */}
            <div className={cl.Leadersboard}>
                <div className={cl.Place}>
                    <img src={top} alt="top"/>
                    <Link to="/Leaderboard">Place {userRank}<i className="fa-solid fa-chevron-right"></i></Link>
                </div>
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
};

export default MainComponent;
