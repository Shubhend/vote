import axiosHelper from "../Helper/axios";
import {HEADERCONFIG} from "../Constant/constant";
import Notify from "../Helper/notify";
import {USERLOGIN, USERLOGOUT} from "../Constant/UserConstant";
import {reactLocalStorage} from "reactjs-localstorage";
import {useContext} from "react";
import {RoutesContext} from "../Context/context";

const config = '';

export  const logout = async () =>{

    const userLoggedIn={'status':true,'data':''};
    reactLocalStorage.set('userInfo','');

};

export  const register = async (values) => {

    const config = HEADERCONFIG;
    const {data} = await axiosHelper.post('/api/user/register',values,config)
    if(data.err==1){
        Notify('error',data.msg);
    }else{

        Notify('success',data.msg);
    }


    return data;
}


export const UploadProfile=(value)=>async dispatch =>{
    const formData = new FormData()
    const config = HEADERCONFIG;
    formData.append('profileImg', value)
    const {data} = await axiosHelper.post('/api/user/uploadProfile',formData,config)
    Notify('success', data.msg);

}

export const userProfile=(values) =>async dispatch =>{


    const config = HEADERCONFIG;
    const {data} = await axiosHelper.post('/api/user/updateProfile',values,config)
    Notify('success', data.msg);

}

export  const login = async (values) =>{


    const config = HEADERCONFIG;
    const {data} = await axiosHelper.post('/api/user/login',values,config)
    if(data.err){
        Notify('error',data.msg);
    }else{

        const userLoggedIn={'status':true,'data':JSON.stringify(data)};

        reactLocalStorage.set('userInfo',JSON.stringify(data));

        Notify('success',data.msg);


    }

    return data;

}

