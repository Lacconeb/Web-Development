//This Jquery code was taken from a tutorial (https://snook.ca/archives/javascript/simplest-jquery-slideshow)

$(function(){
    $('.slideshowInnerContainer img:gt(0)').hide();
    setInterval(function(){
      $('.slideshowInnerContainer :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.slideshowInnerContainer');}, 
      3000);
});

