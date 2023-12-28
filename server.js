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
    const { name, email, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rsusishere@gmail.com',
        pass: 'rajnikisajni@2003',
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'rsusishere@gmail.com',
      subject: `Contact Form Submission from ${name}`,
      html: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`,
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
