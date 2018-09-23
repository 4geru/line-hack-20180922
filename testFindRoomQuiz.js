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

findRoomQuiz('R4ebf62064ee73df9399529112f6db28c')