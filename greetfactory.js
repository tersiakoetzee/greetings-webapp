module.exports = function greetFactory(listOfNames) {

  var namesGreeted = listOfNames || {};
  var theGreeting = "";

  function getName(textVal, theLanguage) {
    var upperCaseName = textVal.toUpperCase();

    if (textVal) {
      if (namesGreeted[upperCaseName] === undefined) {
        namesGreeted[upperCaseName] = 0;
      }
    }
    var upperCaseName = textVal.charAt(0).toUpperCase() + textVal.slice(1);
    if (upperCaseName === "" && theLanguage === "") {
      theGreeting = "Please Enter Name and Select Language";
    } else if (upperCaseName === "") {
      theGreeting = "No Name Entered";
    } else if (theLanguage === "") {
      theGreeting = "No Language Selected";
    } else if (theLanguage === "English") {
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
    getName,
    setCounter,
    // name,
    storedNames,
    loadingName
  }
}


