const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const greetingFactory = require('./greetfactory')

const app = express();
const GreetFactory = greetingFactory()

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())


const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.use(flash());

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(session({
    secret : "<Please Enter Name and Select Language>",
    resave: false,
    saveUninitialized: true
  }));


app.get('/', function (req, res) {
    
    
    res.render('index', {
        

        names: GreetFactory.output(),
        counter: GreetFactory.setCounter()

    });
})



app.post('/greetings', function (req, res) {
    // let greetmessage = GreetFactory.output();
   
    // if (greetmessage === "") {
    //     req.flash("Please Enter Name and Select Languag")
    // }else{

   GreetFactory.setGreeting(req.body.name, req.body.language) 

    res.redirect('/')
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('start' + PORT);
});
// https://shielded-meadow-30509.herokuapp.com/