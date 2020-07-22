import axios from 'axios';
//import ApiConstants from './ApiConstants';
const apiUrl = 'http://authnodejstest.herokuapp.com/api/'

const instance = axios.create({
    baseURL: apiUrl
});

axios.defaults.withCredentials = true;
instance.defaults.withCredentials = false;

instance.interceptors.response.use(function (response) {
return response;
}, function (error) {
if(error && ((error.response && (error.response.status === 401||error.response.status === 403 ))|| error.message == 'Network Error' ) && window.localStorage.getItem('loggedIn')){
  // Manejar 401 403 logout  
}
return Promise.reject(error);

});

export default {
setSessionToken : function(token){
instance.defaults.headers.common['x-access-token'] = token;
},
getSessionToken : function() {
return instance.defaults.headers.common['x-access-token'];
},



signUp : function(user){
    return instance.post('auth/signup/',user);
},

socialSignUp : function(user){
    return instance.post('auth/socialsign/',user);
},


logIn : function(credentials){
    return instance.post('auth/signin/',credentials);
},

getPoints : function(user_id){
    return instance.get('user/getpoints',{params:{user:user_id}})
},

setPoints : function(points){
    return instance.post('user/setpoints',points);
}

}