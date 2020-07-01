/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import spotifyLogo from '../../Pictures/spotify-32.jpg';
import instagramLogo from '../../Pictures/instagram-6-32.jpg';
import youtubeLogo from '../../Pictures/play-4-32.jpg';
//import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import { MyContext } from '../../context/MyProvider';


class Rounds extends React.Component {

    state = {
        
        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
    }

    startSpotify = () => {

        const spotStart = true;
        const start = 'screen';

        localStorage.setItem('savedState', JSON.stringify(this.context));

        this.setState({
            spotify: spotStart,
            page: start,
            button: 'hideGame',
        });
    }

    startYoutube = () => {

        const youStart = true;
        const start = 'screen';

        this.setState({
            youtube: youStart,
            page: start,
            button: 'hideGame',
        });
    }

    startInsta = () => {

        const instaStart = true;
        const start = 'screen';

        this.setState({
            instagram: instaStart,
            page: start,
            button: 'hideGame',
        });
    }


    render() {

        const { page, instagram, youtube, spotify, button } = this.state;

        const { language } = this.props;

        return (
            <div>
                <div className={page}>
                    <div className="title">
                       <h1 >{texts[language].roundOneText}</h1>
                    {spotify ?
                        (
                            <h4>{texts[language].spotifyRoundOneQuestion}</h4>
                        )
                        : instagram ?
                        (
                            <h4>{texts[language].instagramRoundOneQuestion}</h4>
                        )
                        : youtube ?
                        (
                            <div>
                                <h4>{texts[language].youtubeInstructionsR1}</h4>
                                <h5>{texts[language].youtubeAddition}</h5> 
                             </div>
                        )
                        : null
                    }
                        {/* <h4>{texts[language].instructions}</h4> */}
                    </div>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="spotifyroundone"><button className="button1" type="button">{texts[language].startText}</button></Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="youtuberoundone"><button className="button1" type="button">{texts[language].startText}</button></Link>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startText}</button></Link>
                </div>
                <div className="home-play-buttons">
                    <button type="button" className={button} onClick={this.startSpotify}
                    >
                        <img className="home-btn-image" src={spotifyLogo} alt="music" />
                        {texts[language].spotifyPlayWithButton}
                    </button>
                    <button type="button" className={button} onClick={this.startYoutube}>
                        <img className="home-btn-image" src={youtubeLogo} alt="music" />
                        {texts[language].youtubePlayWithButton}
                    </button>
                    <button type="button" className={button} onClick={this.startInsta}>
                        <img className="home-btn-image" src={instagramLogo} alt="music" />
                        {texts[language].instagramPlayWithButton}
                    </button>
                </div>
            </div>
        );
    }
}

Rounds.contextType = MyContext;

export default Rounds;
