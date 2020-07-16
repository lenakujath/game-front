/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import homebtn from '../../Pictures/home45.png';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Register from '../Register/Register';
import Spotify from '../Utils/Spotify';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


const onSuccess = response => console.log(response);
 const onFailure = response => console.error(response);

class Rounds extends React.Component {

    state = {
        
        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
        accessToken: ''
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

        // localStorage.setItem('spotifyRound', true);

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

        const responseFacebook = (response) => {
            console.log(response);
          }
        
          const responseGoogle = (response) => {
            console.log(response);
          }

        const { page, instagram, youtube, spotify, button } = this.state;

        const { language, score } = this.props;

        const loginComp = (context) => {

            const { state: { username } } = context;
    
            if (username) {
               
                return (
                    <Register buttonStyle={'button1'} buttonText={texts[language].startRound2Spotify} score={score} currentGame="spotify" language={language} />
                );
            }
    
            return <UserForm language={language} score={score} gameIn="spotify" />;
        };

        const loginComp2 = (context) => {

            const { state: { username } } = context;
    
            if (username) {
               
                return (
                    
                    <Register buttonStyle={'button1'} buttonText={texts[language].startRound2Instagram} score={score} currentGame="instagram" language={language} />
                );
            }
    
            return <UserForm language={language} score={score} gameIn="spotify" />;
        };

        return (
            <MyContext.Consumer>
            {(context) => (
                <>
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
                        
                    </div>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="spotifyroundone"><button className="button1" type="button">{context.state.spotify_round_one}</button></Link>
                    <div className={youtube || instagram ? 'hideGame' : 'title'} >{loginComp(context)}</div>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Spotify}</button></Link>
                    
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="youtuberoundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound2Youtube}</button></Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Youtube}</button></Link>

                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <div className={spotify || youtube ? 'hideGame' : 'title'} >{loginComp2(context)}</div>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Instagram}</button></Link>
                </div>
                
                <div className="home-play-buttons">

                    <FacebookLogin

                    className={this.props.youtubeButton}
                    appId="1001755983615818" //APP ID 
                    fields="name,email,picture"
                    callback={responseFacebook}
                    />
                    <br />
                    <br />

                    <GoogleLogin

                    className={this.props.youtubeButton}
                    clientId="278860152347-ojkar9rh5hg8o2drhgrf3gc4taq0o9q3.apps.googleusercontent.com" //CLIENTID 
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    />
                        <br />
                        <br />

                 

                    <div>
                        {  this.state.accessToken ?
                            <button type="button" className={this.props.spotifyButton} onClick={this.startSpotify}>
                            <i class="fab fa-spotify"></i>
                                {texts[language].spotifyPlayWithButton}
                            </button>
                            :
                            <button className={this.props.youtubeButton} onClick={this.getToken}>
                              <i class="fab fa-spotify"></i>
                             {texts[language].spotifyPlayWithButton}
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
