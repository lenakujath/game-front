import React, { Fragment, useState } from 'react';
import { MyContext } from '../../../../context/MyProvider';
import './UserProfile.css';
import  profile  from '../../../../Pictures/user.png'
import texts from '../../../../texts.json';

const UserPofile = ({language}) => {

    const { state, logUserIntoContext } = React.useContext(MyContext);
    
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [editing, setEdit] = useState(false);

    const postChange = (e) => {

        e.preventDefault();
        console.log(username, phone, region);
        
    }

 
    return (
        <div className="profile-text">
            <MyContext.Consumer>
                {(context) => (
                    <div className='profile-content'>
                        <hr />
                        <div className='myprofile-title'>
                        <img src={context.state.picture || profile} alt="profile icon" className= 'profile-icon-user'/>                    
                       
                        <h1>{context.state.username}</h1>    
                                                                         
                        </div>
                        <a onClick={() => { context.clearUser(); console.log('clicked'); }}>Salir</a>
                        <hr />
                        
                          {editing

                        ?
                            <div>
                                <form onSubmit={postChange}>
                                {/* <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="mail"
                                    placeholder='email'
                                    type="email"
                                    className="input"
                                    id="user_email"
                                /> */}

                                {/* <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    name="username"
                                    placeholder='your name'
                                    type="text"
                                    className="input"
                                    id="user_name"
                                /> */}

                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    name="phone"
                                    placeholder={texts[language].phone}
                                    type="text"
                                    className="input"
                                    id="phone_number"
                                />

                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    name="City"
                                    placeholder={texts[language].phone}
                                    type="text"
                                    className="input"
                                    id="city"
                                />

                                <input
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    name="region"
                                    placeholder={texts[language].state}
                                    type="text"
                                    className="input"
                                    id="region"
                                />
                                <button className="safeBtn" type="submit">Safe</button>
                                 </form>
                            </div>
                        :
                            <div>
                                    <h6> {texts[language].mail}:
                                    <p className="myprofile-h6">{context.state.email}</p>
                                    </h6>

                                    <h6>
                                     {texts[language].username}:
                                    <p className="myprofile-h6">{context.state.username}</p>
                                    </h6>

                                    <h6>
                                        {texts[language].phone}:
                                        <p className="myprofile-h6"></p>
                                    </h6>

                                    <h6>
                                        {texts[language].city}:
                                        <p className="myprofile-h6"></p>
                                    </h6>

                                    <h6>
                                        {texts[language].state}:
                                        <p className="myprofile-h6"></p>
                                     </h6>
                                    </div>                      
                        }           

                        <h6>
                            {texts[language].pointsComplete}:
                            <p className="myprofile-h6">{context.state.total_app_points}</p>
                        </h6>

                        <h4 className="myprofile-h4">
                            {texts[language].profileMessage}
                        </h4>

                        <hr />
                        <button className="myprofile-btn" onClick={() => setEdit(true)}>{texts[language].completeProfile}</button>
                        {editing
                        ?
                        <button className="cancelBtn" onClick={() => setEdit(false)}>{texts[language].cancel}</button>
                        :
                        <p></p>
                        }
                     
                    </div>
                )}
            </MyContext.Consumer>
        </div>
    );
};

export default UserPofile;
