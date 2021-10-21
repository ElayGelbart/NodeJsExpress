const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

// start the server
app.listen(port, function () {
  console.log('app started');
});

// route our app
app.get(`/pokemon/get/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  res.send(pokeObj);
});

app.put(`/pokemon/catch/:id`, function (req, res) {
  res.send(req.params);
});

app.delete(`/pokemon/release/:id`, function (req, res) {
  res.send(req.params);
});

