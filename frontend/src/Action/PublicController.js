import {HEADERCONFIG} from "../Constant/constant";
import axiosHelper from "../Helper/axios";
import Notify from "../Helper/notify";


export  const GetCountry = async () =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.get('/api/public/getCountry', config);

        return data;
}


export  const GetCategory = async () =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.get('/api/public/getCategory', config);

        return data;
}

export  const GetState = async (cid) =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.get('/api/public/getState?countryId='+cid, config);

        return data;
}

export  const GetCity = async (cid,sid) =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.get('/api/public/getCity?countryId='+cid+'&&stateId='+sid, config);

        return data;
}
