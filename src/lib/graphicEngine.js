let pokeDB = '';
let current = 0;

//  CREATE MENU ELEMENTS
const setMenu = (container) => {
  const menu = [ "pokedex", "trainer", "credits" ];
  const ul = document.createElement('ul');
  menu.forEach((item, id) => {
    const li = document.createElement('li');
    const txt = document.createTextNode(item);
    li.appendChild(txt);
    li.setAttribute("id", id);
    ul.appendChild(li);
  });
  container.appendChild(ul);
  loadMenu(ul);
};

//  LINK MENU ITEMS
const loadMenu = (menu) => {
  menu = menu.childNodes;
  menu.forEach((li, id) => {
    li.addEventListener("click", e => {
      const url = `/${e.target.textContent}`;
      //  send request to REQUEST FILTER
      fetch(url, {mode: 'no-cors'}).then(prep=>prep.text()).then(response=>{
        document.querySelector('.screen').innerHTML = response;
        if(id === 0){   //  :)
          //  send request to REQUEST FILTER
          fetch("https://pokeapi.co/api/v2/pokemon/").then(prep=>prep.json()).then(response=>{
            //  DATA REFACTORING
            let dataPokemon = [];
            response.results.forEach(pokeData=>{
              const name = pokeData.name;
              const url = pokeData.url;
              fetch(url).then(prep=>prep.json()).then(response=>{
                const number = response.id;
                const data = {
                  name,
                  url,
                  number
                };
                dataPokemon.push(data)
              });
            });
            const data = {
              previous: response.previous,
              next: response.next,
              dataPokemon
            };
            pokeDB = data;
            const container = document.querySelector('.pokedex');
            loadPokemon(pokeDB, container);
          });
        } // - end if
      });
    }); // - end eventListener
  }); // - end forEach
};  // - end loadMenu

const getImage = (number) => {
  if(number < 10){
    number = '00'+number;
  }
  else if(number < 100){
    number = '0'+number;
  }
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`
};

const savePokeData = (data) => {
  setTimeout(()=>{
    loadPokemon(pokeDB[current], document.querySelector(".pokedex"));
    document.querySelectorAll(".right, .left").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const dir = e.target.classList.value;
        if(dir === 'right'){
          console.log(dir);
          current++;
          loadPokemon(pokeDB[current], document.querySelector(".pokedex"))
        }else if(dir === 'left'){
          console.log(dir);
          current--;
          loadPokemon(pokeDB[current], document.querySelector(".pokedex"))
        }
      });
    });

  },50);
};

const loadPokemon = (data, container) => {
  setTimeout(()=>{
    data.dataPokemon.forEach(item => {
      const img = getImage(item.number);
      container.innerHTML = `
      <div>
        <img src="${img}" width="90%">
        <span>${item.number}</span>
      </div>
      <p>${item.name}</p>
      <span>
        <span class="button">view</span>
        <span class="left"><</span>
        <span class="right">></span>
      </span>
      `;
    }); // - end forEach
  },50);
  //  ---
  // <div class="pokedex">
  //   <div>
  //     <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" width="90%">
  //     <span>025</span>
  //   </div>
  //   <p>pikachu</p>
  //   <span class="button">explore</span>
  // </div>
  //  ---
  //  SLIDER TEST
  // document.querySelector(".button").addEventListener("click", ()=>{
  //   document.querySelector(".pokedex").classList.add('animated','slideOutLeft');
  //   setTimeout(()=>{document.querySelector(".pokedex").classList.remove('animated','slideOutLeft');},500);
  // });
};  // - end loadPokemon


//  EXPORTS FUNCTIONS
module.exports = {
    setMenu
};
