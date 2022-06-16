import {HEADERCONFIG} from "../Constant/constant";
import axiosHelper from "../Helper/axios";
import Notify from "../Helper/notify";


export  const GetCountry = async () =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.get('/api/public/getCountry', config);

        return data;
}



export  const GetCampaign = async (value) =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.post('/api/public/getCampaign',value, config);

        return data;
}



export const Support = async (value) =>{

        const config = HEADERCONFIG;
        const data= await axiosHelper.post('/api/public/support',value, config);
        Notify('success',"Thanks, We will connect you soon ");
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
