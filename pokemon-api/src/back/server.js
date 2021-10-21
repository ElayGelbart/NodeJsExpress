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

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
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

app.get(`/pokemon/get/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  res.send(pokeObj);
});

app.put(`/pokemon/catch/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  const newUserPokeDir = `${__dirname}/../../users/${req.body.username}/${pokeObj.id}.json`;
  try {
    fs.accessSync(newUserPokeDir);
    res.send('You have this Pokemon')
  } catch (error) {
    if (!checkDir(`${__dirname}/../../users/${req.body.username}`)) {
      fs.mkdirSync(`${__dirname}/../../users/${req.body.username}`);
    }
    fs.writeFileSync(newUserPokeDir, JSON.stringify(pokeObj))
    res.send('Pokemon added to Pokedex');
  }
});


app.delete(`/pokemon/release/:id`, async function (req, res) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  console.log(req.body);
  const newUserPokeDir = `${__dirname}/../../users/${req.body.username}/${pokeObj.id}.json`;
  try {
    fs.accessSync(newUserPokeDir);
    fs.unlinkSync(newUserPokeDir);
    res.send('Pokemon Deleted')
  } catch (error) {
    res.send('You dont have this Pokemon');
  }
});

const checkDir = (dir) => {
  try {
    fs.accessSync(dir);
    return true;
  }
  catch (error) {
    return false;
  }
}