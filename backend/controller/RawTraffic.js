const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
const ip = require('ip');
const {getRawIpDetails} = require('../utils/helpers')
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy+'-'+mm+'-'+dd;

const RawTraffic = asynchandler(async (req,res)=>{

    req.body.ip= ip.address();




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

    var ipdeatils= await getRawIpDetails(ip.address());


    if(ipdeatils){

        req.body.country=ipdeatils.data.country;
        req.body.state=ipdeatils.data.state;
        req.body.city=ipdeatils.data.city;
        req.body.latitude=ipdeatils.data.latitude;
        req.body.longitude=ipdeatils.data.longitude;
        req.body.locationResponse=ipdeatils.obj;
    }


    const data = await Modal.RawTraffic.findOne({where:{ip: req.body.ip,campaignId:req.body.campaignId }});

    if(data){
        
      await Modal.RawTraffic.update({count:parseInt(data.count)+1}, {where:{ip: req.body.ip,campaignId:req.body.campaignId}});

    }else{
        await Modal.RawTraffic.create(req.body);

    }
 
    req.body.date=today;

  

  //  res.json({updat});

    if(latdata=await Modal.DailyTraffic.findOne({ where:{ campaignId:req.body.campaignId,date:today} })){

        var updat= await ArrangeTrafficData(req.body,JSON.parse(latdata.data));
        req.body.data=JSON.stringify(updat,true,4);
        await Modal.DailyTraffic.update(req.body, { where: { campaignId:req.body.campaignId,date:today}});

    }else{
        var updat= await ArrangeTrafficData(req.body,null);
        req.body.data=JSON.stringify(updat,true,4);
        console.log(req.body.data);
        await Modal.DailyTraffic.create(req.body, { where: { campaignId:req.body.campaignId,date:today}});

    }


    res.json({record:"done"});

    })



    const ArrangeTrafficData = asynchandler(async (data,oldData=null)=>{

        if(! oldData){

           var oldData={};
           oldData[data.ip]={};
           oldData[data.ip]['country']='';
           oldData[data.ip]['state']='';
           oldData[data.ip]['city']='';
           oldData[data.ip]['longitude']='';
           oldData[data.ip]['latitude']='';
           oldData[data.ip]['device']='';
           oldData[data.ip]['count']=0;

        }else{
        
            if(! oldData[data.ip]){
             
                oldData[data.ip]={};
                oldData[data.ip]['country']='';
                oldData[data.ip]['state']='';
                oldData[data.ip]['city']='';
                oldData[data.ip]['longitude']='';
                oldData[data.ip]['latitude']='';
                oldData[data.ip]['device']='';
                oldData[data.ip]['count']=0;
              
            }
        }

        console.log(data.ip);
for(const d in oldData[data.ip]){
    
        if(d=='count'){
            data.count= oldData[data.ip]['count']+1;
        }

        oldData[data.ip][d]=data[d];

}


 
        return oldData;



    })


module.exports={RawTraffic};