import {REGISTER} from "../Constant/constant";

export const userreducer = (state,action) =>{

    if(action.type==REGISTER){

        return {result:action.payload}
    }

    return state;
}