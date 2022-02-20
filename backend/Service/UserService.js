const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
const path = require("path");
const multer = require("multer");

const generatePassword  = async (password) =>{

    //    const salt = bcrypt.genSalt(10)
    // const hash = bcrypt.hash(password, salt);

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword;

    }
const ComparePassword = async (password,hash) =>{

    const result = await new Promise((resolve, reject) => {

        bcrypt.compare(password,hash).then((result)=>{
            if(result){
                console.log("authentication successful")
                resolve(true)

            } else {
                console.log("authentication failed. Password doesn't match")

                resolve(false)
            }
        }).catch((err)=> resolve(false))

    });
    return result;

}

module.exports.generatePassword=generatePassword;
module.exports.ComparePassword=ComparePassword;

