const path= require('path');
const express= require('express');
const http= require('http');
const socketio= require('socket.io');

const{message} = require('./functions/msg');
const{isRealString}= require('./functions/validation');
const{Users}=require('./functions/users');
const publicpath= path.join(__dirname,'../public');  //path to public
const port= process.env.PORT || 3000
var app= express();
var server=http.createServer(app);
var io= socketio(server);
var users= new Users();

app.use(express.static(publicpath));
io.on('connection',(socket)=>{
    console.log('new user connected');

        socket.on('join', (params, callback) => {
            if (!isRealString(params.name) || !isRealString(params.room)) {
                return callback('Name and room name are required.');
            }
                socket.join(params.room);
                users.removeUser(socket.id);
                users.addUser(socket.id, params.name, params.room);
            
                io.to(params.room).emit('updateUserList', users.getUserList(params.room));
                socket.emit('newMessage', message('Admin', 'Welcome to the chat app'));
                socket.broadcast.to(params.room).emit('newMessage', message('Admin', `${params.name} has joined.`));
                callback(); 
          });
        

        socket.on('createMessage',(msg,callback)=>{
            console.log('Server',msg);

            var user= users.getUser(socket.id);
            if(user && isRealString(msg.text)){
                io.to(user.room).emit('newMessage',message(user.name,msg.text));
            }
            callback();
    });


    socket.on('disconnect',()=>{
        var user= users.removeUser(socket.id);
        if (user) {
                  io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                  io.to(user.room).emit('newMessage', message('Admin', `${user.name} has left.`));
                }
        console.log('Disconnected')
     });

});
server.listen(port ,()=>{console.log(`Server is running at ${port}`)});