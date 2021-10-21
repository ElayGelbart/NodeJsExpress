const getPokemonFromName = async (pokemonName) => {
  try {
    const response = await fetch(`http://localhost:8080/pokemon/get/${pokemonName}`);
    const responseobj = await response.json()
    postPokemonInfo(responseobj);
    document.getElementsByClassName("invalid-feedback")[0].style.display = "none";
  }
  catch (error) {
    document.getElementsByClassName("invalid-feedback")[0].style.display = "block";
  }
}

const catchPokemonToUsername = async () => {
  const UserNameValueOBJSON = { username: `${document.getElementById("floatingInputUserName").value}` };
  const pokemonName = document.getElementById("selectedPokemonName").innerText.toLowerCase();
  const response = await axios.put(`http://localhost:8080/pokemon/catch/${pokemonName}`, UserNameValueOBJSON);
  addAlert(response.data)
}

const realesePokemonFromUsername = async () => {
  const UserNameValueOBJSON = { username: document.getElementById("floatingInputUserName").value };
  const pokemonName = document.getElementById("selectedPokemonName").innerText.toLowerCase();
  console.log(pokemonName);
  const response = await axios.delete(`http://localhost:8080/pokemon/release/${pokemonName}`, { data: UserNameValueOBJSON });
  addAlert(response.data)
}

const postPokemonInfo = (pokeInfoFromAPI) => {
  let stringofTypes = ``;
  for (let i = 0; i < pokeInfoFromAPI.types.length; i++) {
    stringofTypes += `<a class="link-success" onclick="postTypeInfoByClick('${pokeInfoFromAPI.types[i].type.name}')"><u>${pokeInfoFromAPI.types[i].type.name}</u><a> `
  }
  document.getElementById("_pokeName").innerHTML = `<p id="selectedPokemonName">${pokeInfoFromAPI.name}</p>`
  document.getElementById("_pokeType").innerHTML = `<p class="lead"><strong>${stringofTypes}</strong></p>`
  document.getElementById("_pokeWeightNHeight").innerHTML = `<p>${pokeInfoFromAPI.height}M/${pokeInfoFromAPI.weight}KG</p>`
  document.getElementById("_pokeIMG").innerHTML = `<p><img class="block" id="pokeIMG" src=${pokeInfoFromAPI.sprites.front_default}></p>`
  document.getElementById("_pokeCOR").innerHTML = `<p><button id="catchBtn" class="btn btn-outline-warning">Catch</button><button id="realeseBtn" class="btn btn-outline-info">Realese</button></p>`
  document.getElementById("catchBtn").addEventListener("click", catchPokemonToUsername);
  document.getElementById("realeseBtn").addEventListener("click", realesePokemonFromUsername);
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

const addAlert = (msg) => {
  document.getElementsByClassName("alert")[0].style.display = 'block';
  document.getElementsByClassName("alert")[0].innerText = msg;
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