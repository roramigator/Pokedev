//  INTERACTION SYSTEM
const IS = require("./interactionSystem");

//  GLOBAL VARIABLES
let current = 1;

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
}; // - end setMenu

//  LINK MENU ITEMS
const loadMenu = (menu) => {
  menu = menu.childNodes;
  menu.forEach((li, id) => {
    li.addEventListener("click", e => {
      const url = `/${e.target.textContent}`;
      //  send request to REQUEST FILTER
      fetch(url, {mode: 'no-cors'}).then(prep=>prep.text()).then(response=>{


        IS.select('.screen').innerHTML = response;
        if(id === 0){   //  :)
          fetch(`https://pokeapi.co/api/v2/pokemon/${current}`).then(prep => prep.json()).then(res => {
            loadPokemon(res, IS.select(".pokedex"));
          });
          IS.select([".right",".left"]).forEach(btn => {
            console.log('here');
            console.log({btn })
            btn.addEventListener("click", e => {
              if(e.target.classList.value === 'right'){
                console.log('left');
                current++;
                fetch(`https://pokeapi.co/api/v2/pokemon/${current}`).then(prep => prep.json()).then(res => {
                  loadPokemon(res, IS.select(".pokedex"));
                  console.log(res.id);
                });
              }
              if(e.target.classList.value === 'left'){
                console.log('left');
                if(current > 1) current--;
                fetch(`https://pokeapi.co/api/v2/pokemon/${current}`).then(prep => prep.json()).then(res => {
                  loadPokemon(res, IS.select(".pokedex"));
                });
              }
            });
          });

        } // -  end if
      }); // -  end fetch
    }); // -  end eventListener
  }); // -  end forEach
};  // -  end loadMenu


//  this is request filter
const getImage = (number) => {
  if(number < 10) number = '00'+number;
  else if(number < 100) number = '0'+number;
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`
};
//  ---

const loadPokemon = (data, container) => {
  const img = getImage(data.id);
  console.log({container, img});
  container.innerHTML = `
  <div>
    <img src="${img}" width="90%">
    <span>${data.id}</span>
  </div>
  <p>${data.name}</p>
  `;
};  // - end loadPokemon


//  EXPORTS
module.exports = {
    setMenu
};
