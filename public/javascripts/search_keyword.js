function Search (term){
    this.term = term;
  }

  Search.prototype.valid = function(){
    if (/.{3,}/.test(this.term)){
      return true;
    } else {
      return false;
    }
  }

$(document).ready(function(){
  $('form.search-term').on('submit', function(e){
    $('.keyword-errors').hide();
    $('.username-errors').hide();
    e.preventDefault();

    var term = $(this).find("input[name=keyword]").val();

    var search = new Search(term);

    if (search.valid()){
      $.post('/keywords/' + search.term, function(data){
        $('div.tweets').html(data)
        $('.search-term').find('input[name=keyword]').val('')
      });  
    } else {
      $('.keyword-errors').show();
      $('.search-term').find('input[name=keyword]').val('')
    }    
  });
});
