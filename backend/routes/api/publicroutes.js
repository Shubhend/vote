
const Express = require('express');
const async = require('express-async-handler');


const {getCountry,getCategory,getState,getCity} = require('../../controller/PublicController')
const {protect} = require("../../middleware/auth");
const router = Express.Router();

router.get('/getCountry',getCountry);
router.get('/getCategory',getCategory);
router.get('/getState',getState);
router.get('/getCity',getCity);



router.get('/',(req,res)=>{
    res.send('Not Authorized');
});

module.exports= router;
