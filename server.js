const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongo = require("mongodb").MongoClient;
const dotenv = require('dotenv').config();
const dbUri = process.env.DBURI;
const app = express();

app.use(bodyParser());
app.use('/public',express.static(__dirname + '/public'));

app.get('/',function(request,response){
    response.sendFile(path.join(__dirname + '/public/index.html'));
});


mongo.connect(dbUri,function(err,database){
    const urlDatabase = database.db('voting-app-db');
    const collection = urlDatabase.collection('poll-collection');
    if(err){
        console.log('cant connect to db');
    }
    console.log('connected to db');

    app.post('/givemepolls',function(request,response){
        collection.find().sort({_id:-1}).limit(10).toArray(function(error,data){
            if(error){
                console.log('Cannot retrieve data from collection');
            }
            response.json(data);
        })
    });

    app.post('/addpoll',function(request,response){
        collection.insertOne(request.body,function(error,success){
            if(error){
                console.log('could not recieve data from clients POST request');
            }
            else{
                console.log('Data sent to DB!');
            }
        });      
    });

    let poll = {
        poll_title:"Who's the best pokemon",
        author:'user_username',
        creation_date:'date property',
        totalVotes:10,
        options:{
            option1: 6,
            option2: 4,
        }
        
    }
     
});

app.listen(3000,function(){
    console.log('server working!');
})






