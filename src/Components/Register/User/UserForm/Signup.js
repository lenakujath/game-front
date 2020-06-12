import React, { useState } from 'react';
import texts from '../../../../texts.json';
import Login from './Login';
import { MyContext } from '../../../../context/MyProvider';
import { red } from 'color-name';

const SignUp = ({ language }) => {

    console.log(texts[language]);

    const { logUserIntoContext } = React.useContext(MyContext);
    // const [users, updateUsers] = useState([]);
  
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [posted, setPosted] = useState(false);

    // State where we are going to keep the error and messages on the register page that we receive from the backend
    const [messages, setMessages] = useState([]);

    const closeModal = () => {
        const closeModalButton = document.querySelector('.modalClosingButton');
        closeModalButton.click();
    }

    const formValidates = () => {
        let validates = true
        let tmpMessages = []
        if(username == ''){
            tmpMessages.push({
                color:'white',
                message:'El nombre de usuario no puede estar vacio'
            })
            validates = false;
        }

        if(email == ''){
            tmpMessages.push({
                color:'white',
                message:'El correo electronico no puede estar vacio'
            })
            validates = false;
        }

        if(password == ''){
            tmpMessages.push({
                color:'white',
                message:'La contrasena no puede estar vacia.'
            })
            validates = false;
        }

        if (password !== repeatedPassword){
            tmpMessages.push({
                color:'white',
                message:'Las contrasenas no coinciden.'
            })
            validates = false;
        }
        
        setMessages(tmpMessages)
        return validates
    }

    const postProfile = (e) => {
        e.preventDefault();
   //test password: no error --> fetch
        if (formValidates())
        fetch('https://authnodejstest.herokuapp.com/api/auth/signup', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            //change data 
            body: JSON.stringify({ 
                
            "username": username,
            "email": email,
            "password": password,
            "roles": ["user"]
                
                 }),
        })
            .then(async (res) => {
                console.log(res)
                if (res) {
                    setPosted(!posted);
                }
                if (res.status === 200){
                await fetch('https://authnodejstest.herokuapp.com/api/auth/signin', {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify({
                        "username": username,             
                        "password": password,
                        }),
                        
                }).then((res) => {
                    console.log('response', res);
                    if (res.status === 200) {
                        // alert('logged in!');
                        closeModal();
                        console.log('logggggged innnn');
                        return res.json();
                    }
                }).then((data) => {
                    console.log('data you pass to the context', data);
                    logUserIntoContext(data);
                });
                }
                return res.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
                let ret = [dataJSON]

                setMessages(ret);
                console.log(messages)
            });
    };


    return (
        <div id="signup-tab-content" className="active tabs-content">
            <form className="signup-form" onSubmit={postProfile}>
                <br />
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    placeholder='Username'
                    // placeholder={texts[language].username}
                    type="text"
                    className="input"
                    id="user_name"
                />
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="mail"
                    placeholder="e-mail"
                    // placeholder={texts[language].mail}
                    type="email"
                    className="input"
                    id="user_email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder='password'
                    // placeholder={texts[language].password}
                    type="password"
                    className="input"
                    id="user_pass"
                />
                <input
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    name="repeatedPassword"
                    placeholder='Reingresar password'
                    // placeholder={texts[language].password}
                    type="password"
                    className="input"
                    id="user_repeated_pass"
                />
                <br />
                <button className="form-btn" type="submit">
                    Regístrate
                    {/* {texts[language].register}  */}
                </button>
            </form>
            <ul>
            {messages.map((value, index) => {
                return <li key={index}>{value['message']}</li>
            })}
            </ul>
            {/* {messages.length > 0 && <div style={{ color: messages[0].color }}>{messages[0].message}</div>} */}
        </div>
    );
};

export default SignUp;
