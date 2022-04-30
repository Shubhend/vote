
const {Sequelize, DATE} = require("sequelize");

const stateModel = (sequelize, Sequelize) => {

    const country = sequelize.define("dailyTraffic", {

        data: {
            type: String,
            required: false,
        },
        date:{
            type: String
        },
        campaignId:{
            type:String
        }
    


    }, {
        tableName: 'dailyTraffic'
    })

    return country;
}
module.exports=stateModel;