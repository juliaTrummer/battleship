$(function () {
    "use strict";

    var username = null;
    var formControl = $('.form-control');
    var greeting = $('#userGreeting');
    var grid = $('#tableGrid');
    var submitButton = $('#submitButton');
    var table = $('<table>');
    var gridArray = new Array(100).fill("empty");

    //websocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        console.log('Sorry, your browser does not support websockets')
        return;
      }
    
      //TODO: change this to the heroku ip address
      var connection = new WebSocket('ws://127.0.0.1:8080');
    
      connection.onopen = function () {
          console.log('Websocket opened!')
      };

      connection.onerror = function (error) {
        console.log('Sorry, there is a problem with the connection or our server is tired :)')
      };

      connection.onmessage = function (message) {
        try {
          var json = JSON.parse(message.data);
        } catch (e) {
          console.log('Invalid JSON: ', message.data);
          return;
        }
        console.log('Hello %s!', json.data.username)
      };

      setInterval(function() {
        if (connection.readyState !== 1) {
          console.log('Unable to communicate with the WebSocket server.')
        }
      }, 3000);


    //table
    $(document).ready(function () {
        console.log('Document is ready :)');
        createTable();
    });

    function createTable() {
        var tableBody = table;
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        var id = 1;
        for (var i = 0; i < 12; i++) {
            var row = $('<tr>');
            for (var j = 0; j < 12; j++) {
                if ((j === 0 || j === 11) && (i !== 0 && i !== 11)) {
                    var cell = $('<td>').addClass('tableCell numbering').text(alphabet[i - 1]);
                } else if ((i === 0 || i === 11) && (j !== 0 && j !== 11)) {
                    var cell = $('<td>').addClass('tableCell numbering').text(j);
                } else if (((i === 0 || i === 11) && (j == 0 || j == 11)) || ((j === 0 || j === 11) && (i == 0 || i == 11))) {
                    var cell = $('<td>');
                } else {
                    var cell = $('<td>').addClass('tableCell field').click(function () { onCellClick($(this).attr('id')) }).attr('id', 'id' + id)
                    id++;
                }
                row.append(cell);
                tableBody.append(row);
            }
        }
        grid.append(tableBody);
    }

    //interaction with table
    function onCellClick(id) {
        if ($('#' + id).attr('disabled') === 'disabled') {
            return;
        }
        $('#' + id).append($('<i>').addClass('material-icons').text('directions_boat'));
        //$('#' + id).append($('<i>').addClass('material-icons').text('close'));
        $('#' + id).attr('disabled', 'disabled');
        console.log('clicked on cell: ' + id);
    }

    //username input
    submitButton.on("click", function () {
        onSubmit();
    })

    formControl.keyup(function(e){
        if(e.which == 13 && formControl.val().length !== 0){
            onSubmit();
        } else if(formControl.val().length > 0){
            submitButton.prop('disabled', false);
        } else if(formControl.val().length === 0){
            submitButton.prop('disabled', true);
        }
    });

    function onSubmit(){
        greeting.text('Hello ' + formControl.val() + "!");        
        username = formControl.val();
        connection.send(username)
        formControl.val("");
        submitButton.prop('disabled', true);

        if (username !== null) {
            submitButton.text('Update');
            formControl.attr('placeholder', 'Enter a new username');
        }
    }
});
