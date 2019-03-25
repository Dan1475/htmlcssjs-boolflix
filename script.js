
function addTitle(title, original, lang, voto){


  var tempData = {
    title: title,
    original: original,
    lang: lang,
    voto: voto
  }
  var template = $('#box-template').html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);

  var ulFilms = $('.films');
  ulFilms.append(finalHTML);
}


function ajaxCall(title){

  var data = {

    api_key: '11361ae336b51f58679851b46306e28c',
    language: 'it-IT',
    query: title
  };

  $.ajax({

    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: data,
    success: function(data, state){
      console.log(data);
      ajaxSuccess(data);

    },
    error: function(request, state, error){
      console.log('error');
    }

  })
}


function ajaxSuccess(data){
  var res = data.results;

  for (var i = 0; i < res.length; i++) {
  var result = res[i];
  var title = result.title;
  var original = result.original_title;
  var lang = result.original_language;
  var voto = result.vote_average;
  addTitle(title, original, lang, voto);
  }
}

function init(){
$('#button').click(function(){
  $('li').remove();
  var input = $('#query').val();
  ajaxCall(input);
  $('#query').val('');

})

}

$(document).ready(init);
