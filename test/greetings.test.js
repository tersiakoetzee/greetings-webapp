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


    it("should return Please Enter Name and Select Language, if no name was entered and no language was selected", function () {
        let greeting = greetFactory();

        greeting.setGreeting("", "")
        assert.equal("Please Enter Name and Select Language", greeting.output())


    })
    it("should return No Name Entered, if no name was entered", function () {
        let greeting = greetFactory();

        greeting.setGreeting("")
        assert.equal("No Name Entered", greeting.output())


    })

    it("if a name was entered but no language selected return, No Language Selected", function () {
        let greeting = greetFactory();

        greeting.setGreeting("Gill", "")
        assert.equal("No language selected", greeting.output())


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

    it("only allow a name to be enterded once", function () {
        let greeting = greetFactory();

        greeting.storedNames("Mia")
        greeting.storedNames("lia")
        greeting.storedNames("tyla")
        assert.equal(greeting.loadingName(3))

    })
});