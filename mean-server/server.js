const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const prevalenciaRoute = require('./routes/prevalencia');
const pcrRoute = require('./routes/pcr');
const hospitalizadoRoute = require('./routes/hospitalizado');
const residenciaRoute = require('./routes/residencia');
const territorioRoute = require('./routes/territorio');

const PORT = process.env.PORT || 3000;

app.use('/prevalencia', prevalenciaRoute);
app.use('/pcr', pcrRoute);
app.use('/hospitalizado', hospitalizadoRoute);
app.use('/residencia', residenciaRoute);
app.use('/territorio', territorioRoute);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('./mean-web/dist/mean-web'));

    app.get('*', (req, res) => {
        res.sendFile('index.html', {root: 'mean-web/dist/mean-web/'});
    });
}    

//connect to db
mongoose.connect(
    process.env.MONGOLAB_URI || process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "ancovid-db"},() => 
    console.log('Connected to db')
); 

//Listen to server
app.listen(PORT, console.log('Server is starting at '+ PORT));