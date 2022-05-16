const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
const path = require("path");
const multer = require("multer");
const Modal = require('../config/config');

const getCampaign  = async (req) =>{

    const whereCon={userId:req.user.id};
    if(req.query.Id){
        whereCon.id=req.query.Id;
    }

    const data = await Modal.campaign.findAll({
        include:[
            {model: Modal.category,as: 'categoryData' },
            {model: Modal.country,as: 'countryData' },
            {model: Modal.state,as: 'stateData' },
            {model: Modal.city,as: 'cityData' },
            {model:Modal.campaignmedia,as:'mediaData'}
        ],


        where:whereCon});

}


module.exports.getCampaign=getCampaign;

