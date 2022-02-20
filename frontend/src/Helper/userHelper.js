import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {HEADERCONFIG} from "../Constant/constant";
import axiosHelper from "./axios";
import {reactLocalStorage} from "reactjs-localstorage";


export  const GetProfile = async () =>{

    const config = await getHeader();
    const data= await axiosHelper.get('/api/user/profile', config);

    return data.data;
}

export const getHeader = async ()=>{

    const userInfoStorage = await reactLocalStorage.get('userInfo') ? JSON.parse(reactLocalStorage.get('userInfo')): null ;

    if(userInfoStorage && userInfoStorage.token) {
        var headerConfig = {
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
        var headerConfig = {
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

    return headerConfig;


}