var express = require('express');
var bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('../db/mongoose');
var {user} = require('../models/user');
var {Todo} = require('../models/todo');
const port = process.env.PORT || 3000;
const _ = require('lodash');

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

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send({});
        }
        res.send({todo}).status(200);

    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=> {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo}).status(200);
    }).catch((e) => res.send.status(400));

});

app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        },(e) => res.status(400).send(e))
});

app.listen(port, () => {
    console.log('Started on port' + port);
});

module.exports = {app};