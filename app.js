// set g with name using shorthand
var g = G$('John','Doe');

//call greet formal and informal and set languiage using chaining
g.greet().setLang('es').greet(true).log();


//using the jQuery built in for greeting
$('#login').click(function(){
  //gather names from html
  var firstName = $('#firstName').val();
  var lastName = $('#lastName').val();
  //set formal value
  var formal;

  if ($('#setFormal').val() === 'fo') {
    formal = true;
  } else {
    formal = false;
  }

 //hide button and entries
  $('#logindiv').hide();

//use $G function
  G$(firstName, lastName).setLang($('#lang').val()).HTMLGreeting('#greeting', formal).log();

});
