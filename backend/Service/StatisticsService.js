const Modal = require('../config/config');
const asynchandler = require("express-async-handler");
const { Sequelize } = require('../config/config');
const jsonQuery = require('json-query');
const Op = Sequelize.Op;
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();



const getRecord = async (db,attribute,condition,order=null,group=null) =>{


         


  if(group){

    const campaignVotedData= await  db.findAll({
      attributes: attribute,
     where:condition,
     order: order,
     group: group
   })
 
 
   return campaignVotedData;


  }



  if(order){

    const campaignVotedData= await  db.findAll({
      attributes: attribute,
     where:condition,
     order: order,
  
   })
   return campaignVotedData;
  } 

     
         const campaignVotedData= await  db.findAll({
          attributes: attribute,
         where:condition,
       })
     
     
       return campaignVotedData;
};



const GetCampaignVotedData  = async (id) =>{



    const data = await Modal.campaignVote.findAll({where:{campaignId:id}});

    const CampaignTraffic = await Modal.campaignTraffic.findAll({where:{campaignId:id }});


   const CampaignTodayTraffic = await Modal.campaignTraffic.findAll({where:{campaignId:id,createdAt:{
    [Op.gt]: TODAY_START,
    [Op.lt]: NOW
  } 
   }});

    const CampaignRawTraffic = await Modal.RawTraffic.findAll({where:{campaignId:id}});


    const CampaignTodayRawTraffic = await Modal.RawTraffic.findAll({where:{campaignId:id,createdAt:{
      [Op.gt]: TODAY_START,
      [Op.lt]: NOW
     } 
    }});


    const Allfilter=await GetTotalTrafficData(CampaignTraffic);
    const Today=await GetTotalTrafficData(CampaignTodayTraffic);
    



    const rdata={
        filters:Allfilter,
        VotedData:data,
        CampaignTodayTraffic:CampaignTodayTraffic,
        CampaignTraffic:CampaignTraffic,
        RawTraffic:CampaignRawTraffic,
        todayfilter:Today,
        TodayRawTraffic:CampaignTodayRawTraffic
    }

    return rdata;

}

const GetTotalTrafficData = async (datas) =>{

  var impression=0;
  var clicks=0;

  await datas.map((val)=>{
    impression=impression+parseInt(val.impression);
    clicks=clicks+parseInt(val.clicks);
  });
  
  return {
    impressions:impression,
    clicksCount:clicks
  }

}



module.exports={GetCampaignVotedData,getRecord}