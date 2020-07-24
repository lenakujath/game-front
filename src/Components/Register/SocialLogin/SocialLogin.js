import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { MyContext } from '../../../context/MyProvider';
import Api from '../../../Api/index';
import './SocialLogin.css';

const SocialLogin = (props) => {

    const { logUserIntoContext, addPicture } = React.useContext(MyContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [picture, setPicture] = useState('');
    const [posted, setPosted] = useState(false);
    // State where we are going to keep the error and messages on the register page that we receive from the backend
   // const [messages, setMessages] = useState([]);

    // const postProfile = (e) => {
    //     e.preventDefault();
   
       
    //     fetch('https://authnodejstest.herokuapp.com/api/auth/socialsign', {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //         }),
    //         //change data 
    //         body: JSON.stringify({ 
                        
    //         'name' : username.toLowerCase(),
    //         "email": email,
    //         "id": id,
    //         "picture": picture,
    //         "roles": ["user"]
                
    //              }),
    //     })
    //         .then(async (res) => {
    //             console.log(res)
    //             if (res) {
    //                 setPosted(!posted);
    //             }
    //             if (res.status === 200){
                    
    //             await fetch('https://authnodejstest.herokuapp.com/api/auth/socialsign', {
    //                 method: 'POST',
    //                 headers: new Headers({
    //                     'Content-Type': 'application/json',
    //                 }),
    //                 body: JSON.stringify({

    //                     "name": username.toLocaleLowerCase(), 
    //                     "email"   : email,       
    //                     "id": id,
    //                     "picture": picture
    //                     }),
                        
    //             }).then((res) => {
    //                 console.log('response', res);
    //                 if (res.status === 200) {
                                             
    //                    console.log('lo.ge.a.da');
    //                     return res.json();
    //                 }
    //             }).then((data) => {
    //                 console.log(data)
    //                 Api.setSessionToken(data.accessToken)
    //                 Api.setPoints({
    //                     'spotify_round_one':0,
    //                     'spotify_round_two':0,
    //                     'instagram_round_one':0,
    //                     'instagram_round_two':0,
    //                     'youtube_round_one':0,
    //                     'youtube_round_two':0,
    //                     'total_app_points': 0,
    //                     'user':data.id
    //                 }).then((resp)=>{
    //                     console.log(resp)
    //                     Api.getPoints(data.id).then((resp2)=>{
    //                         let user = {...data, ...resp2['data']};
    //                         logUserIntoContext(user);
                           
    //                         console.log('data you pass to the context', user);
    //                     })   
    //                 })                  
    //             });
    //             }
    //             return res.json();
    //         })
    //         .then((dataJSON) => {
    //             console.log(dataJSON)
    //             let ret = [dataJSON]

    //             setMessages(ret);
    //             console.log(messages)
    //         });
    // };

  

    const postProfile = () => {
                
        
        
        Api.socialSignUp({
                
            'name' : username.toLowerCase(),
            "email": email,
            "id": id,
            "picture": picture,
            "roles": ["user"]
                    
             
             }).then((data) => {
                 
                Api.setSessionToken(data.data.accessToken)
                Api.setPoints({
                                             'spotify_round_one':0,
                                             'spotify_round_two':0,
                                             'instagram_round_one':0,
                                             'instagram_round_two':0,
                                             'youtube_round_one':0,
                                             'youtube_round_two':0,
                                             'total_app_points': 0,
                                              'user': data.data.id
                                         }).then((resp)=>{
                                            console.log(resp)
                                            Api.getPoints(data.data.id).then((resp2)=>{
                                                let user = {...data.data, ...resp2['data']};
                                                logUserIntoContext(user);
                                                window.location.reload(true);
                                                console.log('data you pass to the context', user);
                                            })   
                                        }) 
             },(err)=>{

             })
            };



    const responseFacebook =  (response) => {
        console.log(response);
        
        setEmail(response.email);
        setUsername(response.name);
        setId(response.id);
        setPicture(response.picture.data.url);
     
      }
    
      const responseGoogle =  (response) => {
        console.log(response);  
        console.log((response.profileObj.imageUrl));
        setEmail(response.profileObj.email);
        setUsername(response.profileObj.givenName);
        setId(response.profileObj.googleId);
        setPicture(response.profileObj.imageUrl);
               
      }

    
    return (
        <MyContext.Consumer>
        {(context) => (
     <div>

           
           <FacebookLogin           
            appId="1001755983615818" //APP ID 
            fields="name,email,picture"
            callback={responseFacebook}
            
            />
            
             {id
            ?
            <button onClick={postProfile}>sign</button>
            :
            <p>chose network</p>
        } 
          

            
            <GoogleLogin           
            clientId="278860152347-ojkar9rh5hg8o2drhgrf3gc4taq0o9q3.apps.googleusercontent.com" //CLIENTID 
            buttonText=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />

        
    </div>
          )}
          </MyContext.Consumer>
  );
};

export default SocialLogin;