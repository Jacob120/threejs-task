const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const connectToDB = require('./db');
const sendMail = require('./nodemailer');
require('dotenv').config({ path: './.env' });

const productsRoutes = require('./routes/products.routes');

const app = express();

// connect to DB
connectToDB();

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', productsRoutes);

app.post('/api/send-mail', (req, res) => {
  const { cart, email } = req.body;

  const orderSummary = cart
    .map((item) => {
      return `- ${item.product.name} (${item.material}) x${item.quantity}: $${
        item.product.price * item.quantity
      }`;
    })
    .join('\n');

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const mailOptions = {
    from: 'publishinghouse.kk@gmail.com',
    to: email,
    subject: 'Order summary',
    html: `
      <h1>Order Summary</h1>
      <p>${orderSummary}<p>
      <p>Total quantity: ${totalQuantity}</p>
      <p>Total price: $${totalPrice}</p>
    `,
  };

  sendMail(mailOptions);

  res.send({ message: 'Email sent!' });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    mongoUrl: process.env.DB_URL,
    store: MongoStore.create(mongoose.connection),
  })
);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;
