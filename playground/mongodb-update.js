const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
     return console.log('Unable to connect to MongoDB server');
    }
        console.log('Connected to database');
        const db = client.db('TodoApp');
        // db.collection('Todos').findOneAndUpdate({
        //     _id : new ObjectId('5abf99a58a78bd784eae4015')
        // },{
        //     $set : {
        //         completed : true
        //     }
        // }, {
        //     returnOriginal : false}).then((result) =>{
        //         console.log(result)
        //     });

        db.collection('Users').findOneAndUpdate({
            name : 'Ahamadh Dhawudh'
        },{
            $set : {
                    name : 'Mohamed Infaz'
            }, $inc : {
                    age : 1
            }
        }, 
        {
            returnOriginal : false}).then((result) => {
            console.log(result)
        });
        client.close();
});