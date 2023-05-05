'use strick';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const expressHandlebars = require('express-handlebars')
const {createStarList} = require('./controllers/handlebarsHelper')
const {createPagination} = require('express-handlebars-paginate')
const session = require('express-session')

// set up public static folder
app.use(express.static(__dirname + '/public'));

// set up express-handlebars
app.engine('hbs', expressHandlebars.engine({
   layoutsDir: __dirname + '/views/layouts',
   partialsDir: __dirname + '/views/partials',
   extname: 'hbs',
   defaultLayout: 'layout',
   runtimeOptions:{
      allowProtoPropertiesByDefault: true
   },
   helpers:{
      createStarList,createPagination
   }
}))

app.set('view engine', 'hbs');


// session
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session({
   secret: 'S3crect',
   resave: false,
   saveUninitialized: false,
   cookie:{
      httpOnly: true,
      maxAge: 20*60*1000 //20ph
   }
}))

// middleware cart
app.use((req,res,next)=>{
   let Cart = require('./controllers/cart')
   req.session.cart = new Cart(req.session.cart ? req.session.cart : {})
   res.locals.quantity = req.session.cart.quantity

   next()
})

// routes
app.use('/', require('./routes/indexRouter'));
app.use('/products',require('./routes/productsRouter'))
app.use('/users',require('./routes/usersRouter'))
app.use((req, res, next) => {
   res.status(404).render('error', { Message: 'File not found' })
})

app.use((error, req, res, next) => {
   console.error('error '+ error);
   res.status(500).render('error', { Message: 'Internal Server Error' })
})


// start server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
})