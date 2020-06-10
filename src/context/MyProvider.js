/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

export const MyContext = React.createContext();


class MyProvider extends Component {

    state = {
        
        username: '',
        email: '',
        points_spotify_round_one: '',
        points_spotify_round_two: '',
        points_instagram_round_one: '',
        points_instagram_round_two: '',
        points_youtube_round_one: '',
        points_youtube_round_two: '',
        total_app_points: '',

        activePanel: 'signup',
        language: 'spanish',
        authed: true,
    }

    updateTotalPoints = () => {
        const keysArray = [
            'points_spotify_round_one',
            'points_spotify_round_two',
            'points_instagram_round_one',
            'points_instagram_round_two',
            'points_youtube_round_one',
            'points_youtube_round_two',
        ];

        let total = '';

        keysArray.forEach((key) => {
            total += this.state[key];
        });

        this.setState({
            total_app_points: total,
        });
    };

    render() {

        const { points: activePanel } = this.state;
        // We rename points so we can after do 'points: this.state.points + points' without problems

        const { children } = this.props;

        return (
            <MyContext.Provider value={{
                state: this.state,

                addPoints: (newPoints, gameName, roundIn) => {
                    if (newPoints >= this.state[`points_${gameName}_round_${roundIn}`]) {
                        this.setState({
                            [`points_${gameName}_round_${roundIn}`]: newPoints,
                        }, this.updateTotalPoints);
                    }
                },

                clearUser: () => this.setState({
                   
                    username: '',
                    email: '',
                    points_spotify_round_one: '',
                    points_spotify_round_two: '',
                    points_instagram_round_one: '',
                    points_instagram_round_two: '',
                    points_youtube_round_one: '',
                    points_youtube_round_two: '',
                    total_app_points: '',
                    // activePanel: 'login',
                    language: 'spanish',
                    authed: false,
                }),

                logUserIntoContext: (data) => this.setState({
                    username: data.username,
                    email: data.email,
                    points_spotify_round_one: data.points_spotify_round_one,
                    points_spotify_round_two: data.points_spotify_round_two,
                    points_instagram_round_one: data.points_instagram_round_one,
                    points_instagram_round_two: data.points_instagram_round_two,
                    points_youtube_round_one: data.points_youtube_round_one,
                    points_youtube_round_two: data.points_youtube_round_two,
                    activePanel: 'login',
                    language: 'spanish',
                    authed: true,
                }),

                replaceState: (newState) => this.setState(newState),

                // login sign up switch
                activePanel,
                actions: {
                    handlePanelSwitch: (newPanel) => {
                        this.setState({
                            activePanel: newPanel,
                        });
                    },
                },
            }}
            >
                {children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;
