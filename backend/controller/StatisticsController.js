const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
const {CheckmediaImage, GetSimpleImage} = require("../Service/AssetsService");
const {encode}= require('html-entities');
const lzwCompress =require('lzwcompress');
const {getIpDetails,getAddressFromLocationId} = require('../utils/helpers')
const ip = require('ip');
const {GetCampaignVotedData,getRecord,getTotalData} = require("../Service/StatisticsService.js");
const { campaignTraffic } = require("../config/config");
const { Op } = require('sequelize');

const GetStatistics = asynchandler(async (req,res)=> {


    var filtermap = {
        createdAt: {
            [Op.lte]: req.body.startDate,
            [Op.gte]: req.body.toDate
        }
    }

    const data = await getTotalData(req, filtermap);

    res.json({
        ...data
    })
});


const getVoteStatics = asynchandler(async (req,res)=> {


    const filtermap= {
        createdAt: {
            [Op.lte]: req.body.startDate,
            [Op.gte]: req.body.toDate
        }
    }

    const data = await GetCampaignVotedData(req, filtermap);

    res.json({
        ...data,filtermap:filtermap.createdAt
    })


});


module.exports={GetStatistics,getVoteStatics};
