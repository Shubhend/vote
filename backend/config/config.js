const mongoose = require("mongoose");
const connectDb = async () => {

    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true
        })

    }catch(er){
        console.log(er.message);

    }

}

module.exports = connectDb;