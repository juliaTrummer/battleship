var express = require('express');
var app = express();

//var port = process.env.PORT || 8080
var port = 8080;
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.render("index");
})

//TODO: use this again
// app.listen(port, function () {
//     console.log("Server is listening on port ", port)
// })

var clients = [ ];

var webSocketServerPort = port;
var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response){
    //empty
});

//check this, if the heroku server is already running
server.listen(webSocketServerPort, function(){
    console.log('Server is now listening to: ', webSocketServerPort)
})

var wsServer = new webSocketServer({
    httpServer: server
})

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

