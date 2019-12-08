const normal = "#dde0ab";
const fire = "#ffa259";
const water = "#46b3e6";
const grass = "#42b883";
const electric = "#ffd369";
const ice = "#96d1c7";
const ground = "#e3c4a8";
const flying = "#baabda";
const poison = "#8d448b";
const fighting = "#b22222";
const psychic = "#fd7792";
const dark = "#5c4d4d";
const rock = "#cb9b42";
const bug = "#94aa2a";
const ghost = "#58508d";
const steel = "#c6cbef";
const dragon = "#421b9b";
const fairy = "#fff1e9";
const unknown = "#12e6c8";
const shadow = "#393e46";


const requestPokemon = (url) => {
  url = url || "https://pokeapi.co/api/v2/pokemon/";
  fetch(url).then(prep=>prep.json()).then(response=>{
    console.log(response);
  });
}
