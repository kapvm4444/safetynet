const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');
const axios = require('axios');

const sendMail = catchAsync(async (user, request) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message =
    `Hello User, You are in emergency contact list of ${user.name} person\n` +
    `something terrible happened and he send this alert to you. Please contact him ASAP` +
    `his last location was\n`;

  const mailOptions = {
    from: 'kapvm4444@gmail.com',
    to: user.email,
    subject: 'Emergency Alert from your friend',
    text: message,
    html: `<h1>${message}</h1>`,
  };

  await transporter.sendMail(mailOptions);

  // await axios({
  //   method: 'post',
  //   url: 'https://api.brevo.com/v3/transactionalSMS/sms',
  //   headers: {
  //     Accept: 'application/json',
  //     'api-key': process.env.BREVO_API_KEY,
  //     'Content-Type': 'application/json',
  //   },
  //   data: {
  //     sender: 'Safety',
  //     recipient: '+918128617434',
  //     content: 'Emergency Alert',
  //     unicodeEnabled: true,
  //     organisationPrefix: 'Safety.net',
  //   },
  // });
});

module.exports = sendMail;
