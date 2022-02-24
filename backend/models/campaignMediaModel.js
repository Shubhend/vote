
const {Sequelize, DATE} = require("sequelize");
const { CheckmediaImage } = require("../Service/AssetsService.js");

const campaignMediaModel =  (sequelize, Sequelize) => {

    const country =  sequelize.define("campaignmedia", {

        campaignId: {
            type: String,
            required: false,
        },
        userId:{
            type: String
        },
        images:{
            type: String,
            get(){
                const rawValue = CheckmediaImage(this.getDataValue('images'));
                return rawValue;
            }
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