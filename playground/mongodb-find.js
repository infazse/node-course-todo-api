const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
     return console.log('Unable to connect to MongoDB server');
    }
        console.log('Connected to database');
        const db = client.db('TodoApp');

        // db.collection('Todos').find({
        //     _id : new ObjectId('5abf827a8a78bd784eae3d8e')
        // }).toArray().then((docs) => {
        //         console.log('Tods');
        //         console.log(JSON.stringify(docs,undefined,2));
        // }, (err) => {
        //     console.log('unable to fetch TODOs')
        // });
        
        // db.collection('Todos').find().count().then((count) => {
        //         console.log(`Todos count: ${count}`);
        // }, (err) => {
        //     console.log('unable to fetch TODOs')
        // });

        db.collection('Users').find({
            name : 'Infaz'
        }).toArray().then((docs) => {
                console.log('Tods');
                console.log(JSON.stringify(docs,undefined,2));
        }, (err) => {
            console.log('unable to fetch TODOs')
        });
        client.close();
});