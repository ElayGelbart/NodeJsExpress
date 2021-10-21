'use strict'

const getPokemonFromName = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const responseobj = await response.json()
    postPokemonInfo(responseobj);
    document.getElementsByClassName("invalid-feedback")[0].style.display = "none";
  }
  catch (error) {
    document.getElementsByClassName("invalid-feedback")[0].style.display = "block";
  }
}

const postPokemonInfo = (pokeInfoFromAPI) => {
  let stringofTypes = ``;
  for (let i = 0; i < pokeInfoFromAPI.types.length; i++) {
    stringofTypes += `<a class="link-success" onclick="postTypeInfoByClick('${pokeInfoFromAPI.types[i].type.name}')"><u>${pokeInfoFromAPI.types[i].type.name}</u><a> `
  }
  document.getElementById("_pokeName").innerHTML = `<p>${pokeInfoFromAPI.name}</p>`
  document.getElementById("_pokeType").innerHTML = `<p class="lead"><strong>${stringofTypes}</strong></p>`
  document.getElementById("_pokeWeightNHeight").innerHTML = `<p>${pokeInfoFromAPI.height}M/${pokeInfoFromAPI.weight}KG</p>`
  document.getElementById("_pokeIMG").innerHTML = `<p><img id="pokeIMG" src=${pokeInfoFromAPI.sprites.front_default}></p>`
}

const postTypeInfoByClick = async (typeName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  const responseobj = await response.json()
  let stringToTypeTable = ``;
  for (let i = 0; i < responseobj.pokemon.length; i++) {
    stringToTypeTable += ` <tr><th scope="row">${i}</th><td class="link-danger" onclick="getPokemonFromName('${responseobj.pokemon[i].pokemon.name}')">${responseobj.pokemon[i].pokemon.name}</td></tr>`
  }
  document.getElementById("typebodyTable").innerHTML = stringToTypeTable;
}

document.getElementById("searchPokeBtn").addEventListener("click", function () {
  const pokemonNameValue = document.getElementById("floatingInputPokeName").value;
  getPokemonFromName(pokemonNameValue);
});

document.getElementById("_pokeIMG").addEventListener("mouseover", () => {
  const imgsrc = document.getElementById("pokeIMG").getAttribute("src");
  const newimgsrc = imgsrc.replace('pokemon/', 'pokemon/back/');
  document.getElementById("pokeIMG").setAttribute("src", `${newimgsrc}`);
});

document.getElementById("_pokeIMG").addEventListener("mouseout", () => {
  const imgsrc = document.getElementById("pokeIMG").getAttribute("src");
  const newimgsrc = imgsrc.replace('pokemon/back/', 'pokemon/');
  document.getElementById("pokeIMG").setAttribute("src", `${newimgsrc}`);
})