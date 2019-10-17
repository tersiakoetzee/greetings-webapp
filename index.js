const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const greetingFactory = require('./greetfactory')

const app = express();
const handle = require("./routes")
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://codex:codex123@localhost/names_greeted"
});
const GreetFactory = greetingFactory(pool)
const greetName = handle(pool)

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())


const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});


app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(session({
    secret: "error",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


app.get('/', greetName.greetHandles);



app.post('/greetings', async function (req, res) {

    if (req.body.name === "" || req.body.language === undefined) {
        req.flash('error', 'Please enter your name and select a language');
    } ;
    
    await GreetFactory.setGreeting(req.body.name, req.body.language)

    res.redirect('/')

});

app.get('/greeted', greetName.dataTable); 

app.get('/count', async function (req, res) {

    res.render("count", { counter: await GreetFactory.setCounter() })
})

app.post('/nameCleared', async function (req, res){
    
    await GreetFactory.clearNamesStore()
    res.redirect('/')
    

});

const PORT = process.env.PORT || 3004;
app.listen(PORT, function () {
    console.log('start' + PORT);
});
// https://shielded-meadow-30509.herokuapp.com/