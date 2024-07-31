import axios from 'axios';

async function checkOrCreateUser() {
    const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const username = window.Telegram.WebApp.initDataUnsafe.user.username; 

    try {
        const response = await axios.post('http://162.213.249.107:9000/api/check_or_create_user/', {
            chat_id: chatId,
            username: username
        });

        console.log(response.data.message);

    } catch (error) {
        console.error('Error making the request:', error);
    }
}

