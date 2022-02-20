
const {Sequelize, DATE} = require("sequelize");

const stateModel = (sequelize, Sequelize) => {

    const country = sequelize.define("states", {

        name: {
            type: String,
            required: false,
        },
        iso2:{
            type: String
        },
        country_code:{
            type: String
        },
        country_id:{
            type: String
        }


    }, {
        timestamps: false,
        tableName: 'states'
    })

    return country;
}
module.exports=stateModel;