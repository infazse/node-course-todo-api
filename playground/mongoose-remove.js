const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');
const {Users} = require('../models/user');

Todo.remove({}).then((result) => {
    console.log(result);
});