
const {Sequelize, DATE, VIRTUAL} = require("sequelize");

const campaignModel = (sequelize, Sequelize) => {

    const data = sequelize.define("campaign", {

        name: {
            type: String,
        },
        uniqueId: { type:String },
        userId: { type:String },
        status: { type:String },
        type: { type:String },
        title: { type:String },
        category: { type:String },
        country: { type:String,
            reference:{
                model:'country',
                key: 'iso2'
            }
        },
        state: { type:String },
        city: { type:String },
        region: { type:String },
        keywords: { type:String },
        description: { type:String },
        address: { type:String }

    }, {
        tableName: 'campaign'
    })


    return data;
}
module.exports=campaignModel;