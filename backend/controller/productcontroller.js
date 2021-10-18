const Product = require('../models/product');
const Express = require('express');
const asynchandler = require('express-async-handler');
const router = Express.Router();

const getProducts = asynchandler(
    async (req,res)=>{
        const products = await Product.find({});
        res.json(products);
    })


const getProduct = asynchandler(
    async(req,res)=>{

        const products= await Product.findById(req.params.id);
        if(products){
            res.json(products);
        }else{
            res.status(404).json({message: "Product Not Found"});
        }
    })

module.exports= {getProduct,getProducts};
