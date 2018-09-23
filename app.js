'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
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
  const problem = Math.floor(Math.random() * Math.floor(3));
  res.header('Content-Type', 'application/json; charset=utf-8')
  return res.send({quiz: problem});
});
app.post('/saveimage', (req, res) => {
  console.log(req)
  console.log(req.data)
})

const client = new line.Client(config);

function handleEvent(event) {
    insertUserId(event)
    console.log(event.source)
    if (event.source.type === 'group') {
      insertRoomId(event)
    }
    if (event.type === 'message' || event.message.type !== 'image') {
      //return getImage(event);
    }
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text //実際に返信の言葉を入れる箇所
    });
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

app.listen(PORT);
console.log(`Server running at ${PORT}`);
