
const {Sequelize, DATE} = require("sequelize");

const supportModel = (sequelize, Sequelize) => {

    const country = sequelize.define("support", {

        name: {
            type: String,
            required: false,
        },
        email:{
            type: String
        },
        description:{
            type:String
        }
    }, {

        tableName: 'support'
    })

    return country;
}
module.exports=supportModel;