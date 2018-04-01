const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');
const {Users} = require('../models/user');

var id = '5abfc7331791e13b08213157';

// if(!ObjectID.isValid(id)){
//     console.log('ObjectID is not valid');
// }

// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id : id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         console.log('Id not found')
//     }
//     console.log('Todos', todo);
// }).catch((e) => console.log(e));

Users.findById(id).then((user) => {
    if(!user) {
        return console.log('Id not found')
    }
    console.log('Todos', user);
}).catch((e) => console.log(e));