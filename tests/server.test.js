const expect = require('expect');
const request = require('supertest');
const {app}  = require('../server/server');
const {Todo} = require('../models/todo');
const {Users} = require('../models/user');

beforeEach((done) => {
    Todo.remove({}).then(() => done())
    .catch((e) => done(e));
})

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

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e))
            });
    });

    beforeEach((done) => {
        Todo.remove({}).then(() => done())
        .catch((e) => done(e));
    })

    it('Should not create todos when a bad request', (done) => {
        //var text = '';

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});