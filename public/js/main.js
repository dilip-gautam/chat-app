var socket = io(); //we are making request from client to server to open socket connection
socket.on('connect',function(){console.log('connected to server');
// socket.emit('createMessage',{
//     to:'sita@gmail.com',
//     text:'will contact you', });


});

socket.on('disconnect',function(){console.log('Disconnected from server');});
socket.on('newMessage',function(msg){console.log('new message',msg);

var li=jQuery('<li></li>');
    li.text(`${msg.from} ${msg.text} `);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Ram',
//     text:'Whats the weather like there?'},
//     function(value){console.log(value)}
// );
    

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();

    
    socket.emit('createMessage',{
        from: document.getElementById("username").value,
        text: document.getElementById("msg").value
    },function(){

    });
});

