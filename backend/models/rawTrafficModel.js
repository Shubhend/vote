
const {Sequelize, DATE} = require("sequelize");

const rawTraffic = (sequelize, Sequelize) => {

    const country = sequelize.define("rawTraffic", {

        ip: {
            type: String
        },
        campaignId:{
            type: String
        },
        country:{
            type: String
        },
        state:{ type: String },
        city:{ type: String },
        locationResponse:{ type: String },
        device:{ type: String },
        longitude:{ type: String },
        latitude:{ type: String },
        count:{ type: String },

    },{
        tableName: 'rawTraffic'
    })

    return country;
}
module.exports=rawTraffic;