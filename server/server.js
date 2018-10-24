const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const api = require('./routes/api');// api is athe module from ./routes/api
const app = express();// instance of the express - the server

app.use(cors());

app.use(bodyParser.json());// to use bodyParser to handle json data
app.use('/api', api);//when U go to /api then use the api module
app.get('/', function(req, res){
    res.send('Hello from server');
});

app.listen(PORT, function(){
    console.log('Server running on localhost: ' + PORT);
});