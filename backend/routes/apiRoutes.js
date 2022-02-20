const userRoute = require('./api/userroute');
const publicRoute = require('./api/publicroutes');
const Express = require("express");
const campaignRoute = require('./api/campaignroutes');

const app=Express();

const apiRoutes = Express.Router();

apiRoutes.get('/',(req,res)=>{
    res.send('Not Authorized');
});

apiRoutes.use('/user',userRoute);
apiRoutes.use('/public',publicRoute);
apiRoutes.use('/campaign',campaignRoute);

module.exports=apiRoutes;
