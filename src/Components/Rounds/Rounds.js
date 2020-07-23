/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import homebtn from '../../Pictures/home45.png';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Register from '../Register/Register';
import Spotify from '../Utils/Spotify';
import PopUp from '../Rounds/PopUp';


class Rounds extends React.Component {

    state = {
        
        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
        accessToken: '',
        
    }


    getToken = () => {

         this.setState({

             accessToken: Spotify.getaccessToken()
          })
        
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


        const { page, instagram, youtube, spotify, button, popUp } = this.state;

        const { language, score } = this.props;

        const loginComp = (context) => {

            const { state: { username, email } } = context;
    
            if (username || email) {
               
                return (
                    <Register buttonStyle={'button1'} buttonText={texts[language].startRound2Spotify}
                     score={score} currentGame="spotify" language={language} />
                );
            }
    
            return <UserForm language={language} score={score} gameIn="spotify" />;
        };

        const loginComp2 = (context) => {

            const { state: { username, email } } = context;
    
            if (username || email) {
               
                return (
                    
                    <Register buttonStyle={'button1'} buttonText={texts[language].startRound2Instagram}
                     score={score} currentGame="instagram" language={language} />
                );
            }
    
            return <UserForm language={language} score={score} gameIn="spotify" />;
        };

        return (
            <MyContext.Consumer>
            {(context) => (
                <>
            <div>
                <div className={popUp}>

                </div>
                {/* displaying the appropriate introduction, depending on chosen game */}
                <div className={page}>
                    <div className="title" style={{marginTop:'-25vh'}}>
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
                    </div>

                    {/* displaying the appropriate button depending on user choise
                    {context.state.spotify_round_one ? context.state.spotify_round_one : texts[language].roundOneText} */}

                    {/* button invokes a method that first shows popup and then with set timeout got to spotifyroundone 
                    clicked ? <SpotifyRoundone/>
                    <button className="button1" type="button">
                        {context.state.spotify_round_one || texts[language].roundOneText}</button>
                    
                    */}
                     <div className={youtube || instagram ? 'hideGame' : 'title'}>
                     <DelayLink  delay={4000} clickAction={this.popUp}   to="spotifyroundone" >
                   <PopUp/>
                    </DelayLink> 
                    </div>
                    <div className={youtube || instagram ? 'hideGame' : 'title'}>{loginComp(context)}</div>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Spotify}</button></Link>
                    
                    <div style={{position:'absolute',maxWidth:'600px',backgroundColor:'red',marginLeft:'auto',marginRight:'auto',height:'300px'}}>

                    <Link className={youtube ? 'title' : 'hideGame'} to="youtuberoundone" style={{position:'relative',top:'2rem'}}><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <Link className={youtube ? 'title' : 'hideGame'} to="/"><button className="button1" type="button">{texts[language].startRound2Youtube}</button></Link>
                    <Link className={youtube ? 'title' : 'hideGame'} to="/"><button className="button1" type="button">{texts[language].startRound3Youtube}</button></Link>
                    </div>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <div className={spotify || youtube ? 'hideGame' : 'title'} >{loginComp2(context)}</div>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Instagram}</button></Link>
                </div>
                
                <div className="home-play-buttons">
                 

                    <div>
                        {  this.state.accessToken ?
                            <button type="button" className={this.props.spotifyButton} onClick={this.startSpotify}>
                            <i class="fab fa-spotify"></i>
                                {texts[language].spotifyPlayWithButton}
                            </button>
                            :
                            <button className={this.props.tokenButton} onClick={this.getToken}>
                              <i class="fab fa-spotify"></i>
                             Get key for Spotify
                            </button>
                        }
                    </div>
                    
                    <button type="button" className={this.props.youtubeButton} onClick={this.startYoutube}>
                    <i class="fab fa-youtube"></i>
                        {texts[language].youtubePlayWithButton}
                    </button>
                    <button type="button" className={this.props.instagramButton} onClick={this.startInsta}>
                    <i class="fab fa-instagram"></i>
                        {texts[language].instagramPlayWithButton}
                    </button>
                    <Link className={this.props.homeButton} to="/"><img className={"home-btn-image"} src={homebtn}/>
                    {texts[language].home}</Link>
                </div>

            
            </div>
            </>
            )}
        </MyContext.Consumer>
        );
    }
}

Rounds.contextType = MyContext;

export default Rounds;
