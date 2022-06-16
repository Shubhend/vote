const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
const {CheckmediaImage, GetSimpleImage} = require("../Service/AssetsService");
const campaignService = require('../Service/CampaignService');
const {encode}= require('html-entities');
const lzwCompress =require('lzwcompress');
const {getIpDetails,getAddressFromLocationId} = require('../utils/helpers')
const ip = require('ip');
const common=require('../utils/common')




const GetVotedUser = asynchandler( async (req,res)=>{


    const query=req.body;


    const data = await   Modal.campaignVote.findAll({
        include:[
            {model: Modal.campaign,as: 'campaignData' },
            {model: Modal.user,as: 'userData' },
        ],
        ...query

    });

    const column=['Name','Email','Phone_No','Campaign','country','city','state','date'];


     const filterData =data.map((val)=>{

         let d={};
         d['Name']=val.userData.name;
         d['Email']=common.GetMaskedData(val.userData.email);
         d['Phone_No']=common.GetMaskedData(val.userData.phone);
         d['Campaign']=val.campaignData.name;
         d['country']=val.country;
         d['city']=val.city;
         d['state']=val.state;
         d['date']=val.createdAt;



         return d;



       })



        res.json({'data':filterData,'column':column,'query':query});







})


const SetVote = asynchandler( async (req,res)=>{


    req.body.userId= req.user.id;
    req.body.ipAddress= ip.address();



    const campaignData=await Modal.campaign.findOne({where:{

            uniqueId:req.body.campaignId
        }});

    if(! campaignData){

        res.json({
            err:1,msg:'Campaign Not Found',undo:0
        })
        return true;
    }

    req.body.campaignId=campaignData.id;

    const checkvote=await Modal.campaignVote.findOne({where:{
        userId: req.user.id,
            campaignId:req.body.campaignId
        }});


    if(checkvote){

        res.json({
            err:1,msg:'Already Voted',undo:1
        })
        return true;
    }


   var ipdeatils= await getIpDetails(ip.address());

    if(ipdeatils){

        req.body.country=ipdeatils.data.country;
        req.body.state=ipdeatils.data.state;
        req.body.city=ipdeatils.data.city;
        req.body.locationResponse=ipdeatils.obj;
    }


    if(req.body.exactLocation){

        var addressdetails= await getAddressFromLocationId(req.body.longitude,req.body.latitude);

        if(addressdetails){
            req.body.country=addressdetails.data.country;
            req.body.state=addressdetails.data.state;
            req.body.city=addressdetails.data.city;
            req.body.locationResponse=addressdetails.obj;
        }

    }



     await Modal.campaignVote.create(req.body);

      res.json({err:0,'msg':'done'});

});


const getCampaignByUniqueId = asynchandler( async (req,res)=>{

   const id=req.query.id;

   const data = await Modal.campaign.findOne({
    include:[
        {model: Modal.category,as: 'categoryData' },
        {model: Modal.country,as: 'countryData' },
        {model: Modal.state,as: 'stateData' },
        {model: Modal.city,as: 'cityData' },
        {model:Modal.user,as:'userData'}
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
        req.body.status=1;
        req.body.type=1;

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


module.exports={newCampaign,getCampaign,getCampaignByUniqueId,SetVote,GetVotedUser};
