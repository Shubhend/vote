
const {Sequelize, DATE} = require("sequelize");

const stateModel = (sequelize, Sequelize) => {

    const country = sequelize.define("votedUser", {

        userId: {
            type: String,
            required: false,
        },
        campaignId:{
            type: String
        },
        device:{
            type: String
        },
        ipAddress:{
            type: String
        },
        longitude:{ type: String },
        latitude:{ type: String },
        country:{ type: String },
        state:{ type: String },
        city:{ type: String },
        exactLocation:{ type: String },
        locationResponse:{type:String}


    }, {
        tableName: 'votedUser'
    })

    return country;
}
module.exports=stateModel;