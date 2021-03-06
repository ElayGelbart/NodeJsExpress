import html from "./index.html";
const getPokemonFromName = async (pokemonName) => {
  const UserNameValue = document.getElementById("floatingInputUserName").value;
  try {
    const response = await axios.get(`https://immense-coast-57523.herokuapp.com/pokemon/get/${pokemonName}`, {
      headers: {
        username: UserNameValue,
      }
    });;
    postPokemonInfo(response.data);
    document.getElementsByClassName("invalid-feedback")[0].style.display = "none";
  }
  catch (error) {
    document.getElementsByClassName("invalid-feedback")[0].style.display = "block";
  }
}
window.getPokemonFromName = getPokemonFromName;

const catchPokemonToUsername = async () => {
  const UserNameValue = document.getElementById("floatingInputUserName").value;
  const pokemonName = document.getElementById("selectedPokemonName").innerText.toLowerCase();
  try {
    const response = await axios.put(`https://immense-coast-57523.herokuapp.com/pokemon/catch/${pokemonName}`, JSON.stringify({}), {
      headers: {
        username: UserNameValue
      },
    });
    addAlert(response.data);
  } catch (err) {
    addAlert("already Had This Pokemon");
  }
}

const realesePokemonFromUsername = async () => {
  const UserNameValue = document.getElementById("floatingInputUserName").value;
  const pokemonName = document.getElementById("selectedPokemonName").innerText.toLowerCase();
  try {
    const response = await axios.delete(`https://immense-coast-57523.herokuapp.com/pokemon/release/${pokemonName}`, {
      headers: {
        username: UserNameValue
      },
    });
    addAlert(response.data);
  }
  catch (err) {
    addAlert("Pokemon Not Found");
  }
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
    stringToTypeTable += ` <tr><th scope="row">${i + 1}</th><td class="link-danger" onclick="getPokemonFromName('${responseobj.pokemon[i].pokemon.name}')">${responseobj.pokemon[i].pokemon.name}</td></tr>`
  }
  document.getElementById("typebodyTable").innerHTML = stringToTypeTable;
}
window.postTypeInfoByClick = postTypeInfoByClick;

const addAlert = (msg) => {
  document.getElementsByClassName("alert")[0].style.display = 'block';
  document.getElementsByClassName("alert")[0].innerText = msg;
}

document.getElementById("searchPokeBtn").addEventListener("click", function () {
  const pokemonNameValue = document.getElementById("floatingInputPokeName").value;
  getPokemonFromName(pokemonNameValue);
});

document.getElementById("showPokadexBtn").addEventListener("click", async () => {
  const UserNameValue = document.getElementById("floatingInputUserName").value;
  const response = await axios.get(`https://immense-coast-57523.herokuapp.com/pokemon/${UserNameValue}`, {
    headers: {
      username: UserNameValue
    }
  });
  let stringToPokadexTable = ``;
  for (let i = 0; i < response.data.length; i++) {
    const currentPokemon = JSON.parse(response.data[i]);
    stringToPokadexTable += ` <tr><th scope="row">${i + 1}</th><td class="link-danger" onclick="getPokemonFromName('${currentPokemon.name}')">${currentPokemon.name}</td></tr>`
  }
  document.getElementById("typebodyTable").innerHTML = stringToPokadexTable;
})

document.getElementById("_pokeIMG").addEventListener("mouseover", () => {
  const imgsrc = document.getElementById("pokeIMG").getAttribute("src");
  const newimgsrc = imgsrc.replace('pokemon/', 'pokemon/back/');
  document.getElementById("pokeIMG").setAttribute("src", `${newimgsrc}`);
});

document.getElementById("_pokeIMG").addEventListener("mouseout", () => {
  const imgsrc = document.getElementById("pokeIMG").getAttribute("src");
  const newimgsrc = imgsrc.replace('pokemon/back/', 'pokemon/');
  document.getElementById("pokeIMG").setAttribute("src", `${newimgsrc}`);
});