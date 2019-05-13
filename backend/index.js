'use strict';

//Connection to the db
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Import app
var app = require('./app');
var port = 3500;

mongoose.connect('mongodb://localhost:27017/tareas', { useNewUrlParser: true })
    .then(() => {
        console.log('The db is running...');
        //Put the server to listen
        app.listen(port, () => {
            console.log('The server is listening on port ' + port);
        });
    })
    .catch(error => console.log(error));