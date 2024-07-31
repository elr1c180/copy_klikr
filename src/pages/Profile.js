import React from "react";
import cl from './src/Profile/Profile.module.css'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from './src/Profile/profile.png'

const Profile = () => {
    const [username, setUsername] = useState('');
    const [userPhoto, setUserPhoto] = useState(profile);

    const navigate = useNavigate();
    var BackButton = window.Telegram.WebApp.BackButton;
    BackButton.show();

    BackButton.onClick(function() {
        BackButton.hide();
    });
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/main');
    });

    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUsername(user.username || `${user.first_name} ${user.last_name}`);
                setUserPhoto(user.photo_url);
            }
        }
    }, []);
    return (
        <div className={cl.profileWrap}>
            <img src={userPhoto} className={cl.profileImg} alt="profile"/>
            <p>@{username}</p>
            <hr></hr>
        </div>
    )
}

export default Profile;