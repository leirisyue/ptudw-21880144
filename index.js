'use strick';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const expressHandlebars = require('express-handlebars')

// set up public static folder
app.use(express.static(__dirname + '/public'));

// set up express-handlebars
app.engine('hbs', expressHandlebars.engine({
   layoutsDir: __dirname + '/views/layouts',
   partialsDir: __dirname + '/views/partials',
   extname:'hbs',
   defaultLayout:'layout'
}))
app.set('view engine','hbs');

// create database
app.get('/createTables',(req,res)=>{
   let models = require('./models');
   models.sequelize.sync().then(()=>{
      res.send('Tables created')
   })
})

// routes
app.get('/',(req,res)=>{
   res.render('index')
})

app.get('/:page',(req,res)=>{
   res.render(req.params.page)
})

// start server
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`)
})