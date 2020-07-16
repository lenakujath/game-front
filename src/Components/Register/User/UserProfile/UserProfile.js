import React, { Fragment, useState } from 'react';
import { MyContext } from '../../../../context/MyProvider';
import './UserProfile.css';
import  profile  from '../../../../Pictures/user.png'
import texts from '../../../../texts.json';

const UserPofile = ({language}) => {

    const { state, logUserIntoContext } = React.useContext(MyContext);
    console.log(state)

 


    return (
        <div className="profile-text">
            <MyContext.Consumer>
                {(context) => (
                    <div className='profile-content'>
                        <hr />
                        <div className='myprofile-title'>
                        <img src={profile} alt="profile icon" className= 'profile-icon-user'/>
                        <h1>{context.state.username}</h1>
                        
                        </div>
                        <a onClick={() => { context.clearUser(); console.log('clicked'); }}>Salir</a>
                        <hr />
                        <h6>
                        {texts[language].mail}:
                            <p className="myprofile-h6">{context.state.email}</p>
                        </h6>
                        <h6>
                        {texts[language].username}:
                            <p className="myprofile-h6">{context.state.username}</p>
                        </h6>

                        <h6>
                            Puntos totales:
                            <p className="myprofile-h6">{context.state.total_app_points}</p>
                        </h6>

                        <h4>
                            {texts[language].profileMessage}
                        </h4>

                        <hr />
                     
                    </div>
                )}
            </MyContext.Consumer>
        </div>
    );
};

export default UserPofile;
