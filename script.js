function ajaxMovieCall(input){

  var data = {

    api_key: '11361ae336b51f58679851b46306e28c',
    language: 'it-IT',
    query: input
  };

  $.ajax({

    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: data,
    success: function(data, state){
      ajaxMovieSuccess(data);


    },
    error: function(request, state, error){
      console.log('error');
    }

  })
}

function updateMovieUI(title, original, flag, voto, locandina){

  var tempData = {
    locandina: locandina,
    title: title,
    original: original,
    flag: flag
  }

  var template = $('#box-template').html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);

  var movieBox = $('.movie-box');
  movieBox.append(finalHTML);
   // $('.info').hide();
   hoverImage();
  addStar(voto);
}


function ajaxSeriesCall(input){

    var data = {

      api_key: '11361ae336b51f58679851b46306e28c',
      language: 'it-IT',
      query: input
    };

    $.ajax({

      url: 'https://api.themoviedb.org/3/search/tv',
      method: 'GET',
      data: data,
      success: function(data, state){
        ajaxSuccessSeries(data);


      },
      error: function(request, state, error){
        console.log('error');
      }

    })
}

function updateSeriesUI(title, original, flag, voto, locandina){

  var tempData = {
    locandina: locandina,
    title: title,
    original: original,
    flag: flag

  }

  var template = $('#box-template').html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);

  var seriesBox = $('.series-box');
  seriesBox.append(finalHTML);
  hoverImage();
  addStar(voto);

}


function ajaxMovieSuccess(data){
  var res = data.results;

  for (var i = 0; i < res.length; i++) {
  var result = res[i];
  var title = result.title;
  var original = result.original_title;
  var flag = getFlag(result.original_language);
  var voto = Math.round(result.vote_average / 2);
  if (result.poster_path == null) {
    var locandina = "https://www.xmple.com/wallpaper/3d-cubes-yellow-white-black-1536x2048-c3-ffd700-f5fffa-000000-l-278-a-135-f-11.svg"
  }
  else {

    var locandina = 'https://image.tmdb.org/t/p/w185/' + result.poster_path;
  }


  updateMovieUI(title, original, flag, voto, locandina);
  }
}


function ajaxSuccessSeries(data){
  var res = data.results;

  for (var i = 0; i < res.length; i++) {
  var result = res[i];
  var title = result.name;
  var original = result.original_name;
  var flag = getFlag(result.original_language);
  var voto = Math.round(result.vote_average / 2);
  if (result.poster_path == null) {
    var locandina = "https://imgc.allpostersimages.com/img/print/u-g-F5M8DF0.jpg?w=550&h=550&p=0"
  }
  else {

    var locandina = 'https://image.tmdb.org/t/p/w185/' + result.poster_path;
  }


  updateSeriesUI(title, original, flag, voto, locandina);

  }
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


function hoverImage(){
 $('.box-movie').mouseenter(function(){

   var me = $(this);
   // me.css('background', 'black')
   me.children('div').show();
   console.log('ok');
 })

 $('.box-movie').mouseleave(function(){

   var me = $(this);
   // me.css('background', 'black')
   me.children('div').hide();
   console.log('ok');
 })
}

function init(){
 hoverImage();
$('#btn').click(function(){

 $('.box-movie').remove();
 var input = $('#query').val();

 ajaxMovieCall(input);
 ajaxSeriesCall(input);
   $('#query').val('');

})



}

$(document).ready(init);
