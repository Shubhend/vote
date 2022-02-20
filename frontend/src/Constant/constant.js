import {useSelector} from "react-redux";
import {reactLocalStorage} from "reactjs-localstorage";

export const REGISTER = 'REGISTER';

const userInfoStorage = reactLocalStorage.get('userInfo') ? JSON.parse(reactLocalStorage.get('userInfo')): null ;

if(userInfoStorage && userInfoStorage.token) {
     var HEADERCONFIG = {
        headers: {
            mode: 'no-cors',
            withCredentials: true,
            credentials: 'same-origin',
            'content-type': 'application/json',
            'crossDomain': true,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': userInfoStorage.token
        }
    }
}else{
     var HEADERCONFIG = {
        headers: {
            mode: 'no-cors',
            withCredentials: true,
            credentials: 'same-origin',
            'content-type': 'application/json',
            'crossDomain': true,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    }
}

export {HEADERCONFIG};