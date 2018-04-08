const {SHA256} = require('crypto-js'); 
const jwt = require('jsonwebtoken');

var data = {
    id : 10
};

var token = jwt.sign(data,'123abc');
console.log('Token :',token);

//token = token + 'abc';

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id : 4
// };

// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'Some Secret').toString()
// };

// token.data.id = 7;
// token.hash = SHA256(JSON.stringify(data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'Some Secret').toString();
// if(resultHash === token.hash){
//     console.log('Data was not changed');
// } else {
//     console.log('Data changed unable to trust');
// }