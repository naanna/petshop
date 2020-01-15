//配置服务端口
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
    var userNum = 0; //统计在线人数
    var chatList = []; //记录聊天记录
    var WebSocketServer = require('ws').Server;
    wss = new WebSocketServer({ port: 8181 }); //8181 与前端相对应
    //调用 broadcast 广播，实现数据互通和实时更新
    wss.broadcast = function(msg) {
      wss.clients.forEach(function each(client) {
        client.send(msg);
      });
    };
    wss.on('connection', function(ws) {
      userNum++; //建立连接成功在线人数 +1
      wss.broadcast(
        JSON.stringify({ funName: 'userCount', users: userNum, chat: chatList })
      ); //建立连接成功广播一次当前在线人数
      console.log('Connected clients:', userNum);
      //接收前端发送过来的数据
      ws.on('message', function(e) {
        var resData = JSON.parse(e);
        console.log('接收到来自clent的消息：' + resData.msg);
        chatList.push({
          userId: resData.userId,
          content: resData.msg,
          createtime: resData.createtime
        }); //每次发送信息，都会把信息存起来，然后通过广播传递出去，这样此每次进来的用户就能看到之前的数据
        wss.broadcast(
          JSON.stringify({
            userId: resData.userId,
            msg: resData.msg,
            createtime: resData.createtime
          })
        ); //每次发送都相当于广播一次消息
      });
      ws.on('close', function(e) {
        userNum--; //建立连接关闭在线人数 -1
        wss.broadcast(
          JSON.stringify({ funName: 'userCount', users: userNum, chat: chatList })
        ); //建立连接关闭广播一次当前在线人数
        console.log('Connected clients:', userNum);
        console.log('长连接已关闭');
      });
    });
    console.log('服务器创建成功');
  });