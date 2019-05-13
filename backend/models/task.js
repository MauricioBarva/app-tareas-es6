'use strict';

//Creation of the Scheme

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    name: String,
    matter: String,
    teacher: String,
    description: String,
    date: String,
    hour: String,
});

module.exports = mongoose.model('Task', TaskSchema);