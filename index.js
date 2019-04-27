let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new-message', (msgDetails) => {
        console.log('new-message emmited ....');
        io.emit('new-message', msgDetails);
    });

    socket.on('new-user', (user) => {
        console.log('new-user emmited ....');
        io.emit('new-user', user);
    });
    socket.on('signout-user', (user) => {
        console.log('signout-user emmited ....');
        io.emit('signout-user', user);
    });

    var rooms = [];    
    socket.on('createroom', function (data) {
        var new_room = ("" + Math.random()).substring(2, 7);
        rooms.push(new_room);
        data.Room = new_room;
        //socket.emit('updatechat', new_room);
        socket.emit('roomcreated', data);
    });



});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});