const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');
const ejsLint = require('ejs-lint');
const nodemailer = require('nodemailer');

//connect to database
mongoose.connect(config.database);
let db = mongoose.connection;


//check connection
db.once('open',function(){
    console.log('Connected to MongoDB');
})

//check for db errors
db.on('error',function(){
    console.log(err);
});

//init app
const app = express();
//DECOMENTEAZA PT EJS
app.use(expressLayouts);
app.set('view engine','ejs');
//bring in models
let Article = require('./models/article');

//load view engine
app.set('views',path.join(__dirname, 'views'));

//COMENTEAZA
//app.set('view engine', 'pug');



//set public folder
app.use(express.static(path.join(__dirname,'public')));
//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//express session middleware
//tre sa fie aici nu stiu ce face

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  
}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();

});

// express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//passport config
require('./config/passport')(passport);

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});


//trb sa mai bag aici ceva ca sa pornesc pagina principala

//home route//blog route
app.get('/', function(req,res){
        res.render('index',{
        title:'Index',
    });
});

app.get('/parcurs', function(req,res){
        res.render('parcurs',{
        title:'Parcurs',
    });
});

app.get('/despremine', function(req,res){
        res.render('despremine',{
        title:'Despre mine',
    });
});

app.get('/consultanta', function(req,res){
        res.render('consultanta',{
        title:'Consultanta',
    });
});


app.get('/blog', function(req,res){
   let articles = Article.find({},function(err, articles){
        if(err){
            console.log(err)
        }
        else{
        res.render('blog',{
        title:'Add articles',
        articles: articles
    });
    }
    });
});

//aici incarc modelele pt articol si useri
//route files
let articles = require('./routes/articles');
let users = require('./routes/users');
let plans = require('./routes/plans');
app.use('/articles', articles);
app.use('/users', users);
app.use('/plans', plans)

//start server
app.listen(3000,function(){
    console.log('Server started on port 3000');
});

