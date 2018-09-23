'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const begin_message = require('./lib/begin_message')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const config = {
      channelSecret: process.env.CHANNEL_SECRET,
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

var cred = {
  "credentials": {
    "username": "1a597e87-3f65-4264-bba1-5d2edf6561cf-bluemix",
    "password": "ec68e4387c4ca7885885d3983edaaa807ee12874ebbbabb6f7dc5ad34163128e",
    "host": "1a597e87-3f65-4264-bba1-5d2edf6561cf-bluemix.cloudant.com",
    "port": 443,
    "url": "https://1a597e87-3f65-4264-bba1-5d2edf6561cf-bluemix:ec68e4387c4ca7885885d3983edaaa807ee12874ebbbabb6f7dc5ad34163128e@1a597e87-3f65-4264-bba1-5d2edf6561cf-bluemix.cloudant.com",
  }
}
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
      console.log(req.body.events);
      Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});
app.get('/api/:userId', (req, res) => {
  console.log(req.params)
  const problem = updateParams(userId);
  res.header('Content-Type', 'application/json; charset=utf-8')
  return res.send({quiz: problem});
});
app.post('/saveimage/:userId', (req, res) => {
  console.log(req.params)
  req.on('data', function (chunk) {
    console.log(chunk)
    console.log(req.params.userId)
    insertImage(req.params.userId,chunk)
  });
  console.log(req)
  console.log(req.body)
})

const client = new line.Client(config);

function handleEvent(event) {
    insertUserId(event)
    console.log(event.source)
    if (event.type === 'join') {
      return client.replyMessage(event.replyToken,begin_message.begin_message)
    }

    if (event.source.type === 'group') {
      insertRoomId(event)
    }

    if (event.type === 'postback' || event.source.type === 'group') {
      postback(event)
    }
    if (event.type === 'message' || event.message.type !== 'image') {
      //return getImage(event);
    }
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }
    if (event.message.text === 'mew'){
      return client.replyMessage(event.replyToken,begin_message.begin_message)
    }

    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text //実際に返信の言葉を入れる箇所
    });
}

function postback(event) {
  var data = event.postback.data;
  console.log(data);
}

function insertUserId(event){
  // データベース
  var dbn = "users";
  var cdb = cloudant.db.use(dbn);
  const docs = [ { _id: event.source.userId} ]
  console.log(docs)
  // データのINSERT
  cdb.insert( docs[0], docs[0].type, function(err, body, header) {
      if (err) { return err; }
      console.log('You have inserted', body);
  });
}

function insertGroupId(event){
  // データベース
  var dbn = "group";
  var cdb = cloudant.db.use(dbn);
  const docs = [ { _id: event.source.roomId} ]
  console.log(docs)
  // データのINSERT
  cdb.insert( docs[0], docs[0].type, function(err, body, header) {
      if (err) {
      throw err;
      }
      console.log('You have inserted', body);
  });
}

function getImage(event){
  client.getMessageContent(event.message.id)
  .then((stream) => {
    stream.on('data', (chunk) => {
      console.log(chunk)
      insertImage(event.source.userId, chunk)
    });
    stream.on('error', (err) => {
      console.log("erroe")
    });
  });
}

function insertImage(userId, binary){
  // データベース
  var dbn = "images";
  var cdb = cloudant.db.use(dbn);

  const docs = [ { 
    user_id: userId,
    "_attachments": {
      "image": { 
        "content_type": "image/jpeg",  
        "data": binary.toString('base64')
      }
    }
  } ]
  console.log(docs)
  // データのINSERT
  cdb.insert( docs[0], docs[0].type, function(err, body, header) {
      if (err) {
      throw err;
      }
      console.log('You have inserted', body);
  });
}

function findQuiz(id){
  // データベース
  var dbn = "quiz";
  var cdb = cloudant.db.use(dbn);
  query = {
      "selector": {
      "id": id
      },
      "fields": [
      "_id",
      "answer"
      ]
  }

  // 検索実行
  cdb.find(query,function(err, body) {
      if (err) { throw err; }
      console.log("Hits:",body.docs.length);
      for (var i = 0; i < body.docs.length; i++) {
      console.log(body.docs[i]);
      }
  });
}

function findQuiz(id){
  // データベース
  var dbn = "quiz";
  var cdb = cloudant.db.use(dbn);
  console.log(id)
  query = {
      "selector": {
      "_id": id.toString()
      },
      "fields": [
      "_id",
      "answer"
      ]
  }

  // 検索実行
  cdb.find(query,function(err, body) {
      if (err) { throw err; }
      console.log("Hits:",body.docs.length);
      for (var i = 0; i < body.docs.length; i++) {
      console.log(body.docs[i]);
      }
  });
}

function getUserQuiz(userId){
  // データベース
  var dbn = "rooms";
  var cdb = cloudant.db.use(dbn);
  var quiz_id = Math.floor(Math.random() * Math.floor(3))
  cdb.get(roomId, function(err,data) {
    console.log("Before update = ", data);
    data.quiz_id = quiz_id
    cdb.insert(data, key, function(err, body, header) {
    if (err) { throw err; } 
    });
  });
  return quiz
}

function findRoomQuiz(room_id){
  // データベース
  var cdb = cloudant.db.use("rooms");
  query = {
      "selector": {
      "_id": room_id
      },
      "fields": [
      "_id",
      "quiz_id"
      ]
  }

  // 検索実行
  cdb.find(query,function(err, body) {
    console.log(err)
      if (err) { throw err; }
      console.log("Hits:",body.docs.length);
      for (var i = 0; i < body.docs.length; i++) {
      console.log(body.docs[i]);
      }
  });
}

app.set("view engine", "ejs");
app.get("/", (req, res) => { res.render(__dirname + "/index"); })
app.listen(PORT);
console.log(`Server running at ${PORT}`);
