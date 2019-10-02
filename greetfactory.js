module.exports = function greetFactory(listOfNames) {

  var namesGreeted = listOfNames || {};
  var theGreeting = "";

  function setGreeting(textVal, theLanguage) {
    
    console.log(textVal);
    
    var upperCaseName = textVal.charAt(0).toUpperCase() + textVal.slice(1);
    console.log(textVal);
    if (textVal) {
      if (namesGreeted[upperCaseName] === undefined) {
        namesGreeted[upperCaseName] = 0;
      }
    }
 
    if (theLanguage === undefined && upperCaseName === "") {
      theGreeting = "Please Enter Name and Select Language";
    } else if (upperCaseName === "") {
      theGreeting = "No Name Entered";
    } else if (theLanguage === undefined) {
    //  req.flash('info', 'Select a language!');
    }else if (theLanguage === "English") {
      theGreeting = "Hello, " + upperCaseName;
    } else if (theLanguage === "isiXhosa") {
      theGreeting = "Molo, " + upperCaseName;
    } else if (theLanguage === "Afrikaans") {
      theGreeting = "Hallo, " + upperCaseName;
    };
  }

  function output() {
    return theGreeting;
  }

  function setCounter() {
    var list = Object.keys(namesGreeted);
    return list.length;
  }

  function storedNames() {
    return namesGreeted;
  }
  function loadingName(){
   namesGreeted = {};
  }

  return {
    output,
    setGreeting,
    setCounter,
    // name,
    storedNames,
    loadingName
  }
}


