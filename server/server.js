var express = require('express');
var bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
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

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }
    //findbyId
    Todo.findById(id).then((todo) => {
        if(!todo){
          return  res.status(404).send({});
        }
        res.send({todo}).status(200);
    }).catch((e) => console.log(e));
});

app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        },(e) => res.status(400).send(e))
});

app.listen(3000, () => {
    console.log('Started on port 3000')
});

module.exports = {app};