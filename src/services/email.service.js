const nodemailer = require('nodemailer');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = (toEmail, template, params = {}, subject) => {
    let { password } = params;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ruan.oliveira.barbosa99@gmail.com',
            pass: 'inbgxsmasidctoep'
        }
    });

    const handleOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: './src/config/emailTemplate/',
            layoutsDir: './src/config/emailTemplate/',
            defaultLayout: null
        },
        viewPath: './src/config/emailTemplate/',
        extName: '.hbs'
    };

    transporter.use('compile', hbs(handleOptions));

    let mailOptions = {
        from: 'ruan.oliveira.barbosa99@gmail.com',
        to: toEmail,
        subject: 'Marvel Comics Info - ' + subject,
        template: template,
        context: {
            password: password
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new Error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};