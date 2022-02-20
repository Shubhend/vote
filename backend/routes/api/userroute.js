
const Express = require('express');
const async = require('express-async-handler');


const {authcontroller, getuserprofile, registeruser, UpdateUserProfile,UploadProfile} = require('../../controller/usercontroller')
const {protect} = require("../../middleware/auth");
const router = Express.Router();

router.post('/login',authcontroller);

// private
router.route('/profile').get(protect,getuserprofile);
router.route('/uploadProfile').post(protect,UploadProfile);
router.route('/updateProfile').post(protect,UpdateUserProfile);
router.route('/register').post(registeruser);


router.get('/',(req,res)=>{
    res.send('Not Authorized');
});

module.exports= router;
