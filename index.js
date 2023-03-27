const express = require('express');
const { data } = require('jquery');
const path = require('path');
const app = express();
const adata = require('./data.json');

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))

app.get('/',(req,res) => {
   
    console.log(hmm);
    res.render('home',{...adata[Hilma]} );
})

app.get('/random', (req,res) =>{
    const num =  Math.floor(Math.random() *10) + 1;
    res.render('random', {rand: num})
})

// Path parameter


app.get('/dog', (req, res) => {
    console.log("we got a dog request")
    res.send("Doogo")
})



app.listen(8000, () => console.log('Example app listening on port 8000!'));