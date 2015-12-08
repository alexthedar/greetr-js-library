(function(global, $){

  //'new' object
  var Greetr = function(firstName, lastName, language) {

    return new Greetr.init(firstName, lastName, language);

  };

  // hidden within scope of IIFE and never directly accessible
  var supportedLangs = ['es', 'en'];

  //informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  //formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  //logger messages
  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  // prototype holds methods to save memeory space
  Greetr.prototype = {

    //'this' refers to the calling object at execeution time
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {
      //check if it is a valid language
      //refernces the externally inaccesible 'supportedLangs' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Language";
      }
    },

    //retrieve messages from object by referring to properties using [] syntax
    greeting: function(){
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    //chainable methods return their own containing object
    greet: function(formal) {
      var msg;
      //if undefined or null it will be coerced to false
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      //this refers to the calling object at execetion time
      //makes method chainable
      return this;
    },

    log: function () {
      if(console) {
        console.log(
          logMessages[this.language] + ': ' + this.fullName());
      }
      //make chainable
      return this;
    },

    setLang: function(lang){
      //set the language
      this.language = lang;
      //validate
      this.validate();
      //make chainable
      return this;
    }

    HTMLGreeting: function(selector, formal) {
      if(!$) {
        throw: 'jQuery not loaded';
      }

      if(!selector){
        throw: 'MIssing jQuery selector';
      }

      //determine the message
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      //inject the message in the chosen place in the DOM
      $(selector).html(msg);
      //make chainable
      return this;

    }
  };

  //the actual object is created here, allowing us to new and object without calling new
  Greetr.init = function(firstName, lastName, language){

    var self = this;
    self.firstName = firstName || "";
    self.lastName = lastName  || "";
    self.language = language || "en";

  };
  //trick borrowed from jQuery so we dont have to use the new keyword
  Greetr.init.prototype = Greetr.prototype;
  //attach our greetr to the global object and provide a shorthand $G for ease 
  global.Greetr = global.G$ = Greetr;

  return Greetr;

}(window, jQuery))
