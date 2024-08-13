import React from "react";
import cl from './Navbar.module.css'
import rocket from './rocket.png'
import leag from './leag.png'
import rewards from './medal.png'
import profile from './profile.png'
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div className={cl.Navbar}>

                <Link to="/boost/"  className={cl.NavbarItem}>
                        <div className={cl.icon}>   
                            <img src={rocket} alt="" />
                        </div>
                        <span>Boost</span>
                </Link>

            <Link to="/Leagues/" className={cl.NavbarItem}>
                <div className={cl.icon}>  
                    <img src={leag} alt="" />
                </div>
                <span>Leagues</span>
            </Link>

            <Link to="/rewards/"  className={cl.NavbarItem}>
                <div className={cl.icon}>   
                    <img src={rewards} alt="" />
                </div>
                <span>Rewards</span>
            </Link>

            <Link to="/profile/" className={cl.NavbarItem}>
                    <div className={cl.icon}>   
                        <img src={profile} alt="" />
                    </div>
                <span>Wallet</span>
            </Link>
        </div>
    )
}

export default Navbar;