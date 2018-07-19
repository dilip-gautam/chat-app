const path= require('path');
const express= require('express');
const http= require('http');
const socketio= require('socket.io');


const publicpath= path.join(__dirname,'../public');  //path to public
const port= process.env.PORT || 3000
var app= express();
var server=http.createServer(app);
var io= socketio(server);

app.use(express.static(publicpath));
io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.emit('email',{
        from:'ram@gmail.com',
        text:'Call u later'
    })

    socket.emit('newMessage',{
        from:'ram',
        text:'Call u later',
        createdAT: '12345'
    })
    socket.on('createMessage',(msg)=>{
        console.log('new message',msg);
    });


    socket.on('disconnect',()=>{console.log('Disconnected')});

});
server.listen(port ,()=>{console.log(`Server is running at ${port}`)});