const jwt = require('jsonwebtoken');
const User = require('../models/usersmodel');
const asynchandler=require('express-async-handler')
const protect = asynchandler( async(res,req,next) => {

    let tocken;
  if(req.header.authorization && req.header.startsWith('Bearer'))
      try{
      const decode = jwt.verify(token,process.env.JWT);

          next();
      }catch(e){

      }



})

module.exports={protect}