import {HEADERCONFIG} from "../Constant/constant";
import axiosHelper from "../Helper/axios";
import Notify from "../Helper/notify";



export  const GetCampaignStaticsData = async (value) =>{

    const config = HEADERCONFIG;
    const data= await axiosHelper.post('/api/campaign/statistics', value,config);

    return data.data;
}


export const GetRecentVoteRecord = async (value)=>{

    const config = HEADERCONFIG;
    const data= await axiosHelper.post('/api/campaign/getVoteRecord', value,config);

    return data.data;
}
