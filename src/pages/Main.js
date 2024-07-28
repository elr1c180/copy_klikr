import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MainComponent from "../components/main/Main";

const Main = () => {
    window.Telegram.WebApp.setBackgroundColor('#FFFFFF');
    window.Telegram.WebApp.setHeaderColor('#000000');

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

    return (
        <div>
            <MainComponent/>
            <Navbar/>
        </div>
    )
}

export default Main;