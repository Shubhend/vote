const mongoose = require("mongoose");
const dbConfig = require("./db.config.js");
const {Sequelize} = require("sequelize");


        const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            operatorsAliases: false,

            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            }
        });

        // await mysql
        //
        // const conn= await mongoose.connect(process.env.MONGO_URI,{
        //     useNewUrlParser:true
        // })
        const connectDb = {};

        connectDb.Sequelize = Sequelize;
        connectDb.sequelize = sequelize;

       connectDb.user = require('./../models/usersmodel')(sequelize, Sequelize);
       connectDb.country = require('./../models/countrymodel')(sequelize, Sequelize);
       connectDb.category = require('./../models/categorymodel')(sequelize, Sequelize);
       connectDb.state = require('./../models/stateModel')(sequelize, Sequelize);
       connectDb.city = require('./../models/citiesModel')(sequelize, Sequelize);
       connectDb.campaign = require('./../models/campaignModel')(sequelize, Sequelize);
       connectDb.campaignmedia = require('./../models/campaignMediaModel')(sequelize, Sequelize);
       connectDb.campaignTraffic = require('./../models/campaignTrafficModel')(sequelize, Sequelize);
       connectDb.campaignVote = require('./../models/votedUserModel')(sequelize, Sequelize);
       connectDb.RawTraffic = require('./../models/rawTrafficModel')(sequelize, Sequelize);
       connectDb.DailyTraffic = require('./../models/dailyTraffic')(sequelize, Sequelize);
       connectDb.Support=require('./../models/supportModel')(sequelize,Sequelize);


       //


// Associations

connectDb.campaign.belongsTo( connectDb.category,{ foreignKey:'category',as:'categoryData',foreignKeyConstraint:true});
connectDb.campaign.belongsTo( connectDb.country,{through:'iso2', foreignKey:'country',as:'countryData',foreignKeyConstraint:true});
connectDb.campaign.belongsTo( connectDb.city,{ foreignKey:'city',as:'cityData',foreignKeyConstraint:true});
connectDb.campaign.belongsTo( connectDb.state,{ foreignKey:'state',as:'stateData',foreignKeyConstraint:true});
connectDb.campaign.belongsTo( connectDb.user,{ foreignKey:'userId',as:'userData',foreignKeyConstraint:true});
connectDb.campaign.hasMany( connectDb.campaignmedia,{ foreignKey:'campaignId',as:'mediaData',foreignKeyConstraint:true});
connectDb.campaignVote.belongsTo( connectDb.campaign,{ foreignKey:'campaignId',as:'campaignData',foreignKeyConstraint:true});
connectDb.campaignVote.belongsTo( connectDb.user,{ foreignKey:'userId',as:'userData',foreignKeyConstraint:true});




module.exports = connectDb;