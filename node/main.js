var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
// 2 dimensional array for rooms and users
var rooms = [[]];

// —————————— Debug // Test Section ———————————————
rooms["room"] = [];
rooms["room"].push("adam");
rooms["room"].push("Luca");
rooms["room"].push("Peppe");

// DEBUG 
console.log("Rooms : "  + rooms["room"].length);
// rooms["room"].pop(["adam"]);

console.log("rooms : " + rooms["room"].length);

// ————————— End Debug // Test Section ——————————————


app.get('/', function(req, res){
    res.send('<h1> Nothing available here.</h1>');
    io.to("logger").emit('missingPersons', {data: "lost.."});
});

app.use('/client', express.static('../client'));

io.on('connection', function(socket){
    // Room info
    var room = socket.handshake.query['room'];
    // Debug Logging
    console.log(room);
    // Join Room Socket
    socket.join(socket.handshake.query['room']);
    // Log
    // TODO: Implement audit log trail
    console.log('User joined');
    // Create the room in our state if we don't have it
    if(!rooms[room]){
        rooms[room] = [];
    }
    // Disconnect / leaving
    socket.on('disconnect', function(){
        console.log('A user has disconnected!');
    });

    // Join Room
    socket.on('roomjoin', function(data){
        console.log('User Joined room: ' + data.room);
        // Create local pool if not there
        if(!rooms[data.room]){
            rooms[data.room] = [];
        }
        // Emit to specific Room!
        io.to(data.room).emit('newjoin', {data: "mazafaka"});
    });

    // Leave room
    socket.on('leaveRoom', function(data){
        console.log('User left room : ' + data.room);
        // If no room exists, return anyway
        if(!rooms[data.room] || !rooms[data.room]){
            return true;
        }
        // Remove
        rooms[data.room].pop(data.name);
        // Debug Log
        console.log("Users remaining : "  + rooms[data.room].length);
        // Update rooms with their people
        io.to(data.room).emit('people', {data: rooms[room]});
    });

    socket.on('setname', function(data){
        var room = data.room;
        if(!rooms[room]){
            rooms[room] = [];
        }
        console.log(rooms);
        rooms[room].push(data.name);
        // Debug logging
        console.log('Name updated : ' + data.name);
        io.to(data.room).emit('people', {data: rooms[room]});
    });

    socket.on("vote", function(data){
        console.log(data);
        io.to(data.room).emit('voteadded', {data: data});
    })
});

http.listen(3001, function(){
    console.log('listening on *:3001');
});

