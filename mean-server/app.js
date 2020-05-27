const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const prevalenciaRoute = require('./routes/prevalencia');
const pcrRoute = require('./routes/pcr');
const hospitalizadoRoute = require('./routes/hospitalizado');

app.use('/prevalencia', prevalenciaRoute);
app.use('/pcr', pcrRoute);
app.use('/hospitalizado', hospitalizadoRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
});

//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true},() => 
    console.log('Connected to db')
); 

//Listen to server
app.listen(3000);