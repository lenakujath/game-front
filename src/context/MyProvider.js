/* eslint-disable react/no-unused-state */
import React, {useState, useEffect, Component } from 'react';
import Api from '../Api'
export const MyContext = React.createContext();

export default (props) => {
//class MyProvider extends Component {

    const [state,setState] = useState({
        accessToken: '',
        username: '',
        user:'',
        email: '',
        spotify_round_one: '',
        spotify_round_two: '',
        instagram_round_one: '',
        instagram_round_two: '',
        youtube_round_one: '',
        youtube_round_two: '',
        total_app_points: '',
        activePanel: 'signup',
        language: 'spanish',
        authed: true,
    })

    useEffect(() => {
        let session = localStorage.getItem('session')
        if (session){
            const sessionJson = JSON.parse(session)
            setState(sessionJson)
            Api.setSessionToken(sessionJson.accessToken)
        }
    },[])

    const changeState = (newState) => {
        console.log('NUEVO STATE',newState)
        setState(newState)
        localStorage.setItem('session',JSON.stringify(newState))
        console.log(localStorage.getItem('session'))
        console.log('STATE', state)
    }

    const updateTotalPoints = () => {
        const keysArray = [
            'spotify_round_one',
            'spotify_round_two',
            'instagram_round_one',
            'instagram_round_two',
            'youtube_round_one',
            'youtube_round_two',
        ];

        let total = 0;

        keysArray.forEach((key) => {
            total += parseInt(state[key]);
        });

        changeState({
            ...state,
            total_app_points: total,
        });
    };

    const { points: activePanel } = state;
    // We rename points so we can after do 'points: state.points + points' without problems

    const { children } = props;

    return (
        <MyContext.Provider value={{
            state: state,

            addPoints: (newPoints, gameName, roundIn) => {
                console.log('ADD PONITS')
                console.log(newPoints)
                console.log(gameName)
                console.log(roundIn)
                console.log(`${gameName}_round_${roundIn}`)
                console.log(state[`${gameName}_round_${roundIn}`])
                if ((newPoints >= parseInt(state[`${gameName}_round_${roundIn}`]))) {
                    let index = `${gameName}_round_${roundIn}`;
                    console.log('roundIn',index)
                    changeState({
                        ...state,
                        [index]: newPoints,
                    } );
                    
                }
                
                console.log(state)
                updateTotalPoints()
                console.log(state)
                console.log(newPoints)
                Api.setPoints({
                    'spotify_round_one':state.spotify_round_one,
                    'spotify_round_two':state.spotify_round_two,
                    'instagram_round_one':state.instagram_round_one,
                    'instagram_round_two':state.instagram_round_two,
                    'youtube_round_one':state.youtube_round_one,
                    'youtube_round_two':state.youtube_round_two,
                    'total_app_points': state.total_app_points,
                    'user':state.user
                }).then((resp)=>{
                    console.log(resp)
                })
            },

            clearUser: () => changeState({
                accessToken:'',
                username: '',
                user:'',
                email: '',
                spotify_round_one: '',
                spotify_round_two: '',
                instagram_round_one: '',
                instagram_round_two: '',
                youtube_round_one: '',
                youtube_round_two: '',
                total_app_points: '',
                // activePanel: 'login',
                language: 'spanish',
                authed: false,
            }),

            logUserIntoContext: (data) => changeState({
                accessToken: data.accessToken,
                username: data.username,
                user:data.user,
                email: data.email,
                spotify_round_one: data.spotify_round_one,
                spotify_round_two: data.spotify_round_two,
                instagram_round_one: data.instagram_round_one,
                instagram_round_two: data.instagram_round_two,
                youtube_round_one: data.youtube_round_one,
                youtube_round_two: data.youtube_round_two,
                activePanel: 'login',
                language: 'spanish',
                authed: true,
            }),

            replaceState: (newState) => changeState(newState),

            // login sign up switch
            activePanel,
            actions: {
                handlePanelSwitch: (newPanel) => {
                    changeState({
                        ...state,
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
