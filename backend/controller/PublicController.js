const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
var nodemailer = require('nodemailer');
const {MailEventEmitter} = require('./../Service/MailService')
const {CheckmediaImage, GetSimpleImage} = require("../Service/AssetsService");


const Support = async (req,res) =>{

    await Modal.Support.create(req.body);

    res.send({msg:"Request Accepted"});

    return true;

}



const getCampaign = asynchandler(
    async (req,res)=>{

        const whereCon={status:1};

        const data = await Modal.campaign.findAll({
            include:[
                {model:Modal.campaignmedia,as:'mediaData'},
                {model:Modal.user,as:'userData'}
            ],

            where:whereCon});
        if(data){

            var count=data.length;

            const media={};

            const requests= data.map(async (val1) => {


                media[val1.id]= await  GetSimpleImage(val1.mediaData);

            });


            const rest=await Promise.all(requests);

            res.json({'campaign':data,'media':media,'count':count})

            // console.log(result);

        }

    }
)


const sendMail = asynchandler(async(req,res)=>{



    MailEventEmitter.emit('test');


    res.send({datta:"done"});
    return true;

})

const getCountry = asynchandler(
    async (req,res)=>{

        const country = await Modal.country.findAll();
        if(country){

            res.json(country)

        }

    }
)

const getCategory = asynchandler(
    async (req,res)=>{

        const data = await Modal.category.findAll();
        if(data){

            res.json(data)

        }

    }
)







const getState = asynchandler(async (req,res)=>{


        const data = await Modal.state.findAll({where:{'country_id':req.query.countryId}});
        if(data){
            res.json(data)
        }

    }
)


const getCity = asynchandler(async (req,res)=>{


        const data = await Modal.city.findAll({where:{'country_id':req.query.countryId,'state_id':req.query.stateId}});
        if(data){
            res.json(data)
        }

    }
)

module.exports={getCountry,getCategory,getState,getCity,sendMail,Support,getCampaign};