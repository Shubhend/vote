
const {Sequelize, DATE} = require("sequelize");

const categoryModal = (sequelize, Sequelize) => {

    const country = sequelize.define("category", {

        name: {
            type: String,
            required: false,
        }

    }, {
        timestamps: false,
        tableName: 'category'
    })

    return country;
}
module.exports=categoryModal;