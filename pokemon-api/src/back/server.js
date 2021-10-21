const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

// start the server
app.listen(port, function () {
  console.log('app started');
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// route our app
app.get(`/pokemon/get/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  res.send(pokeObj);
});

app.put(`/pokemon/catch/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  const newUserPokeDir = `${__dirname}/../../users/${req.body.username}/${pokeObj.id}.json`;
  try {
    fs.accessSync(newUserPokeDir);
    res.send('There is A pokemon To That User')
  } catch (error) {
    fs.writeFileSync(newUserPokeDir, JSON.stringify(pokeObj))
    res.send('Created New');
  }
});


app.delete(`/pokemon/release/:id`, function (req, res) {
  res.send(req.params);
});

