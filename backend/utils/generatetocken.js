const jwt= require('jsonwebtoken')

const generatetocken = (id) => {

    return jwt.sign({id},process.env.JWT,{
        expiresIn: "15d"
    });
};

module.exports=generatetocken;


