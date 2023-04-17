import express from 'express';
import $ from 'jquery';
import path from 'path';
const app = express();
import mainData from './data.json' assert { type: "json" };
import {customerRouter} from "./customers/customer.route.js";

app.use(express.json());
app.use(customerRouter)

import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
console.log(__dirname)

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))
//added to use the expose public folder 
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    const rndPosters = randomPosters();
    res.render('home',{...mainData.Posters,rndPosters} );
})

app.get('/product/:poster',(req,res) =>{
    const {poster} = req.params;
    const artist = mainData.Posters[poster]
    const rndPosters = randomPosters(artist);
    res.render('product', {...artist,...mainData,rndPosters})
})

app.get('/allPosters', (req,res) =>{
    res.render('allProducts',{...mainData});
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

function getDetail(Poster, info){
    const infoLower = info.toLowerCase();
    switch(infoLower){
        case 'price':
            return "Price of " + Poster +" is:"+ mainData.Posters[Poster].price +"kr";
        case 'artist':
            return JSON.stringify(mainData.Posters[Poster].artist);
        case 'description':
            return JSON.stringify(mainData.Posters[Poster].description);
        case 'img':
            return mainData.Posters[Poster].img;
        default:
            return "Fail";
    }
}

// Path that responds with all poster data
app.get('/Data',(req,res) => {
    res.send(mainData)
})

// Path to get a specific poster
app.get('/Data/:Poster',(req,res) =>{
    const poster = req.params.Poster;
    res.send(mainData.Posters[poster]);
})
//Path to get information about a specific poster
app.get('/Data/:Poster/:info',(req,res) =>{
    const poster = req.params.Poster;
    const info = req.params.info;
    const detail = getDetail(poster, info)
    res.send(detail);
})
