import {HEADERCONFIG} from "../Constant/constant";
import axiosHelper from "../Helper/axios";
import Notify from "../Helper/notify";


export const CreateNewCampaign = async (values) =>{

    var formPayload = new FormData();
    const config = HEADERCONFIG;
    const {data} = await axiosHelper.post('/api/campaign/newCampaign',values,config)
    if(data.id==0){
        Notify('error',"Please try again");
    }else{

        Notify('success',"Campaign Created");
    }

    return data;

}

export const GetCampaign = async () =>{

    const config = HEADERCONFIG;
    const {data} = await axiosHelper.get('/api/campaign/getCampaign',config)


    return data;

}

export const GetCampaignById = async (id) =>{

    const config = HEADERCONFIG;
    const {data} = await axiosHelper.get('/api/campaign/getCampaign?Id='+id,config)


    return data;

}

export const GetMedia = async (id) =>{

    const config = HEADERCONFIG;
    const {data} = await axiosHelper.get('/api/campaign/getMedia?id='+id,config)


    return data;

}

export const SetMedia = async (file,campaignId) =>{

    const formData = new FormData()
    const config = HEADERCONFIG;

    formData.append('image', file)
    formData.append('campaignId', campaignId)

    const {data} = await axiosHelper.post('/api/campaign/setMedia',formData,config)
    Notify('success', data.msg);

    return data;

}


export const RemoveMedia = async (value) =>{

    const config = HEADERCONFIG;
    const {data} = await axiosHelper.post('/api/campaign/removeMedia',value,config)
    Notify('success', data.msg);

    return data;

}

export const SetFeaturedMedia = async (value) =>{


    const config = HEADERCONFIG;


    const {data} = await axiosHelper.post('/api/campaign/setFeaturedMedia',value,config)
     Notify('success', data.msg);

    return data;

}

