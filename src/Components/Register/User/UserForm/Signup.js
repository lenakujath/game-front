import React, { useState } from 'react';
import texts from '../../../../texts.json';

const SignUp = ({ language }) => {

    console.log(texts[language]);

    // const { logUserIntoContext } = React.useContext(MyContext);
    // const [users, updateUsers] = useState([]);
  
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [repeatedPassword, setRepeatedPassword] = useState('');
    const [posted, setPosted] = useState(false);

    // State where we are going to keep the error and messages on the register page that we receive from the backend
    const [messages, setMessages] = useState([]);

    const postProfile = (e) => {
        e.preventDefault();
   //test password: no error --> fetch
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
            .then((res) => {
                if (res) {
                    setPosted(!posted);
                }
                return res.json();
            })
            .then((dataJSON) => {
                setMessages(dataJSON);
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
                <br />
                <button className="form-btn" type="submit">
                    Regístrate
                    {/* {texts[language].register}  */}
                </button>
            </form>
            {messages.length > 0 && <div style={{ color: messages[0].color }}>{messages[0].msg}</div>}
        </div>
    );
};

export default SignUp;
