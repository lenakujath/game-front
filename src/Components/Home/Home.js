import React from 'react';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../texts.json';
import Rounds from '../Rounds/Rounds';
// import PopUp from '../Rounds/PopUp';





// all the links to the first games are in Rounds.js now
// the links to the second Rounds in Register.js

const Home = ({ language }) => {

    return(

    <div className="container">
        <div className="main">
            <p className="playWith">{texts[language].playwithTitle}</p>
            {/* <PopUp/> */}
            <img src={logo} alt="la pegatina logo" className="laPegatina" />
           
            
            <div className="home-play-buttons">
           
                <Rounds
                    language={language} spotifyButton={'btn-game'} tokenButton={'btn-game'} youtubeButton={'btn-game'}
                    instagramButton={'btn-game'} homeButton={'hideGame'}
                />
            </div>
        </div>
    </div>
)};

export default Home;
