  $(document).ready(function() {

    chat.init();

  });

  var chat = {

    init: function() {
      chat.initStyling();
      chat.initEvents();
    },

    initStyling: function(){
    chat.renderMessages();
  },

  initEvents: function(){

    $('.createMessage').on('submit', function(event){
      event.preventDefault();
      console.log("submit working");
      var newMessage = {
        user: $(this).find('input[name="userName"]').val(),
        message: $(this).find('input[name="message"]').val()

      };
      console.log($(this).find('input[name="message"]').val())
      console.log(newMessage);


      chat.createMessage(newMessage);
  });

      $('.container').on('click', '.delete-messages', function(e){
        e.preventDefault();
        console.log("deleting messages...");
        var listLength = $('.message').length;
        for( var i = 0; i < listLength; i++ ) {
          var thisMessage = $('.message').eq(i);
          cr.deleteMessage(thisMessage.data('messageid'));
        }
        cr.renderMessages();

    });
},
    config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/allstar',
 },

 render: function (data, tmpl, $el) {
  var template = _.template(data, tmpl);
  $el.append(template);
},

  renderMessages: function () {
    $.ajax({
    url: chat.config.url,
    type: 'GET',
    success: function (chat) {
      var template = _.template($('#Tmpl').html());
      var markup = "";
      chat.forEach(function (message, idx, arr) {
        markup += template(message);
      });
      console.log('markup is.....', markup);
      $('article').html(markup);
    },
    error: function (err) {
      console.log(err);
    }
  });
},

  createMessage: function(message) {
    console.log(message);

    $.ajax({
    url: chat.config.url,
    data: message,
    type: 'POST',
    success: function (data) {
      console.log(data);
      var userInfo = JSON.stringify(data);
      localStorage.setItem('userInfo', userInfo);

      $('input.message-input').val('');
    },
    error: function (err) {
      console.log(err);
    },
  });
},

deleteMessage: function(id) {
  $.ajax({
    url: cr.config.base,
    type: 'DELETE',
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

// completeTask: function (event) {
//

//
//   updateTask: function (id, task) {
//
//  },
//
 };
