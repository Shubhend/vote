const express=require('express');

const dotenv=require('dotenv');
const Process = require("process");
const userRoute = require('./routes/userroute');
const connectDb = require('./config/config')
const {errorHandler} = require("./middleware/error");
const bodyParser = require('body-parser')

// connect to db
dotenv.config();
connectDb();

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/api',productRoutes);
app.use('/api/users',userRoute);

app.use(errorHandler);
app.get('/',(req,res)=>{
   res.send('check');
});


//app.use(express.json);


app.listen(Process.env.PORT,()=>{
    console.log("server run "+Process.env.PORT);
})