const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
const {CheckmediaImage, GetSimpleImage} = require("../Service/AssetsService");
const {encode}= require('html-entities');
const lzwCompress =require('lzwcompress');



const getCampaignByUniqueId = asynchandler( async (req,res)=>{

   const id=req.query.id;

   const data = await Modal.campaign.findOne({
    include:[
        {model: Modal.category,as: 'categoryData' },
        {model: Modal.country,as: 'countryData' },
        {model: Modal.state,as: 'stateData' },
        {model: Modal.city,as: 'cityData' },
    ],
    where:{uniqueId:id} });

if(data){
    const campaignData = await Modal.campaignmedia.findAll({
    where:{campaignId:data.id} });

    res.json({'data':data,'media':campaignData});

}

 
     

});


const newCampaign = asynchandler(
    async (req,res)=>{




       // req.body=req.body.data;

        req.body.keywords=JSON.stringify(req.body.keywords);
        req.body.description=encode(req.body.description);



        try{

        if(req.body.id>0){

            const data = await Modal.campaign.findByPk(req.body.id);

            if(data){

                var cid=req.body.id;
                delete req.body.id;
               // console.log(cid)
                const updated = await Modal.campaign.update(req.body, { where: { id: cid } });

                if(updated){

                 return   res.json(data);

                }

            }

           return res.json({err:1,msg:"Try again"});

        }
        } 
        catch  (e){
         
            console.log(e.message);
            return res.json({err:1,msg:e.message});

        }


        req.body.uniqueId=new Date().getTime();
        req.body.userId= req.user.id;
        const data = await Modal.campaign.create(req.body);
        if(data){

            res.json(data)

        }

    }
)


const getCampaign = asynchandler(
    async (req,res)=>{

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


module.exports={newCampaign,getCampaign,getCampaignByUniqueId};
