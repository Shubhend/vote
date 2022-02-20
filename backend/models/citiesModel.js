
const {Sequelize, DATE} = require("sequelize");

const cityModel = (sequelize, Sequelize) => {

    const country = sequelize.define("cities", {

        name: {
            type: String,
            required: false,
        },
        state_id:{
            type: String
        },
        country_code:{
            type: String
        },
        country_id:{
            type: String
        },
        state_code:{
            type: String
        },
        state_id:{
            type: String
        }



    }, {
        timestamps: false,
        tableName: 'cities'
    })

    return country;
}
module.exports=cityModel;