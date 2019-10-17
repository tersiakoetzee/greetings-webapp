module.exports = function greetFactory(pool) {
  // console.log(pool.query());
  var namesGreeted = {};
  var theGreeting = "";

  async function setGreeting(textVal, theLanguage) {
    var upperCaseName = textVal.toLowerCase();

    if (textVal) {
      if (namesGreeted[upperCaseName] === undefined) {
        namesGreeted[upperCaseName] = 0;
      }
      upperCaseName = upperCaseName.charAt(0).toUpperCase() + upperCaseName.slice(1);

      if (upperCaseName === "") {
        return 'test'
      } else {

        var listname = await pool.query('SELECT * FROM names_greeted WHERE name = $1', [upperCaseName]);
        // console.log({listname});
        if (listname.rows.length === 1) {
          await pool.query('UPDATE names_greeted SET times_greeted = times_greeted +1 WHERE name = $1', [upperCaseName]);

        } else {
          await pool.query('insert into names_greeted (name, times_greeted) values ($1, $2) returning name, times_greeted', [upperCaseName, 1]);
        }
      }
    }
    if (theLanguage === "English") {
      theGreeting = "Hello, " + upperCaseName;
    } if (theLanguage === "isiXhosa") {
      theGreeting = "Molo, " + upperCaseName;
    } if (theLanguage === "Afrikaans") {
      theGreeting = "Hallo, " + upperCaseName;
    }
  }

  async function output() {
    return theGreeting
  }


  async function setCounter() {
    let results = await pool.query('SELECT COUNT(*) from names_greeted');
    return results.rows[0].count;
  }

  async function loadingName() {
    let personGreeted = await pool.query('SELECT * FROM names_greeted');
    let howmanyGreetings = personGreeted.rows;
    return howmanyGreetings
  }

  async function clearNamesStore() {
    await pool.query('DELETE FROM names_greeted');
  }

  return {
    output,
    setGreeting,
    setCounter,
    loadingName,
    clearNamesStore,

  }
}