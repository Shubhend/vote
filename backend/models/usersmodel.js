const mongoose = require("mongoose");

const bcrypt=require('bcrypt')
const {Sequelize, DATE} = require("sequelize");

const userModal = (sequelize, Sequelize) => {

    const user = sequelize.define("user", {

        name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        address:{
            type: String,
        },
        city:{ type:String },
        country:{ type:String },
        description:{ type:String },
        lname:{ type:String },
        phone:{ type:String },
        state:{ type:String },
        zipcode:{ type:String },
        image:{ type:String }



    })

    return user;
}
module.exports=userModal;