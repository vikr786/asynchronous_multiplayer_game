const nodemailer = require('nodemailer');

const sendInvitationEmail = async (to, gameId) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const message = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Tic Tac Toe Invitation',
    html: `<p>You have been invited to play a game of Tic Tac Toe! Click <a href="http://localhost:3000/game/${gameId}">here</a> to accept the invitation and start playing.</p>`
  };

  try {
    await transporter.sendMail(message);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sendInvitationEmail };
