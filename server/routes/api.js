const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb://admin55:admin55@ds131983.mlab.com:31983/eventsdb";

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if(err){
        console.error('Error! '+ err);
    }else{
        console.log('Connected to MongoDB');
    }
});

function verifyToken(req, res, next){// a middleware
    if(!req.headers.authorization){// if we don't have the authorization attribute inside the headers of request
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];// to not include Bearer inside the token

    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload;
    try{
        payload = jwt.verify(token, 'secretkey');
    }catch(err){
        return res.status(500).send('The error: ' + err);
    }

    if(!payload){
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
        let userData = req.body;
        let user = new User(userData);

        user.save((err, registeredUser) => {
            if(err){
                console.log(err);
            }else{
                let payload = {subject: registeredUser._id};
                let token = jwt.sign(payload, 'secretkey');//make the token
                res.status(200).send({token});//send the token from server to the browser
            }
        });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (err, user) => {
        if(err){
            console.log(err);
        }else{
            if(!user){
                res.status(401).send('Invalid email');
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password');
                }else{
                    let payload = {subject: user._id};
                    let token = jwt.sign(payload, 'secretkey');//make the token
                    res.status(200).send({token});
                }
            }
        }
    });
});

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(events);// send the response in json
});

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(events);// send the response in json
});

module.exports = router;