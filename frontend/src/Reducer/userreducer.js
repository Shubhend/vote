import {USERREGISTER,USERLOGIN,USERLOGOUT} from "../Constant/UserConstant";

export const userreducer = (state={},action) =>{

    switch (action.type){
        case USERLOGIN:
            return {userInfo:action.payload}
        case USERREGISTER:
            return {userInfo:action.payload}
        case USERLOGOUT:
            return {}
        default:
            return state;

    }



}