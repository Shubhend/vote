const User = require('../models/usersmodel');
const Express = require('express');
const asynchandler = require('express-async-handler');

const generatetocken = require("../utils/generatetocken");




const registeruser = asynchandler(
    async (req,res)=>{

       const {email,name,password} = req.body;

       const send={};
        send.err=0;
       send.msg='';

      const userexist = await User.findOne({email});

      if(userexist){
          send.err=1;
          send.msg='User Already Exist';
          res.send(send);

      }

      const user= await User.create({name,email,password});
      if(user){
          send.err=0;
          send.msg='User Already Exist';
          send.data={
              _id: user._id,
              name:user.name,
              email:user.email
          }
          res.send(send);
      }else{
          send.err=1;
          send.msg='Try Again';
          res.send(send);
      }

    }
    )

const authcontroller = asynchandler(
    async (req,res)=>{

        const {email,password} = req.body;
        const user= await User.findOne({email})
        if(user && user.matchpassword(password)){
            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                token: generatetocken(user._id)
            });

        }else{
            res.send("not found");

        }
    }
)


const getuserprofile = asynchandler(
    async (req,res)=>{

const user = await User.findById(req.user._id)
        if(user){

            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                token: generatetocken(user._id)
            })

        }

    }
)

module.exports={authcontroller,getuserprofile,registeruser};