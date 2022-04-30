
const Express = require('express');
const async = require('express-async-handler');
const { updateTraffic } = require('../../controller/CampaignTrafficController.js');


const {getCountry,getCategory,getState,getCity} = require('../../controller/PublicController')
const {RawTraffic} = require('../../controller/RawTraffic.js');
const {protect} = require("../../middleware/auth");
const router = Express.Router();

router.get('/getCountry',getCountry);
router.get('/getCategory',getCategory);
router.get('/getState',getState);
router.get('/getCity',getCity);
router.post('/updateTraffic',updateTraffic);
router.post('/rawTraffic',RawTraffic);



router.get('/',(req,res)=>{
    res.send('Not Authorized');
});

module.exports= router;
