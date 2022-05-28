const EventEmitter = require('events');
const nodemailer = require('nodemailer');
const MailEventEmitter = new EventEmitter();



const MailEvent= async() =>{

    return MailEventEmitter;

}



MailEventEmitter.on('test', () => {
    console.log('event trigered ');
    sendMail(['wopensys@gmail.com','kumarshubhendu228@gmail.com'],'for test','thanks ');
});



const sendMail= async(to,subject,message)=>{


    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}


module.exports={MailEvent,MailEventEmitter}