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

findQuiz(1)