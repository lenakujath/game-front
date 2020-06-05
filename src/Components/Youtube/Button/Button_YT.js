import React from 'react';
import './Button_YT.css';
//import '../../Spotify/Button/Button.css'

const ButtonYT = (props) => {
    
    const { displayedSong } = props;

    const checkIt = () => {
        if (props.displayedSong === props.currentSong) {
            props.showConfetti();
            props.unmute();
        }
    
    };
    

    return (
        <button
            type="button"
             className="myButtonYT buttonYT"
            //className="myButton button"
            
            onClick={() => checkIt()}
        >
            <span className="titleColorYT">{displayedSong}</span>
        </button>
    );
};


export default ButtonYT;
