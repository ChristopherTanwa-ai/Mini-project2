const express = require('express');
const path = require('path');
const app = express();
const data = require('./data.json');


app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))

app.get('/', (req, res) => {
    console.log("we got a request")
    res.render('home')
})

app.get('/random', (req,res) =>{
    const num =  Math.floor(Math.random() *10) + 1;
    res.render('random', {rand: num})
})

// Path parameter
app.get('/:product',(req,res) => {
    console.log(req.params)
    const product = req.params;
    res.render('product',{name: product} )
})

app.get('/dog', (req, res) => {
    console.log("we got a dog request")
    res.send("Doogo")
})



app.listen(8000, () => console.log('Example app listening on port 8000!'));