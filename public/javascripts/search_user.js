var usernameRegex = /@.*/
var images = ['/images/sonic-gif.gif', '/images/cat.gif', '/images/spongebob.gif', '/images/waiting.gif']

$(document).ready(function(){
  
  $('form.username').on('submit',function(e){
    e.preventDefault();
    $('.keyword-errors').hide();
    $('.username-errors').hide();
    var username = $(this).find("input[name=username]").val();

    if (usernameRegex.test(username)) {
      $('div.tweets').html("");

      $('#loading').attr('src', images[Math.round(Math.random()*3)]).show();
      
      
      $.post("/users/" + username.substring(1), function(data){
        $('div.tweets').html(data);
        $('#loading').hide();
      });
    } else {
      $('.username-errors').show();
      $('div.tweets').html("");
    }
  });
});
