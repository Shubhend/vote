const asynchandler = require("express-async-handler");
const Modal = require('../config/config');

const getCountry = asynchandler(
    async (req,res)=>{

        const country = await Modal.country.findAll();
        if(country){

            res.json(country)

        }

    }
)

const getCategory = asynchandler(
    async (req,res)=>{

        const data = await Modal.category.findAll();
        if(data){

            res.json(data)

        }

    }
)


const getState = asynchandler(async (req,res)=>{


        const data = await Modal.state.findAll({where:{'country_id':req.query.countryId}});
        if(data){
            res.json(data)
        }

    }
)


const getCity = asynchandler(async (req,res)=>{


        const data = await Modal.city.findAll({where:{'country_id':req.query.countryId,'state_id':req.query.stateId}});
        if(data){
            res.json(data)
        }

    }
)

module.exports={getCountry,getCategory,getState,getCity};