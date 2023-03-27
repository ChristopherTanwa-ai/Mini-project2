const express = require('express');
const { data } = require('jquery');
const path = require('path');
const app = express();
const mainData = require('./data.json');

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))

app.get('/',(req,res) => {
    res.render('home',{...mainData.Posters} );
})

app.get('/product/:poster',(req,res) =>{
    const {poster} = req.params;
    const artist = mainData.Posters[poster]
    console.log(artist.artist);
    res.render('product', {...artist})
})



app.listen(3000, () => console.log('Example app listening on port 3000!'));