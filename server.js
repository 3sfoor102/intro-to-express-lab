const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

    const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];


app.get('/test/', function(req, res){
    res.send(`<h1 align="center">This is a test</h1>`)
})

app.get('/greetings/:name', function(req, res){
    const name = req.params.name
    res.send(`<h1 align="center">Hello there, ${name}! </h1>`)
})

app.get('/roll/:number', function(req, res){
    const number = req.params.number
    if (number >= 0 || number <= 0 ){
         res.send(`You rolled a ${Math.floor(Math.random() * number)}`)

    } else {
        res.send(`You must specify a number`)
    }
    
})

app.get('/collectibles/:num', function(req,res){
    if (parseInt(req.params.num) < 3) {
        res.send(`Product name is ${collectibles[req.params.num].name} and pice is ${collectibles[req.params.num].price}`)           
    } else {
        res.send('This item is not yet in stock. Check back soon!')
    }
})



app.get('/shoes', function(req, res) {
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    const type = req.query.type

    let ModifiedShoes = shoes;
    if (minPrice) { 
        ModifiedShoes = ModifiedShoes.filter(function(item) {
            return item.price >= minPrice;
        });
    }

    if (maxPrice) {
        ModifiedShoes = ModifiedShoes.filter(function(item) {
            return item.price <= maxPrice;
        });
    }

    if (type) {
        ModifiedShoes = ModifiedShoes.filter(function(item){
            return item.type === type

        })
    }

    res.send(ModifiedShoes);
});
























app.listen(3000, function(){
    console.log('Listening on port 3000')
})