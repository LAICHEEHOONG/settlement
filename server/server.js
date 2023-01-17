const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); 
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
const path = require('path');
const passwordRoute = require('./api/password');
const loginRoute = require('./api/login');
const verifyRoute = require('./api/verify');
const settlementRoute = require('./api/settlement');

mongoose.connect(mongoUri);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/password', passwordRoute);
app.use('/api/login', loginRoute);
app.use('/api/verify', verifyRoute);
app.use('/api/settlement', settlementRoute);

app.use(express.static('client/build'));

if (process.env.NODE_ENV === 'production') {
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
        if (err) {
          res.status(500).send(err)
        }
      });
    })
  }


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Connect port: ${port}`)
})

//rm -rf .git // cd client

//heroku login
//git add .
//git commit -am ""
//git push heroku master
