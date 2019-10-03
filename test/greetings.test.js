let assert = require("assert");
let greetFactory = require("../greetfactory");

describe("The greetFactory", function () {

    it("should get the name entered and greet in english ", function () {
        let greeting = greetFactory();

        greeting.setGreeting("Jen", "English")
        assert.equal("Hello, Jen", greeting.output())


    })

    it("should get the name entered and greet in isiXhosa ", function () {
        let greeting = greetFactory();

        greeting.setGreeting("Axola", "isiXhosa")
        assert.equal("Molo, Axola", greeting.output())


    })

    it("should get the name entered and greet in Afrikaans", function () {
        let greeting = greetFactory();

        greeting.setGreeting("Fred", "Afrikaans")
        assert.equal("Hallo, Fred", greeting.output())


    })

});

describe("The setCounter function", function () {

    it("only allow a name to be enterded once", function () {
        let greeting = greetFactory();

        greeting.storedNames("Mia")
        greeting.storedNames("Mia")
        greeting.storedNames("Mia")
        assert.equal(greeting.loadingName(1))

    })


});