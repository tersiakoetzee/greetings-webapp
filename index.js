const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const greetingFactory = require('./greetfactory')

const app = express();
const GreetFactory = greetingFactory()

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {
        names:GreetFactory.output(),
        counter:GreetFactory.setCounter()



    });
})

app.post('/greetings', function (req, res) {

    GreetFactory.getName(req.body.actionType)
    res.redirect('/');
});




const PORT = process.env.PORT || 8099;
app.listen(PORT, function () {
    console.log('start' + PORT);
});