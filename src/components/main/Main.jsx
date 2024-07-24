import React from "react";
import cl from './Main.module.css'
import clicker from './dollar.png'
import energy from './lightning.png'
import top from './chart.png'
import { useState } from "react";

const MainComponent = () => {

    // const [count, SetCount] = useState(0)

    return (
        <div className={cl.MainComponent}>
            <div className={cl.Leadersboard}>
                <div className={cl.Place}>
                    <img src={top} alt="top" />
                    <span>Place 27k <i class="fa-solid fa-chevron-right"></i></span>
                </div>
                <span className={cl.End}>Ends in</span>
            </div>
            <div className={cl.Score}>
                <h2>0</h2>
            </div>
            <div className={cl.Clicker}>
                <img src={clicker} alt=""/>
            </div>

            <div className={cl.Energy}>
                <label for="enegry"> <img src={energy} alt="energy"/> <span>2000</span></label>
                <progress id="energy" className={cl.energyBar} max="2000" value="100"></progress>
            </div>
        </div>
    )
}

export default MainComponent;