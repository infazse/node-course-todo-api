var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('../db/mongoose');
var {user} = require('../models/user');
var {Todo} = require('../models/todo');

var app = express();
app.use(bodyparser.json());
app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((result) => {
        res.send(result);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000')
});

module.exports = {app};