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

function updateRoomQuiz(roomId){
    var cdb = cloudant.db.use('rooms');
    cdb.get(roomId, function(err,data) {
    if (err) {
        // 新規の場合
        const docs = [ { _id: roomId, quiz_id: Math.floor(Math.random() * Math.floor(3))} ]
        console.log(docs)
        // データのINSERT
        cdb.insert( docs[0], docs[0].type, function(err, body, header) {
            if (err) {
            throw err;
            }
            console.log('You have inserted', body);
        });

    } else {
    　　// 既に同じ _id のインデックスがある場合
    cdb.destroy(data._id, data._rev, function(err, body, header) {
        if (err) {
        throw err;
        }

        const docs = [ { _id: roomId, quiz_id: Math.floor(Math.random() * Math.floor(3))} ]
        console.log(docs)
        // データのINSERT
        cdb.insert( docs[0], docs[0].type, function(err, body, header) {
            if (err) {
            throw err;
            }
            console.log('You have inserted', body);
        });
    });
    }
});
}

updateRoomQuiz('R4ebf62064ee73df9399529112f6db28c')