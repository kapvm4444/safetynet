const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');
const axios = require('axios');

const sendMail = catchAsync(async (user) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: '85c9cc002@smtp-brevo.com',
      pass: '0NOzEarCb9g1ZGTP',
    },
  });

  const mailOptions = {
    from: 'kapvm4444@gmail.com',
    to: 'darshanvaru2003@gmail.com',
    subject: 'Emergency Alert from your friend',
    text: `Hello User, You are in emergency contact list of ABC person \n something terrible happened and he send this alert to you. Please contact him ASAP`,
  };

  await transporter.sendMail(mailOptions);

  await axios({
    method: 'post',
    url: 'https://api.brevo.com/v3/transactionalSMS/sms',
    headers: {
      Accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    data: {
      sender: 'Safety',
      recipient: '+918128617434',
      content: 'Emergency Alert',
      unicodeEnabled: true,
      organisationPrefix: 'Safety.net',
    },
  });
});

module.exports = sendMail;
