const UserModal = require('../config/config');
const Express = require('express');
const asynchandler = require('express-async-handler');


const UserService = require("../Service/UserService");
const Utilsservice = require("../utils/generatetocken");
const bcrypt = require("bcrypt");
const {CheckImage, UploadProfileImage, unlinkAssets} = require("../Service/AssetsService");
const User=UserModal.user;



const registeruser = asynchandler(async (req,res)=>{

       const {email,name,password} = req.body;

        const send={};
        send.err=0;
        send.msg='';

      const userexist = await UserModal.user.findOne({where:{ 'email': email }});

      if(userexist){
          send.err=1;
          send.msg='User Already Exist';
          res.send(send);

      }

       hashpasswords= await UserService.generatePassword(password);

      console.log(hashpasswords);
      const user= await User.create({name,email,password:hashpasswords});
      if(user){
          send.err=0;
          send.msg='User Recorded';
          send.data={
              id: user.id,
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

        const send={};
        send.err=0;
        send.msg='';
        const {email,password} = req.body;
        const user= await User.findOne({where:{email}})

        if(!user){
            send.err=1;
            send.msg='User Not Found, Please Register';
            res.send(send);
        }

        const result= await UserService.ComparePassword(password,user.password);

        if(user && result){
            res.json({
                err:0,
                msg:'Logged In',
                id: user.id,
                name:user.name,
                email:user.email,
                token: Utilsservice.generatetocken(user)
            });

        }else{
            send.err=1;
            send.msg='Wrong Credentials';
            res.send(send);

        }
    }
)



const UpdateUserProfile = asynchandler( async(req,res)=>{

    console.log(req.user.id);

    const user = await User.update(req.body, { where: { id: req.user.id } });
    if(user){

        res.json({
            err:0,
           msg:'Data Updated'
        })

    }

})


const UploadProfile = asynchandler(
    async (req,res)=>{

       const data= await UploadProfileImage(res,req);
        const user = await User.findByPk(req.user.id)

       console.log(req.user);

       if(data.err==0){

            await User.update({image: data.data }, { where: { id: req.user.id } });

            unlinkAssets(user.image);
       }

        res.json({
            err:0,
            msg:'Data Updated'
        })

    }
)

const getuserprofile = asynchandler(
    async (req,res)=>{

        const user = await User.findByPk(req.user.id)
        if(user){

            delete  user.password;
            user.image=await CheckImage(user.image);

            res.json(user)

        }

    }
)

module.exports={authcontroller,getuserprofile,registeruser,UpdateUserProfile,UploadProfile};