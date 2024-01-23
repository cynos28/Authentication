const nodemailer = require('nodemailer');
const hbs =require('nodemailer-express-handlebars');
const path =require('path');

const sendEmail = async (
    subject,
    send_to,
    send_from,
    reply_to,
    template,
    name,
    link    )=>{

        //Create Email Transporter

        const transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:587,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        
        const handlebarOptions={
            viewEngine:{
                extname:".handlebars",
                partialDir :path.resolve("./views"),
                defaultLayout :false
            },
            viewPath:path.resolve("./views"),
            extname:".handlebars",
        }

        //option for sending email
        const options = {
            from: send_from,
            to: send_to,
            subject: subject,
            replyTo: reply_to,
            template: template,
            context: {
                name: name,
                link: link
            }
        };
         
        //Send Email
        transporter.use('compile', hbs(handlebarOptions));
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent:'+ info.response);
            }
        });

    };
    module.exports = sendEmail;