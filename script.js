
function addTitle(title, original, flag, voto, locandina){

  var tempData = {
    locandina: locandina,
    title: title,
    original: original,
    flag: flag
  }

  var template = $('#box-template').html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);

  var ulFilms = $('.result');
  ulFilms.append(finalHTML);
  addStar(voto);
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
  var flag = getFlag(result.original_language);
  var voto = Math.round(result.vote_average / 2);
  var locandina = 'https://image.tmdb.org/t/p/w185/' + result.poster_path;

  console.log(voto);

  addTitle(title, original, flag, voto, locandina);
  }
}

function ajaxSeries(title){

  var data = {

    api_key: '11361ae336b51f58679851b46306e28c',
    language: 'it-IT',
    query: title
  };

  $.ajax({

    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: data,
    success: function(data, state){
      console.log(data);
      ajaxSuccessSeries(data);

    },
    error: function(request, state, error){
      console.log('error');
    }

  })
}
function ajaxSuccessSeries(data){
  var res = data.results;

  for (var i = 0; i < res.length; i++) {
  var result = res[i];
  var title = result.name;
  var original = result.original_name;
  var flag = getFlag(result.original_language);
  var voto = Math.round(result.vote_average / 2);
  var locandina = 'https://image.tmdb.org/t/p/w185/' + result.poster_path;


  console.log(voto);

  addTitleSeries(title, original, flag, voto, locandina);
  }
}

function addTitleSeries(title, original, flag, voto, locandina){


  var tempData = {
    locandina: locandina,
    title: title,
    original: original,
    flag: flag

  }


  var template = $('#box-template').html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);

  var res = $('.series');
  res.append(finalHTML);
  addStar(voto);
}



function addStar(voto){
 var filledStar = "<i class='fas fa-star'></i>";
 var emptyStar = "<i class='far fa-star'></i>"

  for (var i = 1; i <= 5; i++) {
   if ( voto >= i) {

     $('.star').last().append(filledStar);
   }
   else {
     $('.star').last().append(emptyStar);
   }

  }
}


function getFlag(language){
 var url;

 switch(language){
   case "it":
    url = "http://www.adesivi4x4.it/1395-thickbox_default/bandiera-italiana.jpg";
     break;
   case "en":
    url = "http://www.adesivi4x4.it/425-large_default/bandiera-inglese.jpg"

     break;
   case "es":
    url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2000px-Flag_of_Spain.svg.png";

     break;
   default:
    url = "https://images.emojiterra.com/twitter/v11/512px/2753.png"
 }
 return url;
}


function init(){
$('#button').click(function(){
  $('.films').remove();
  var input = $('#query').val();
  ajaxCall(input);
  ajaxSeries(input);
  $('#query').val('');

})

}

$(document).ready(init);
