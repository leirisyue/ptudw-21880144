'use strick';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));
// app.get('/',(req,res)=>{
//    res.send('Hello to EShop')
// })
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`)
})