var usernameRegex = /@.*/
var images = ['/images/sonic-gif.gif', '/images/cat.gif', '/images/spongebob.gif', '/images/waiting.gif']

$(document).ready(function(){
  
  $('form.username').on('submit',function(e){
    e.preventDefault();
    $('.errors').hide();
    var username = $(this).find("input[name=username]").val();

    if (usernameRegex.test(username)) {
      $('div.tweets').html("");

      $('#loading').attr('src', images[Math.round(Math.random()*3)]).show();
      
      
      $.post("/" + username.substring(1), function(data){
        $('div.tweets').html(data);
        $('#loading').hide();
      });
    } else {
      $('.errors').show();
      $('div.tweets').html("");
    }
  });
});
