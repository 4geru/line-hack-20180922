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
var dbn = "groups";
// データベース新規作成
cloudant.db.create(dbn, function(err) { if (err) { throw err; } });

// データベース
var dbn = "images";
// データベース新規作成
cloudant.db.create(dbn, function(err) { if (err) { throw err; } });

// データベース
var dbn = "users";
// データベース新規作成
cloudant.db.create(dbn, function(err) { if (err) { throw err; } });

