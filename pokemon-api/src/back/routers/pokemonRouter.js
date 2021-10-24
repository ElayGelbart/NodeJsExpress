const express = require('express');
const fs = require('fs');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
// my files
const userHandler = require('../middleware/userHandler')
const helpFunc = require('../helpFunc');
// others
const router = express.Router()
router.use(express.json()) // for parsing routerlication/json
router.use(express.urlencoded({ extended: true })) // for parsing routerlication/x-www-form-urlencoded
router.use(userHandler)
router.get(`/pokemon/get/:id`, async function (req, res, next) {
  try {
    const pokeObj = await P.getPokemonByName(req.params.id);
    res.send(pokeObj);
  } catch (err) {
    next({ status: 404 });
  }
});

// route our router
router.get(`/pokemon/:username`, async function (req, res) {
  const newUserPokeDir = `${__dirname}/../../../users/${req.headers.username}/`;
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

router.put(`/pokemon/catch/:id`, async function (req, res, next) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  const newUserPokeDir = `${__dirname}/../../../users/${req.headers.username}/${pokeObj.id}.json`;
  try {

    next({ status: 403 });
    return;
  } catch (error) {
    if (!helpFunc.checkDir(`${__dirname}/../../../users/${req.headers.username}`)) {
      fs.mkdirSync(`${__dirname}/../../../users/${req.headers.username}`);
    }
    fs.writeFileSync(newUserPokeDir, JSON.stringify(pokeObj))
    res.send('Pokemon added to Pokedex');
  }
});


router.delete(`/pokemon/release/:id`, async function (req, res, next) {
  const pokeObj = await P.getPokemonByName(req.params.id);
  const newUserPokeDir = `${__dirname}/../../../users/${req.headers.username}/${pokeObj.id}.json`;
  try {
    fs.accessSync(newUserPokeDir);
    fs.unlinkSync(newUserPokeDir);
    res.send('Pokemon Deleted')
  } catch (err) {
    next({ status: 403 })
  }
});

module.exports = router;