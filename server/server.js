const path= require('path');
const express= require('express');
const http= require('http');
const socketio= require('socket.io');

const{message} = require('./functions/msg');
const publicpath= path.join(__dirname,'../public');  //path to public
const port= process.env.PORT || 3000
var app= express();
var server=http.createServer(app);
var io= socketio(server);

app.use(express.static(publicpath));
io.on('connection',(socket)=>{
    console.log('new user connected');
  

        socket.emit('newMessage', message('Admin','Welcome to chat app'));

        socket.broadcast.emit('newMessage',message('Admin','New user joined'));


        socket.on('createMessage',(msg,callback)=>{
            console.log('Server',msg);
            io.emit('newMessage',message(msg.from,msg.text));
            callback('This is sent from the server.');
        // socket.broadcast.emit('newMessage',{ //broadcast.emit send message to everyone except sender
        //     from:msg.from,
        //     text:msg.text,
        //     createdAt: new Date().getTime(),
        // });
    });


    socket.on('disconnect',()=>{console.log('Disconnected')});

});
server.listen(port ,()=>{console.log(`Server is running at ${port}`)});