const jwt = require('jsonwebtoken');
const User = require('../models/usersmodel');
const asynchandler=require('express-async-handler')
const protect = (req,res,next) => {


    const token = req.headers.authorization? req.headers.authorization : req.headers.Authorization  ;


    if(!token){
        return res.status(403).send("A token is required for authentication"+token);
    }


      try {
          const decode = jwt.verify(token, process.env.JWT);
          req.user = decode.id;
      } catch (e) {
          return res.status(401).send(e.message);
      }

    return next();

}

module.exports={protect}