import React from "react";
import cl from './src/Profile/Profile.module.css'
import { useEffect } from "react";
import { useState } from "react";

const Profile = () => {
    const [userId, setUserId] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUserId(user.id || `${user.first_name} ${user.last_name}`);
                setUserPhoto(user.photo_url)
            }
        }
    }, []);
    return (
        <div className={cl.profileWrap}>
            <img src={userPhoto} className={cl.profileImg} />
            <p>{userId}</p>
        </div>
    )
}

export default Profile;