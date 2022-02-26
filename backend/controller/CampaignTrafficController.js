const asynchandler = require("express-async-handler");
const {Sequelize, DATE} = require("sequelize");
const Model = require('../config/config');

const Op = Sequelize.Op;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy+'-'+mm+'-'+dd;


const updateTraffic= asynchandler(
    async (req,res)=>{

       const campaignIds=req.body.campaignId;
       const data = await Model.campaign.findOne({ where:{uniqueId:campaignIds} });

    

      if(data){
        req.body.campaignId=data.id;
        req.body.date=today
       
       

        if(latdata=await Model.campaignTraffic.findOne({ where:{ campaignId:req.body.campaignId,date:today} })){
            

            if(req.body.type=='im'){
                req.body.impression=parseInt(latdata.impression)+1;
            }
            if(req.body.type=='cl'){
                req.body.clicks=parseInt(latdata.clicks)+1;
            }

            await Model.campaignTraffic.update(req.body, { where: { campaignId:req.body.campaignId,date:today}});

        }else{
            await Model.campaignTraffic.create(req.body, { where: { campaignId:req.body.campaignId,date:today}});

        }

         
       
        res.json({err:0,'msg':'done'});
        return true;
        }
        res.json({err:1,'msg':'done'});
      
});


module.exports={updateTraffic}