const Modal = require('../config/config');
const asynchandler = require("express-async-handler");
const { Sequelize } = require('../config/config');
const jsonQuery = require('json-query');
const Op = Sequelize.Op;
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();
const moment = require('moment'); // require


const getTotalData = async (req,con) =>{


    let condition={userId:req.user.id};

    if(req.body.campaignId>0){
        condition={...condition,id:req.body.campaignId};
    }


    const allCamp = await Modal.campaign.findAll({
        where: condition });


        let TotalImpression=0;
        let TotalVoteCount=0;
        let TotalClicks=0;
        let countryRecord=[];
        let CityRecord=[];
        let stateRecord=[];
        let RawTraffic=0;



    const campList=[];


    for(let i=0;i<allCamp.length;i++) {

        campList.push(allCamp[i].id);

    }
    con={...con,campaignId:  campList};

             TotalVoteCount= await Modal.campaignVote.count({
                where: con});

            RawTraffic= await Modal.RawTraffic.count({
                where: con});


            TotalImpression= await getRecord(Modal.campaignTraffic,[
                [Sequelize.literal(`COUNT(*)`), 'impression']
            ],con);


             TotalClicks= await getRecord(Modal.campaignTraffic,[
                [Sequelize.literal(`COUNT(*)`), 'clicks']
            ],con);


               countryRecord=await getRecord(Modal.campaignVote,[
                [Sequelize.literal(`COUNT(*)`), 'countryCount'],'country'
            ],con, [[Sequelize.literal("country"), 'ASC']],'country');


             CityRecord=await getRecord(Modal.campaignVote,[
                [Sequelize.literal(`COUNT(*)`), 'cityCount'],'city'
            ],con, [[Sequelize.literal("city"), 'ASC']],'city');



             stateRecord= await getRecord(Modal.campaignVote,[
                [Sequelize.literal(`COUNT(*)`), 'stateCount'],'state'
            ],con, [[Sequelize.literal("state"), 'ASC']],'state');



        return {TotalImpression:TotalImpression,TotalVoteCount:TotalVoteCount,TotalClicks:TotalClicks,CountryRecord:countryRecord,CityRecord:CityRecord,StateRecord:stateRecord,RawTrafficCount:RawTraffic};
}


const getRecord = async (db,attribute,condition,order=null,group=null,includes=null,limit=null) =>{


  if(group){

    const campaignVotedData= await  db.findAll({
      attributes: attribute,
     where:condition,
     order: order,
     group: group,
     include:includes,
        limit:limit
   })
 
 
   return campaignVotedData;


  }



  if(order){

    const campaignVotedData= await  db.findAll({
      attributes: attribute,
     where:condition,
     order: order,
        include:includes,
        limit:limit
  
   })
   return campaignVotedData;
  } 

     
         const campaignVotedData= await  db.findAll({
          attributes: attribute,
         where:condition,
             include:includes,
             limit:limit
       })
     
     
       return campaignVotedData;
};



const GetCampaignVotedData  = async (req,con) =>{

    let condition={userId:req.user.id};

    if(req.body.campaignId>0){
        condition={...condition,id:req.body.campaignId};
    }



    const allCamp = await Modal.campaign.findAll({
        where: condition});


    let TotalImpression=0;
    let TotalVote=[];
    let TotalClicks=0;
    let countryRecord=[];
    let CityRecord=[];
    let stateRecord=[];
    let RawTraffic=0;

    const campList=[];


    for(let i=0;i<allCamp.length;i++) {

        campList.push(allCamp[i].id);

    }
        con={...con,campaignId:  campList};


         TotalVote= await getRecord(Modal.campaignVote,[
            [Sequelize.literal(`COUNT(*)`), 'count'],'createdAt'
        ],con,[[Sequelize.literal("createdAt"), 'ASC']],'createdAt');


        TotalImpression= await getRecord(Modal.campaignTraffic,null,con);


        let data=await Promise.all( TotalImpression.map( async (val,key)=>{

            let datas= {};
            let countvote= await Modal.campaignVote.count({
                where: { campaignId:val.campaignId,createdAt: {
                        [Op.lte]: moment(val.createdAt).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
                        [Op.gte]: moment(val.createdAt).subtract(1,'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
                }
                }});

            datas.voteCount=countvote;
            datas.clicks=val.clicks;
            datas.impression=val.impression;
            datas.createdAt=val.createdAt;
                     return datas;
        })

      )


    let graphData=await getRecord(Modal.campaignVote,[
        [Sequelize.literal(`COUNT(*)`), 'stateCount'],'state','latitude','longitude','country','city'
    ],con, [[Sequelize.literal("id"), 'ASC']],'state');




    let ResentVote=await GetRecentVotes(con);

    return {CollectionData:data,GraphData:graphData,RecentVote:ResentVote, TotalImpression:TotalImpression,TotalVoteCount:TotalVote,TotalClicks:TotalClicks,CountryRecord:countryRecord,CityRecord:CityRecord,StateRecord:stateRecord,RawTrafficCount:RawTraffic};


}


const GetRecentVotes = async (con) =>{

    var   RecentVote= await getRecord(Modal.campaignVote,null,con,[[Sequelize.literal("createdAt"), 'ASC']],null,  [
        {model: Modal.campaign,as: 'campaignData' },
        {model: Modal.user,as: 'userData' }
    ],20);

    RecentVote=RecentVote.map((val,key)=>{
       let data={};
       data['name']=val.userData.name;
       data['email']=val.userData.email;
       data['country']=val.country;
       data['state']=val.state;
       data['city']=val.city;
       data['createdAt']=val.createdAt;
       return data;
    });


    return RecentVote;

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



module.exports={GetCampaignVotedData,getRecord,getTotalData}