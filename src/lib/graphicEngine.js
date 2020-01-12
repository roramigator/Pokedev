//  IMPORTS
const IS = require("./interactionSystem");
const RF = require("./requestFilter");
const DR = require("./dataRefactoring");

//  GLOBAL VARIABLES
let current = 1;

const checkFav = () => {
  const favoritePokemon = localStorage.getItem('FAV');
  if(favoritePokemon == current){
    IS.select(".star").classList.add("starActive");
  }else {
    IS.select(".star").classList.remove("starActive");
  }
};

//  CREATE MENU ELEMENTS
const setMenu = (container) => {
  container = IS.select(container);
  const menu = [ "pokedex", "favorites", "credits" ];
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
      RF.requestState(`/${e.target.textContent}`).then(content => {
        IS.select('.screen').innerHTML = content;
        if(id === 1){ //  Favorites
          RF.requestPokemon(localStorage.getItem('FAV')).then(res => {
            loadPokemon(res, IS.select(".favorites"));
          });
        }
        if(id === 0){ //  Pokedex
          RF.requestPokemon(current).then(res => {
            loadPokemon(res, IS.select(".pokedex"));
          });
          const uiButtons = [".right",".left",".center",".more",".star",".fav"];
          IS.select(uiButtons).forEach(btn => {
            btn.addEventListener("click", e => {
              if(e.target.classList.value === 'star'){
                localStorage.setItem('FAV', current);
                //e.target.classList.value = 'starActive'; // -------------------
              }
              if(e.target.classList.value === 'fav'){
                document.location.href="/";
              }
              if(e.target.classList.value === 'right'){
                IS.info(false);
                IS.data();
                if(current < 809 ) current++;
              }
              if(e.target.classList.value === 'left'){
                IS.info(false);
                IS.data();
                if(current > 1) current--;
              }
              RF.requestPokemon(current).then(res => {
                loadPokemon(res, IS.select(".pokedex"));
              });
              if(e.target.classList.value === 'center'){
                RF.requestPokemon(current).then(res => {
                  loadInfo(res, IS.select(".info"));
                });
                IS.info(true);
              }
              if(e.target.classList.value === 'more'){
                IS.select(".data").classList.toggle('open');
                RF.requestPokemon(current).then(res => {
                  const data = DR.minifyJSON(res);
                  const abilities = data.abilities.reduce((html, ability) => {
                    html += `<span>${ability}</span>`;
                    return html;
                  }, "");
                  const moves = data.moves.reduce((html, move) => {
                    html += `<span>${move.name}</span>`;
                    return html;
                  }, "");

                  const species = {
                    url: data.specie
                  };

                  RF.requestPokemon(species).then(res => {
                    const happiness = res.base_happiness;
                    const capture = res.capture_rate;
                    const genera = res.genera.reduce((html, val)=>{
                      if(val.language.name === 'en')
                        html = (val.genus);
                      return html;
                    },"");
                    const evo = { url: res.evolution_chain.url };
                    RF.requestPokemon(evo).then(res => {

                      IS.select(".data").innerHTML = `
                        <div>
                          <p>${genera}</p>
                          <p><span>weight: ${data.weight}g</span><span>height: ${data.height}cm</span></p>
                          <p><span>happiness: ${happiness}%</span><span>capture rate: ${capture}%</span></p>
                          <p>${abilities}</p>
                          <p class="moves">${moves}</p>
                        </div>
                      `;
                    });
                  });
                });
              }

            }); // - end eventListener
          }); // - end forEach
        } // -  end if
      }); // -  end fetch
    }); // -  end eventListener
  }); // -  end forEach
};  // -  end loadMenu

//  LOAD POKEMONS ON CONTAINER
const loadPokemon = (data, container) => {
  if(container.classList.value === "pokedex"){
    checkFav();
  }
  const pokemon = RF.requestImage(data.id);
  container.innerHTML = `
  <div>
    <img src="${pokemon.img}" width="90%">
    <span>${pokemon.number}</span>
  </div>
  <p>${data.name}</p>
  `;
};  // - end loadPokemon

//  LOAD POKEMON INFO
const loadInfo = (data, container) => {
  const stats = data.stats.reverse().reduce((html, val) => {
    html += `<p>${val.stat.name}<progress value="${val.base_stat}" max="140"></progress></p>`;
    return html;
  },"");
  const type = data.types.reverse().reduce((html, val) => {
    html += `<span class="${val.type.name}">${val.type.name}</span>`;
    return html;
  },"");
  fetch(data.species.url).then(prep=>prep.json()).then(specie=>{
    const description = specie.flavor_text_entries.reduce((arr,txt) => {
      if(txt.language.name === "en")
        arr.push(txt.flavor_text);
      return arr;
    },[]);
    container.innerHTML = `
      <div style="text-align:center;">${type}</div>
      <br>
      ${stats}
      <p class="flavor">${description[0]}</p>
    `;
  });
};
//  - end loadInfo


//  EXPORTS
module.exports = {
    setMenu
};
