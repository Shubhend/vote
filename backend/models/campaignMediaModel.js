
const {Sequelize, DATE} = require("sequelize");

const campaignMediaModel = (sequelize, Sequelize) => {

    const country = sequelize.define("campaignmedia", {

        campaignId: {
            type: String,
            required: false,
        },
        userId:{
            type: String
        },
        images:{
            type: String
        },
        campaignType:{
            type: String
        },
        type:{
            type: String
        },
        featured:{
            type: String
        }


    }, {
        timestamps: false,
        tableName: 'campaignmedia'
    })

    return country;
}
module.exports=campaignMediaModel;