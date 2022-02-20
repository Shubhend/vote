const asynchandler = require("express-async-handler");
const Modal = require('../config/config');
const {UploadMediaImage,CheckmediaImage,unlinkMedia} = require("../Service/AssetsService");

const getMedia = asynchandler(
    async (req,res)=>{

        var  campaigndata = await Modal.campaignmedia.findAll({where:{campaignId:req.query.id,userId:req.user.id}});


        const result = await new Promise(async (resolve, reject) => {
              await campaigndata.map(async (val) => {


                let im = await CheckmediaImage(val.images);
                val.images = im;

            });

            resolve(campaigndata);
        });

            res.json(result)



    }
)


const RemoveMedia=asynchandler(
    async (req,res)=>{

        const campaigndata = await Modal.campaignmedia.findOne({where:{id:req.body.mediaId,userId:req.user.id,campaignId: req.body.campainId}});

        if(! campaigndata){
            res.json({
                err:1,
                msg:'Please Try again'
            })
        }


        await unlinkMedia(campaigndata.images);

        await Modal.campaignmedia.destroy({where:{id:req.body.mediaId,userId:req.user.id,campaignId: req.body.campainId}});

        res.json({
            err:0,
            msg:'Imaged Removed'
        })




    });

const SetFeaturedMedia=asynchandler(
    async (req,res)=>{

        const campaigndata = await Modal.campaignmedia.findOne({where:{id:req.body.mediaId,userId:req.user.id,campaignId: req.body.campainId}});

        if(! campaigndata){
            res.json({
                err:1,
                msg:'Please Try again'
            })
        }

        

        await Modal.campaignmedia.update({featured: 0 },{where:{userId:req.user.id,campaignId: req.body.campainId}});

        await Modal.campaignmedia.update({featured: 1 },{where:{id:req.body.mediaId,userId:req.user.id,campaignId: req.body.campainId}});

        res.json({
            err:0,
            msg:'Data Updated'
        })


    });



const setMedia = asynchandler(
    async (req,res)=>{

        const data= await UploadMediaImage(res,req);


        if(data.err==1){
            res.json({
                err:1,
                msg:"Try again Later"
            });
        }

        const campaigndata = await Modal.campaign.findOne({where:{id:req.body.campaignId}});


         await Modal.campaignmedia.create({
         campaignId:req.body.campaignId,
            userId:req.user.id,
            images:data.data,
             campaignType: campaigndata.type,
             type:campaigndata.type,
             featured:0
        });


            res.json({
                err:0,
                msg:"Image Uploaded"
            })



    }
)



module.exports={getMedia,setMedia,SetFeaturedMedia,RemoveMedia};