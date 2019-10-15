
const assert = require('assert');
const greetFactory = require('../greetfactory');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || "postgresql://codex:codex123@localhost/names_greeted";


const pool = new Pool({
    connectionString
});


describe("The greetFactory", function () {
    beforeEach(async () => {
        await pool.query('DELETE FROM names_greeted;');
    })
    describe("The setCounter function", async function () {
        it("should get the name entered and greet in english if the selected language is english ", async function () {


            let greeting = greetFactory(pool);

            await greeting.setGreeting("Jen", "English")
            assert.equal("Hello, Jen", await greeting.output())


        })

        it("should get the name entered and greet in isiXhosa if the selected language is isXhosa", async function () {
            let greeting = greetFactory(pool);

            await greeting.setGreeting("Axola", "isiXhosa")
            assert.equal("Molo, Axola", await greeting.output())


        })

        it("should get the name entered and greet in Afrikaans if the selected language is afrikaans", async function () {
            let greeting = greetFactory(pool);

            await greeting.setGreeting("Fred", "Afrikaans")
            assert.equal("Hallo, Fred", await greeting.output())


        })
    });
    describe("The setCounter function", async function () {
        it("only count a name once", async function () {
            let greeting = greetFactory(pool);

            await greeting.setGreeting("Mia")
            await greeting.setGreeting("Mia")
            await greeting.setGreeting("Mia")
            var test = await greeting.setCounter()
            assert.equal(1, test.length);
        })
        it("should count 3 if three different names are entered", async function () {
            let greeting = greetFactory(pool);
            // await greeting.clearNamesStore();

            await greeting.setGreeting("Mia")
            await greeting.setGreeting("Jack")
            await greeting.setGreeting("Kim")
            assert.equal(await greeting.setCounter(), 3);
        })
    });


});