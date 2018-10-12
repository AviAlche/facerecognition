import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain-logo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0"> 
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3 "> 
                    <img src={brain} style={{paddingTop:"8px"}} alt="brain" height="100" width="100"></img>
                </div>
            </Tilt>
        </div>

    );
}

export default Logo;