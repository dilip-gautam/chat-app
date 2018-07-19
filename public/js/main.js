var socket = io(); //we are making request from client to server to open socket connection
socket.on('connect',function(){console.log('connected to server');
socket.emit('createMessage',{
    to:'sita',
    text:'whats up'});
});

socket.on('newMessage',function(msg){console.log('new message',msg);});
socket.on('disconnect',function(){console.log('Disconnected from server');});
