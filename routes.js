module.exports = function greetFunction(GreetFactory) {

    function greetHandles(req , res) {
        
        res.render('index', {


            names: GreetFactory.output(),
            counter: GreetFactory.setCounter(),
            messages:req.flash('error')

        })
    }


    return {
        greetHandles
    }
}