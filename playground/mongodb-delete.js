const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
     return console.log('Unable to connect to MongoDB server');
    }
        console.log('Connected to database');
        const db = client.db('TodoApp');
        //delete many
        // db.collection('Todos').deleteMany({text : 'Eat lunch'}).then((result) => {
        //     console.log(result);
        // });

        // db.collection('Todos').deleteOne({text : 'Eat lunch'}).then((result) => {
        //     console.log(result);
        // });
        //findoneandDelete
        // db.collection('Todos').findOneAndDelete({completed : false}).then((result) => {
        //     console.log(result);
        // });

        //delete many
        // db.collection('Users').deleteMany({name : 'Infaz'}).then((result) => {
        //     console.log(result);
        // });

        db.collection('Users').findOneAndDelete({_id : new ObjectId('5abe852f02661535f7cbb5fb')}).then((result) => {
            console.log(result);
        });
        client.close();
});