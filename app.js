var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')


var authRouter = require('./routes/auth')
var hotelsRouter = require('./routes/hotels')



var app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
      } catch (error) {
        throw error;
      }
    
    }

    connect();
    
    mongoose.connection.on("disconnected",  () => {
        console.log("mongoDB disconnected")
    })

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth' , authRouter)
app.use('/api/hotels' , hotelsRouter)


module.exports = app;
