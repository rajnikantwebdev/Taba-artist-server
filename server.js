const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('server is running.....')
})

app.post('/send-email', (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    console.log('email submitted', req.body)
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      auth: {
        user: '5cd1f7fccf43e9',
        pass:'8c69f1eac1b8cc',
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'rsusishere@gmail.com',
      subject: `Contact Form Submission from ${firstName + lastName}`,
      html: `Name: ${firstName + lastName}<br>Email: ${email}<br>Message: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
