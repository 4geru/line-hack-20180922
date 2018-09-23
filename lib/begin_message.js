module.exports = {
  begin_message: [{
    type: 'text',
    text: 'test' //実際に返信の言葉を入れる箇所
  }, {
    "type": "flex",
    "altText": '難易度を選んでください',
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "難易度を選んでください",
            "weight": "bold",
            "size": "md"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "primary",
            "height": "md",
            "action": {
              "type": "postback",
              "label": "簡単",
              "data": "簡単"
            }
          },
          {
            "type": "button",
            "style": "primary",
            "height": "md",
            "action": {
              "type": "postback",
              "label": "普通",
              "data": "普通"
            }
          },
          {
            "type": "button",
            "style": "primary",
            "height": "md",
            "action": {
              "type": "postback",
              "label": "難しい",
              "data": "難しい"
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
    }
  }]
}