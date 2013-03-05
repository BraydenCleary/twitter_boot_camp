var usernameRegex = /@.*/;

function LoadingImage (){
  this.files = ['/images/sonic-gif.gif', '/images/cat.gif', '/images/spongebob.gif', '/images/waiting.gif'];
}

LoadingImage.prototype.selectRandom = function(){
  return this.files[Math.round(Math.random()*3)];
}

var image = new LoadingImage();

$(document).ready(function(){

  $('form.username').on('submit',function(e){
    e.preventDefault();
    $('.errors').html('')
    var username = $(this).find("input[name=username]").val();

    if (usernameRegex.test(username)) {
      $('div.tweets').html("");

      $('#loading').show().attr('src', image.selectRandom());  
      
      $.post("/users/" + username.substring(1), function(data){
        $('div.tweets').html(data);
        $('#loading').hide();
      });
    } else {
      $('.errors').html('Invalid Twitter Handle');
      $('div.tweets').html("");
    }
    $('.username').find('input[name=username]').val(''); 
    $('.username').find('input').attr('placeholder', username)

  });
});
