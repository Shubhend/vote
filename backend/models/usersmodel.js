const mongoose = require("mongoose");

const bcrypt=require('bcrypt')

const userSchema = mongoose.Schema({

    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true,
    }


},{timestamp:true})

userSchema.methods.matchpassword = async function(pass){

    return await bcrypt.compare(pass,this.password);
}

userSchema.pre('save',async function(next){
   // const salt=await bcrypt.getSalt('10');
    this.password = await bcrypt.hash(this.password,10);

} )

const User = mongoose.model('users',userSchema)
module.exports=User;