const greetMe =  require("./greetfactory");

module.exports = function greetFunction(pool) {

    const greetNow = greetMe(pool)

    async function greetHandles(req, res) {
        res.render('index', {
            names: await greetNow.output(),
            counter: await greetNow.setCounter(),
            messages: req.flash('error') 

        })
    }
    async function clearnames() {
        await greetNow.clearNamesStore();
        res.redirect('/')
    }

    async function dataTable(req, res){
    res.render('table', { name: await greetNow.loadingName() })
    }

    return {
        greetHandles,
        clearnames,
        dataTable
    
    }
} 