const requestPokemon = data => {
  return new Promise((resolve, reject) => {
    if(typeof(data) === "object")
      data = data.id;
    const url = `https://pokeapi.co/api/v2/pokemon/${data}`;
    fetch(url).then(prep => prep.json()).then(res => {
        res
          ? resolve(res)
          : reject();
    }); // - end fetch
  }); // - end Promise
}; // - end requestPokemon

const requestState = state => {
  return new Promise((resolve, reject) => {
    fetch(state, {mode: 'no-cors'}).then(prep => prep.text()).then(res => {
      try{
        resolve(res);
      }catch(error){
        reject(error);
      }

    });
  });
};

const requestImage = number => {
  if(number < 10) number = '00'+number;
  else if(number < 100) number = '0'+number;
  return { img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`, number }
};


module.exports = {
  requestPokemon,
  requestImage,
  requestState
};
