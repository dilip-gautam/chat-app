var socket = io(); //we are making request from client to server to open socket connection
socket.on('connect',function(){console.log('connected to server');
// socket.emit('createMessage',{
//     to:'sita@gmail.com',
//     text:'will contact you', });


});

socket.on('disconnect',function(){console.log('Disconnected from server');});
socket.on('newMessage',function(msg){
    console.log('new message',msg);
    var formattedTime= moment(msg.createdAt).format('h:mm a')
    var template= jQuery('#message-template').html();
    var html= Mustache.render(template,
    {
        from:msg.from,
        text:msg.text,
        createdAt: formattedTime,

    });
    jQuery('#messages').append(html);
    // var li=jQuery('<li></li>');
    //     li.text(`${msg.from}: ${msg.text} :${formattedTime} `);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Ram',
//     text:'Whats the weather like there?'},
//     function(value){console.log(value)}
// );
    
    var messagetext= document.getElementById("msg");

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();

    socket.emit('createMessage',{
        from: 'ram',
        text: messagetext.value
    },function(){
        messagetext.value=""
    });
});

