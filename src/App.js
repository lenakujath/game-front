/* eslint-disable max-len */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import SpotifyRoundOne from './Components/Spotify/SpotifyRoundOne/SpotifyRoundOne';
import SpotifyRoundTwo from './Components/Spotify/SpotifyRoundTwo/SpotifyRoundTwo';
import Home from './Components/Home/Home';
import InstagramRoundTwo from './Components/Instagram/InstagramRoundTwo/InstagramRoundTwo';
import InstagramRoundOne from './Components/Instagram/InstagramRoundOne/InstagramRoundOne';
import SocialMedia from './Components/SocialMedia/SocialMedia';
import Team from './Components/Team/Team';
import Navbar from './Components/Navbar/Navbar';
import YoutubeRoundOne from './Components/Youtube/YoutubeRoundOne/YoutubeRoundOne';
import YoutubeRoundTwo from './Components/Youtube/YoutubeRoundTwo/YoutubeRoundTwo';
import User from './Components/Register/User/User';
import MyProvider, { MyContext } from './context/MyProvider';
import MembersAccounts from './Components/Instagram/InstagramRoundTwo/MembersAccounts';
import './App.css';

// Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect"
//  title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Icons made by <a href="https://www.flaticon.com/authors/freepik"
//  title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from 
// <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

//heute: nach runde 1 : onclick event das round component rendered


class App extends React.Component {

  state = {
      selectedLanguage: localStorage.language || 'spanish',
  }

setLanguage = (lang, flag) => {
    this.setState({
        selectedLanguage: lang,
    });
    localStorage.setItem('language', lang);
    localStorage.setItem('flag', flag);
}



render() {

    const { selectedLanguage } = this.state;

    return (
        <MyProvider>
            <MyContext.Consumer>
                {(context) => (

                    <div>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <div>
                                    
                                        <Navbar language={context.state.language} pagein="home" onChangeLanguage={this.setLanguage} />
                                        <Home language={selectedLanguage} {...props} />
                                        <div className="social-media-follow-buttons">
                                            <SocialMedia language={selectedLanguage} {...props} />
                                        </div>
                                    </div>
                                )}
                            />

                            <Route
                                path="/spotifyroundone"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <SpotifyRoundOne language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <PrivateRoute
                                authed={context.state.authed}
                                path="/spotifyroundtwo"
                                component={(props) => (
                                    <div>
                                        <Navbar {...props} pagein="game" language={selectedLanguage} />
                                        <SpotifyRoundTwo {...props} language={selectedLanguage} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/team"
                                render={(props) => (
                                    <div>
                                        <Navbar />
                                        <Team language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/instagramroundone"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <InstagramRoundOne language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <PrivateRoute
                                authed={context.state.authed}
                                path="/instagramroundtwo"
                                component={(props) => (
                                    <div>
                                        <Navbar {...props} pagein="game" language={selectedLanguage} />
                                        <InstagramRoundTwo {...props} language={selectedLanguage} />
                                    </div>
                                )}
                            />

                            {/* explanation video here https://www.youtube.com/watch?v=By7vJuSPaYo */}
                            {/* explanation code here https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4 */}

                            <Route
                                path="/youtuberoundone"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <YoutubeRoundOne language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <PrivateRoute
                                authed={context.state.authed}
                                path="/youtuberoundtwo"
                                component={(props) => (
                                    <div>
                                        <Navbar {...props} pagein="game" language={selectedLanguage} />
                                        <YoutubeRoundTwo {...props} language={selectedLanguage} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/members"
                                render={(props) => (
                                    <div>
                                        <Navbar {...props} language={selectedLanguage} />
                                        <MembersAccounts language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/user"
                                render={(props) => (
                                    <div>
                                        <Navbar {...props} language={selectedLanguage}/>
                                        <User {...props} language={selectedLanguage}  />
                                    </div>
                                )}
                            />
                        </Switch>
                    </div>

                )}


            </MyContext.Consumer>
        </MyProvider>
    );
}
}

export default App;
