var socket = io();

function scrollToBotttom(){
    var messages= jQuery('#messages');
    var newMessage= messages.children('li:last-child');
    var clientHeight= messages.prop('clientHeight');
    var scrollTop= messages.prop('scrollTop');
    var scrollHeight= messages.prop('scrollHeight');
    var newMessageHeight= newMessage.innerHeight();
    var lastMessageHeight= newMessage.prev().innerHeight();
    if (clientHeight+scrollTop+lastMessageHeight+newMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
  
    socket.emit('join', params, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } 
    });
  });    

    socket.on('disconnect',function(){console.log('');});

    socket.on('updateUserList',function(users){
    // console.log('users list',users);
    var ol= jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);  
});

socket.on('newMessage',function(msg){
    var formattedTime= moment(msg.createdAt).format('h:mm a')
    var template= jQuery('#message-template').html();
    var html= Mustache.render(template,
    {
        from:msg.from,
        text:msg.text,
        createdAt: formattedTime,
    });
    jQuery('#messages').append(html);
    scrollToBotttom();
});
    var messagetext= document.getElementById("msg");

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();

    socket.emit('createMessage',{ 
        text: messagetext.value
    },function(){
        messagetext.value=""
    });
});

