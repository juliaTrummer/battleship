const express = require('express');
const { Server } = require('ws');

var server = express();
var clients = [ ];

var port = process.env.PORT || 8080
server.use(express.static(__dirname));

server.get("/", function (req, res) {
    res.render("index");
})

server.listen(port, function(){
    console.log('Server is now listening to: ', port)
})

const wsServer = new Server({server})

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
  
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');
  
  
    connection.on('message', function (message) {
      if (message.type === 'utf8') { 
          var obj = {
            time: (new Date()).getTime(),
            username:message.utf8Data,
          };
  
          var json = JSON.stringify({type: 'message', data: obj});
          for (var i = 0; i < clients.length; i++) {
            clients[i].sendUTF(json);
          }
        }
    });
  
    connection.on('close', function (connection) {
        clients.splice(index, 1);
    });
  });

