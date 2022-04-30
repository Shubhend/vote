const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
const {CheckmediaImage, GetSimpleImage} = require("../Service/AssetsService");
const {encode}= require('html-entities');
const lzwCompress =require('lzwcompress');
const {getIpDetails,getAddressFromLocationId} = require('../utils/helpers')
const ip = require('ip');
const {GetCampaignVotedData,getRecord} = require("../Service/StatisticsService.js");
const { campaignTraffic, Sequelize } = require("../config/config");
const Op = Sequelize.Op;

const GetStatistics = asynchandler(
    async (req,res)=>{

        const data = await GetCampaignVotedData(req.body.campaignId);

        if(! req.body.filter){
            var d = new Date();
            d.setDate(d.getDate()-30);
            req.body.filter={};
            req.body.filter.fromDate = d.toISOString();
            req.body.filter.toDate = new Date().toISOString();
            
        }
      
           var filtermap= { 
            campaignId: req.body.campaignId,
            createdAt:{
                [Op.lt]:  req.body.filter.toDate,
                [Op.gt]:  req.body.filter.fromDate     
            }   
           }    

    const record= await getRecord(Modal.campaignVote,[
        [Sequelize.literal(`COUNT(*)`), 'count'],'createdAt'
    ],filtermap,[[Sequelize.literal('"createdAt"'), 'ASC']],'createdAt');

    const countryRecord= await getRecord(Modal.campaignVote,[
        [Sequelize.literal(`COUNT(*)`), 'countryCount'],'country'
    ],filtermap, [[Sequelize.literal("country"), 'ASC']],'country');

    const CityRecord= await getRecord(Modal.campaignVote,[
        [Sequelize.literal(`COUNT(*)`), 'cityCount'],'city'
    ],filtermap, [[Sequelize.literal("city"), 'ASC']],'city');

    const stateRecord= await getRecord(Modal.campaignVote,[
        [Sequelize.literal(`COUNT(*)`), 'staeCount'],'state'
    ],filtermap, [[Sequelize.literal("state"), 'ASC']],'state');


//      res.json(record);
       // const campaignVotedData= await  Modal.campaignVote.findAll({ where:{ campaignId:req.body.campaignId } });

      const campaignVotedData= await  Modal.campaignVote.findAll({
            attributes: [
                [Sequelize.literal(`COUNT(*)`), 'count'],'createdAt'
            ],
            where: { 
              
            campaignId: req.body.campaignId
              
            },
            order: [[Sequelize.literal('"createdAt"'), 'ASC']],
            group: 'createdAt'
          })




        if(data){
            res.json({
                TotalVotes:data.VotedData.length,
                TotalImpression:data.filters.impressions,
                votedData:record,
                TodayClicks:data.todayfilter.clicksCount,
                TodayImpression:data.todayfilter.impressions,
                voteRecord:record,
                CountryRecord:countryRecord,
                cityRecord:CityRecord,
                stateRecord:stateRecord
            })

        }

    }
)


module.exports={GetStatistics};
