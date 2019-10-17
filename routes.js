module.exports = function greetFunction(GreetFactory) {

    async function greetHandles(req, res) {
        res.render('index', {
            names: await GreetFactory.output(),
            counter: await GreetFactory.setCounter(),
            messages: req.flash('error') 

        })
    }
    async function clearnames() {
        await GreetFactory.clearNamesStore();
        res.redirect('/')
    }

    async function dataTable(req, res){
    res.render('table', {name:await GreetFactory.loadingName() })
    }

    return {
        greetHandles,
        clearnames,
        dataTable
    
    }
} 