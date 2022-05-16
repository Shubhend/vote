const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
const path = require("path");
const multer = require("multer");
const fs = require('fs')
const asynchandler = require("express-async-handler");
const publicPath = path.join('public');

const storage = multer.diskStorage({
    destination: publicPath+'/user/',
    filename: function(req, file, cb){
        cb(null,"IMAGE-"+req.user.id+'-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
}).single("profileImg");


const storageMedia = multer.diskStorage({
    destination: publicPath+'/media/',
    filename: function(req, file, cb){
        cb(null,"IMAGE-"+req.user.id+'-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadMedia = multer({
    storage: storageMedia,
    limits:{fileSize: 1000000},
}).single("image");



const CheckImage  = async (image) =>{

    if(image==null || image=='' ){
        image="/assets/theme1/images/profile-4.png";
    }

    return '/user/'+image;

}


const CheckmediaImage  = (image) =>{


    var d=image;
        if (image == null || image == '') {
            d = "/pub/common.jpg";
           
        }

        d='/media/' + image;

    return d;
}

const UploadProfileImage = async (res,req) =>{

    const send=[];

    const result = await new Promise((resolve, reject) => {
        upload(req, res, (err) => {

            if (err) {
                send['err'] = 1;
                send['msg'] = err.msg;

            } else {
                send['err'] = 0;
                send['msg'] = 'Uploaded';
                send['data'] =  res.req.file ? res.req.file.filename: ''
            }

            resolve(send)
        })

    });
    return result;

}


const UploadMediaImage = async (res,req) =>{

    const send=[];

    const result = await new Promise((resolve, reject) => {
        uploadMedia(req, res, (err) => {

            if (err) {
                send['err'] = 1;
                send['msg'] = err.msg;

            } else {
                send['err'] = 0;
                send['msg'] = 'Uploaded';
                send['data'] =  res.req.file ? res.req.file.filename: ''
            }

            resolve(send)
        })

    });
    return result;

}


const unlinkAssets= asynchandler(async (patth)=>{

    const path =publicPath+'/user/'+patth;

    console.log(path)
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return false;
        }
        return true;
        //file removed
    })


})


const GetSimpleImage= async (obj)=>{


        var featurenimage='';
   const requests = obj.map(async (val) => {


            if (val.featured) {
                featurenimage = val.images;
            }

        });

    const rest=await Promise.all(requests);
    if (featurenimage == '' && obj.length > 0) {
            featurenimage = obj[0].images;
        }

        if (featurenimage == '') {
            featurenimage = await CheckmediaImage('');
        }


    return featurenimage;
}


const unlinkMedia= asynchandler(async (patth)=>{

    const path =publicPath+'/media/'+patth;

    console.log(path)
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return false;
        }
        return true;
        //file removed
    })


})


module.exports.CheckImage=CheckImage;
module.exports.UploadProfileImage=UploadProfileImage;
module.exports.unlinkAssets=unlinkAssets;
module.exports.UploadMediaImage=UploadMediaImage;
module.exports.CheckmediaImage=CheckmediaImage;
module.exports.unlinkMedia=unlinkMedia;
module.exports.GetSimpleImage=GetSimpleImage;

