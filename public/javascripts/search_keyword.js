function Search (term){
    this.term  = term;
  }

  Search.prototype.valid = function(){
    if (/.{3,}/.test(this.term)){
      return true;
    } else {
      this.error = 'Search term must be at least 3 characters in length.'
      return false;
    }
  }

  Search.prototype.displayErrors = function(selector){
    $(selector).append(this.error)
  }

var images = ['/images/sonic-gif.gif', '/images/cat.gif', '/images/spongebob.gif', '/images/waiting.gif']

$(document).ready(function(){

  $('form.search-term').on('submit', function(e){
    e.preventDefault();
    $('.errors').html('')

    var term = $(this).find("input[name=keyword]").val();

    var search = new Search(term);

    if (search.valid()){
      $('#loading').attr('src', images[Math.round(Math.random()*3)]).show();
      $.post('/keywords/' + search.term, function(data){
        $('div.tweets').html(data);
        $('#loading').hide();
      });  
    } else {
      $('.errors').html(search.error)
    }   

    $('.search-term').find('input[name=keyword]').val(''); 

  });
});
