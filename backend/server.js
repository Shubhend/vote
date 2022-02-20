
const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const Process = require("process");
const apiRoutes = require('./routes/apiRoutes');
const connectDb = require('./config/config')
const {errorHandler} = require("./middleware/error");
const bodyParser = require('body-parser')
const path = require("path");
var public = path.join('public');

// connect to db
dotenv.config();


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/api',productRoutes);
// connectDb.sequelize.sync();
app.use(cors())
app.use(express.static(public))
app.use('/api/',apiRoutes);

app.get('/',(req,res)=>{
    res.send('check');
});

app.use(errorHandler);



//app.use(express.json);


app.listen(Process.env.PORT,()=>{
    console.log("server run "+Process.env.PORT);
})