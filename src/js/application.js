
window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');  // required for bootstrap
require('bootstrap');

$(window).ready(function() {
  console.log('Test');
  $('form').on('submit', function(e) {
    return true;
    
    $form = $(this);
    $.ajax({
      url: $form.attr('action'),
      method: 'post',
      dataType: 'jsonp',
      data: $form.serialize()
    }).done(function(data) {
      console.log(data);
    });
    
  });
  
  $(window).on('CreatedLead', function(e) {
    console.log('It was successful!');
  });
});