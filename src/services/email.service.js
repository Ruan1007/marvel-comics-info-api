const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = (toEmail, template, params = {}, subject) => {
  const { password } = params;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL_SERVICE,
      pass: process.env.PASS_EMAIL_SERVICE,
    },
  });

  const handleOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: './src/config/emailTemplate/',
      layoutsDir: './src/config/emailTemplate/',
      defaultLayout: null,
    },
    viewPath: './src/config/emailTemplate/',
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handleOptions));

  const mailOptions = {
    from: process.env.USER_EMAIL_SERVICE,
    to: toEmail,
    subject: `Marvel Comics Info - ${subject}`,
    template,
    context: {
      password,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    } else {
      console.log(`Email sent:  ${info.response}`);
    }
  });
};
