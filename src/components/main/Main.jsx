import React from "react";
import cl from './Main.module.css'
import clicker from './dollar.png'
import energy from './lightning.png'
import top from './chart.png'
import { useState } from "react";

const MainComponent = () => {
    const [counter, setCounter] = useState(0);
    // const [userName, setUserName] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [clickPositions, setClickPositions] = useState([]);
    const [energyCount, setEnergy] = useState(2000);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (event) => {
        setClickCount(clickCount + 1);
        setEnergy(energyCount - 1);
        setIsClicked(true);

        setCounter()

        const boundingRect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const offsetY = event.clientY - boundingRect.top;

        setClickPositions([...clickPositions, { x: offsetX, y: offsetY, id: counter }]);

        
        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    return (
        <div className={cl.MainComponent}>
            <div className={cl.Leadersboard}>
                <div className={cl.Place}>
                    <img src={top} alt="top"/>
                    <span>Place 27k <i class="fa-solid fa-chevron-right"></i></span>
                </div>
                <span className={cl.End}>Ends in</span>
            </div>
            <div className={cl.Score}>
                <h2>{clickCount}</h2>
            </div>
            
            <div className={cl.Clicker}>
                <img src={clicker} className={`${isClicked ? cl.Clicked : ''}`} alt="" onClick={handleClick}/>
                {clickPositions.map((pos) => (
                <div
                    key={pos.id}
                    className={cl.clickCounter}
                    style={{ top: `${pos.y+220}px`, left: `${pos.x+100}px` }}
                >
                    +1
                </div>
            ))}
            </div>

            <div className={cl.Energy}>
                <label for="enegry"> <img src={energy} alt="energy"/> <span>{energyCount}</span></label>
                <progress id="energy" className={cl.energyBar} max="2000" value={energyCount}></progress>
            </div>
        </div>
    )
}

export default MainComponent;