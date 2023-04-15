
const express = require('express');
const { data } = require('jquery');
const path = require('path');
const app = express();
const mainData = require('./data.json');
const sessions = require('express-session');


//const http = require('http');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const users = require('./data').userDB;

const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//Is used to make the welcome sign function (Dont touch)
let session = {userid: ""} 

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    const rndPosters = randomPosters();
    const message = addName();
    res.render('home',{...mainData.Posters,rndPosters, message} );
})

app.get('/product/:poster',(req,res) =>{
    const {poster} = req.params;
    const artist = mainData.Posters[poster]
    const rndPosters = randomPosters(artist);
    res.render('product', {...artist,...mainData,rndPosters, users, session})
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

app.get('/logindex',(req,res) => {
    res.sendFile(path.join(__dirname,'./views/index.html'));
});

app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'./views/login.html'));
});

app.get('/registration',(req,res) => {
    res.sendFile(path.join(__dirname,'./views/registration.html'));
});

app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                basket: [],
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login'>login</a></div><br><br><div align='center'><a href='./registration'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./'>homepage</a></div>`);
                session=req.session;
                session.userid=usrname;
                console.log(req.session);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

function addName() {
    const Navn = session.userid
    if (Navn !== "") {
        return "Welcome " + Navn + "!";
    }
    else {
       return "Welcome!"
    }
}

function deleteToCart(input) {
    let foundUser = users.find((data) => session.userid === data.Username);
    foundUser.basket.indexOf(input)
    array.splice(index, 1);
    console.log('User list', users);
}

