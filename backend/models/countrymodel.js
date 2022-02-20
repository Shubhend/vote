
const {Sequelize, DATE} = require("sequelize");

const countryModal = (sequelize, Sequelize) => {

    const country = sequelize.define("country", {


        name: {
            type: String,
            required: false,
        },
        iso2:{
            type: String
        }

    }, {
        timestamps: false
    })

    return country;
}
module.exports=countryModal;