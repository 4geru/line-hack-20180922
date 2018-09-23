export module = {
  getImage: function(event){
    console.log({event: event})
    console.log({message: event.message.id})
    client.getMessageContent(event.message.id)
    .then((stream) => {
      stream.on('data', (chunk) => {
        console.log(chunk)
        insertImage(event, chunk)
      });
      stream.on('error', (err) => {
        console.log("erroe")
      });
    });
  },
  insertImage: function(event, binary){
    // データベース
    var dbn = "images";
    var cdb = cloudant.db.use(dbn);

    const docs = [ { 
      user_id: event.source.userId,
      "_attachments": {
        "A001": { 
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
}