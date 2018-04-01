const expect = require('expect');
const request = require('supertest');
const {app}  = require('../server/server');
const {Todo} = require('../models/todo');
const {Users} = require('../models/user');
const {ObjectID} = require('mongodb');

var todos = [{_id : new ObjectID(), text : 'First todo get test'},{_id : new ObjectID(), text : 'Second todo get test'}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos).then(() => done());
    })
    .catch((e) => done(e));
});

describe('POST/todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo test';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text: text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e))
            });
    });

    // beforeEach((done) => {
    //     Todo.remove({}).then(() => done())
    //     .catch((e) => done(e));
    // })

    it('Should not create todos when a bad request', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
    });

    //todo not found
    it('There is no such object in the todo database', (done) => {
        request(app)
        .get(`/todos/${(new ObjectID).toHexString()}`)
        .expect(404)
        .end(done)
    });

    //invalid id still get a 404 non objectid
    it('The object id validation failed', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID) 
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.findById(hexID).then((res) => {
                    expect(res).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should return 404 if todo is not found', (done) => {
        request(app)
            .delete(`/todos/${(new ObjectID).toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/3jroijr')
            .expect(404)
            .end(done);
    });
});



