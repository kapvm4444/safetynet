const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

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
    from: 'Alert@safety.net',
    to: 'kapvm4444@gmail.com',
    subject: 'Emergency Alert from your friend',
    text: `Hello User, You are in emergency contact list of ABC person \n something terrible happened and he send this alert to you. Please contact him ASAP`,
  };

  await transporter.sendMail(mailOptions);
});

module.exports = sendMail;
