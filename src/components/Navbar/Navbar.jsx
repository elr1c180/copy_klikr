import React from "react";
import cl from './Navbar.module.css'
import rocket from './rocket.png'
import leag from './leag.png'
import rewards from './medal.png'
import profile from './profile.png'

const Navbar = () => {

    return (
        <div className={cl.Navbar}>

            <div className={cl.NavbarItem}>
                <div className={cl.icon}>   
                    <img src={rocket} alt="" />
                </div>
                <span>Boost</span>
            </div>

            <div className={cl.NavbarItem}>
                <div className={cl.icon}>   
                    <img src={leag} alt="" />
                </div>
                <span>Leagues</span>
            </div>

            <div className={cl.NavbarItem}>
                <div className={cl.icon}>   
                    <img src={rewards} alt="" />
                </div>
                <span>Rewards</span>
            </div>

            <div className={cl.NavbarItem}>
                <div className={cl.icon}>   
                    <img src={profile} alt="" />
                </div>
                <span>Profile</span>
            </div>
        </div>
    )
}

export default Navbar;