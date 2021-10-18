
const Express = require('express');
const async = require('express-async-handler');


const {authcontroller, getuserprofile, registeruser} = require('../controller/usercontroller')
const {protect} = require("../middleware/auth");
const router = Express.Router();

router.post('/login',authcontroller);

// private
router.route('/profile').get(protect,getuserprofile);

router.route('/register').post(registeruser);


module.exports= router;
