const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendMail = catchAsync(async (user) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Alert@safety.net',
    to: 'kapvm4444@gmail.com',
    subject: 'Emergency Alert from', // Subject line
    text: `Hello User, You are in emergency contact list of ${user.fullName} \n something terrible happened and he send this alert to you. Please contact him ASAP`,
  };

  await transporter.sendMail(mailOptions);
});

module.exports = sendMail;
