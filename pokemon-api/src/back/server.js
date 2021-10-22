// libaries
const express = require('express');
const fs = require('fs');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
// my files
const helpFunc = require('./helpFunc');
const errorHandler = require('./middleware/errorHandler')
// others
const app = express();
const port = 8080;

// start the server
app.listen(port, function () {
  console.log(`listing to port ${port}`);
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use((req, res, next) => {
  if (req.headers.username) {
    req.headers.username = JSON.parse(req.headers.username);
  }
  next();
});


// route our app
app.get(`/pokemon/:username`, async function (req, res) {
  const newUserPokeDir = `${__dirname}/../../users/${req.params.username}/`;
  try {
    const fileArray = fs.readdirSync(newUserPokeDir);
    let multipokeObj = [];
    for (let value of fileArray) {
      value = Number(value.replace('.json', ''));
      multipokeObj.push(JSON.stringify(await P.getPokemonByName(value)))
    }
    res.send(multipokeObj); // return an array of stringify object of each pokemon 
  } catch (error) {
    res.send('isnt that user')
  }
});

app.put(`/pokemon/catch/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  const newUserPokeDir = `${__dirname}/../../users/${req.headers.username}/${pokeObj.id}.json`;
  console.log(req.headers.username);
  try {
    fs.accessSync(newUserPokeDir);
    errorHandler.cantRealeseOrCatch(res);
    res.send('You have this Pokemon')
  } catch (error) {
    if (!helpFunc.checkDir(`${__dirname}/../../users/${req.headers.username}`)) {
      fs.mkdirSync(`${__dirname}/../../users/${req.headers.username}`);
    }
    fs.writeFileSync(newUserPokeDir, JSON.stringify(pokeObj))
    res.send('Pokemon added to Pokedex');
  }
});


app.delete(`/pokemon/release/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  const newUserPokeDir = `${__dirname}/../../users/${req.headers.username}/${pokeObj.id}.json`;
  try {
    fs.accessSync(newUserPokeDir);
    fs.unlinkSync(newUserPokeDir);
    res.send('Pokemon Deleted')
  } catch (error) {
    errorHandler.cantRealeseOrCatch(res);
    res.send('You dont have this Pokemon');
  }
});
app.get(`/pokemon/get/:id`, async function (req, res, next) {
  try {
    const pokeObj = await P.getPokemonByName(req.params.id);
    res.send(pokeObj);
  } catch (err) {
    errorHandler.isntPokemon(res);
    next(err);
  }
});

// app.use(function errorHandler(err, req, res, next) {
//   res.status(err.response.status,);
//   res.send();
// });