function isntPokemon(res) {
  res.status(404);
  res.send();
}

function cantRealeseOrCatch(res) {
  res.status(403);
}

module.exports.isntPokemon = isntPokemon;
module.exports.cantRealeseOrCatch = cantRealeseOrCatch;