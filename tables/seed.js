#!/usr/bin/env node

// Cloudantへの接続
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

// データベース
var dbn = "quiz";
var cdb = cloudant.db.use(dbn);

//        KEY       DATA
docs = { '0': { answer: 'かめ'},
   '1':  { answer: 'わに'},
   '2':  { answer: 'くま'}}

// データ挿入ループ
for(var key in docs) {
    console.log("key  = ",key);
    console.log("docs = ",docs[key]);
    cdb.insert(docs[key],key,function(err, body, header) {
  if (err) {
      console.log("err : ", err);
      throw err;
  }
  console.log('You have inserted', body);
    });
}
