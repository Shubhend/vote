
const {Sequelize, DATE} = require("sequelize");

const campaignTrafficModel = (sequelize, Sequelize) => {

    const country = sequelize.define("campaignTraffic", {

        campaignId: {
            type: String
        },
        impression:{
            type: String
        },
        clicks:{
            type: String,
            default:1
        },
        date:{
            type: String,
        }
      


    },{
        tableName: 'campaigntraffic'
    })

    return country;
}
module.exports=campaignTrafficModel;