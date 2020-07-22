/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
import React, { Fragment, useState } from 'react';
import Api from '../../../../Api';
import { MyContext } from '../../../../context/MyProvider';
// import '../UserProfile/Userprofile.css';
import texts from '../../../../texts.json';

//steps to follow: import JSON
//

const Login = (props) => {

    const { logUserIntoContext, addPoints, state } = React.useContext(MyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const closeModal = () => {
        const closeModalButton = document.querySelector('.modalClosingButton');
        closeModalButton.click();
    }

    const logUser = (e) => {
        e.preventDefault();
        Api.logIn({
                 
            "pre_username": username, 
            'username' : username.toLowerCase(),
            "password": password,
                               
             }).then((resp) => {
                 
                Api.setSessionToken(resp.data.accessToken)
                closeModal()
                Api.getPoints(resp.data.id).then((resp2)=>{
                    let user = {...resp['data'], ...resp2['data']};
                    logUserIntoContext(user);
                })   
             },(err)=>{

             })
            };


        // fetch('https://authnodejstest.herokuapp.com/api/auth/signin', {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //     }),
        //     body: JSON.stringify({

        //         "username": username,             
        //         "password": password,
                               
        //          }),
                 
        // }).then((res) => {
        //     console.log('response', res);
        //     if (res.status === 200) {
        //         // alert('logged in!');
        //         closeModal()
        //         console.log('logggggged innnn');
        //         return res.json();
        //     }
        // }).then((data) => {
        //     console.log('data you pass to the context', data);
        //     logUserIntoContext(data);

        //     fetch('http://authnodejstest.herokuapp.com/api/user/getpoints', {
        //         method: 'get',
        //         headers: new Headers({
        //             'Content-Type': 'application/json',
        //             'x-access-token': data.accessToken
        //         }),
        //         params: {

        //             "id": data.id,             
                                                       
        //              },
        //     }).then((res2) => {
        //         if (res2.status === 200) {
        //             console.log('recupero Datos de puntos')
        //             return res2.json();
        //         }
        //     }).then((data)=> {
        //         console.log(data)

        //     })
            
        // });

        
        // console.log(props)
        // if (props.pageIn === 'between-rounds') {
        //     console.log('between-rounds')
        //     addPoints(props.score, 'spotify', 'one');
        // }
    

    return (
        <div>
            {/* <MyContext.Consumer>
                {(context) => ( */}
            <Fragment>
                <div id="login-tab-content" className="active tabs-content">
                    <form className="login-form" onSubmit={logUser}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            placeholder={texts[localStorage.language].username}
                            type="text"
                            className="input"
                            id="user_login"
                        />
                        <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder={texts[localStorage.language].password}
                            type="password"
                            className="input"
                            id="user_pass"
                        />
                      
                        <button className="form-btn" type="submit">{texts[localStorage.language].login}</button>
                    </form>
                </div>
            </Fragment>
            {/* )}
            </MyContext.Consumer> */}
        </div>
    );
};

export default Login;
