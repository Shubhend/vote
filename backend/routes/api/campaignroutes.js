
const Express = require('express');
const async = require('express-async-handler');


const {newCampaign,getCampaign,getCampaignByUniqueId} = require('../../controller/CampaignController')

const {getMedia,setMedia,RemoveMedia,SetFeaturedMedia} = require('../../controller/campaignMedia')
const {protect} = require("../../middleware/auth");
const router = Express.Router();

// private
router.route('/newCampaign').post(protect,newCampaign);
router.route('/getCampaign').get(protect,getCampaign);
router.route('/getMedia').get(protect,getMedia);
router.route('/setMedia').post(protect,setMedia);
router.route('/setFeaturedMedia').post(protect,SetFeaturedMedia);
router.route('/removeMedia').post(protect,RemoveMedia);


// public
router.route('/getCampaignByUniqueId').get(getCampaignByUniqueId);





router.get('/',(req,res)=>{
    res.send('Not Authorized');
});

module.exports= router;
