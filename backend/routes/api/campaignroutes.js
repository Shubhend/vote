
const Express = require('express');
const async = require('express-async-handler');


const {newCampaign,getCampaign,getCampaignByUniqueId,SetVote} = require('../../controller/CampaignController')

const {getMedia,setMedia,RemoveMedia,SetFeaturedMedia} = require('../../controller/campaignMedia')

const {GetStatistics} = require('../../controller/StatisticsController.js')
const {protect} = require("../../middleware/auth");
const router = Express.Router();

// private
router.route('/newCampaign').post(protect,newCampaign);
router.route('/getCampaign').get(protect,getCampaign);
router.route('/getMedia').get(protect,getMedia);
router.route('/setMedia').post(protect,setMedia);
router.route('/setFeaturedMedia').post(protect,SetFeaturedMedia);
router.route('/removeMedia').post(protect,RemoveMedia);
router.route('/vote').post(protect,SetVote);
router.route('/statistics').post(protect,GetStatistics);



// public
router.route('/getCampaignByUniqueId').get(getCampaignByUniqueId);





router.get('/',(req,res)=>{
    res.send('Not Authorized');
});

module.exports= router;
