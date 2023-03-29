
const express = require('express');
const { data } = require('jquery');
const path = require('path');
const app = express();
const mainData = require('./data.json');

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))
//added to use the expose public folder 
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.render('home',{...mainData.Posters,...mainData.HomePictures} );
})

app.get('/product/:poster',(req,res) =>{
    const {poster} = req.params;
    const artist = mainData.Posters[poster]
    const rndPosters = randomPosters(artist);
    res.render('product', {...artist,...mainData,...rndPosters})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));


function randomPosters(artist){
    const posters = mainData.Posters;
    const posterKeys = Object.keys(posters);
    const selectedPosters = [];
    let i = 0;
  
    while(i < 4) {
      const randomIndex = Math.floor(Math.random() * posterKeys.length);
      const posterKey = posterKeys[randomIndex];
      const poster = posters[posterKey];
      if(poster != artist && !selectedPosters.some(p => p.id === posterKey)){
        selectedPosters.push({...poster, id: posterKey});
        i++;
    }
    }
    return selectedPosters;
}