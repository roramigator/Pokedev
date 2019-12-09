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
};

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
          // //  send request to REQUEST FILTER
          // fetch("https://pokeapi.co/api/v2/pokemon/").then(prep=>prep.json()).then(response=>{
          //   //  DATA REFACTORING
          //   let dataPokemon = [];
          //   response.results.forEach(pokeData=>{
          //     const name = pokeData.name;
          //     const url = pokeData.url;
          //     fetch(url).then(prep=>prep.json()).then(response=>{
          //       const number = response.id;
          //       const data = {
          //         name,
          //         url,
          //         number
          //       };
          //       dataPokemon.push(data);
          //     });
          //   });
          //   const data = {
          //     previous: response.previous,
          //     next: response.next,
          //     dataPokemon
          //   };
          //   const container = IS.select('.pokedex');
          //   savePokeData(data, container);
          //});

          //this is request filter
          fetch(`https://pokeapi.co/api/v2/pokemon/${current}`).then(prep => prep.json()).then(res => {
            loadPokemon(res, IS.select(".pokedex"));
            IS.select([".right",".left"]).forEach(btn => {
              btn.addEventListener("click", e => {
                console.log(e.target);
              });
            });
          });

        } // - end if
      });
    }); // - end eventListener
  }); // - end forEach
};  // - end loadMenu


//  this is request filter
const getImage = (number) => {
  if(number < 10) number = '00'+number;
  else if(number < 100) number = '0'+number;
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`
};
//  ---


// testing selectiong all pokemon
// const savePokeData = (data, container) => {
//   setTimeout(()=>{
//     // loadPokemon(data.dataPokemon[0], container);
//     const pokeInfo = data.dataPokemon.find(item => item.number === current);
//     loadPokemon(pokeInfo, container);
//
//     IS.select([".right",".left"]).forEach(arrow => {
//       arrow.addEventListener("click", e => {
//         if(e.target.classList.value === 'right'){
//           if(current < data.dataPokemon.length){
//             current++;
//             const pokeInfo = data.dataPokemon.find(item => item.number === current);
//             loadPokemon(pokeInfo, container);
//           }
//         }
//         if(e.target.classList.value === 'left'){
//           if(current > 0){
//             current--;
//             const pokeInfo = data.dataPokemon.find(item => item.number === current);
//             loadPokemon(pokeInfo, container);
//           }
//         }
//       });
//     });
//   },50);
// };

const loadPokemon = (data, container) => {
  const img = getImage(data.id);
  container.innerHTML = `
  <div>
    <img src="${img}" width="90%">
    <span>${data.id}</span>
  </div>
  <p>${data.name}</p>
  <span>
    <span class="button">view</span>
    <span class="left"><</span>
    <span class="right">></span>
  </span>
  `;

  //  CREATING ELEMENTS
  //  --- ---
  // const divTag = document.createElement('div');
  // const imgTag = document.createElement('img');
  // imgTag.setAttribute('src', img);
  // imgTag.setAttribute('width', '90%');
  // divTag.appendChild(imgTag);
  // const spanTag = document.createElement('span');
  // spanTag.textContent = data.number;
  // divTag.appendChild(spanTag);
  // container.appendChild(divTag);
  //
  // const pTag = document.createElement('p');
  // pTag.textContent = data.name;
  // container.appendChild(pTag);
  //
  // const spanDivTag = document.createElement('span');
  // const spanBtnTag = document.createElement('span');
  // spanBtnTag.setAttribute('class', 'button');
  // spanBtnTag.textContent = "view";
  // spanDivTag.appendChild(spanBtnTag);
  // const spanLeftTag = document.createElement('span');
  // spanLeftTag.setAttribute('class', 'left');
  // spanLeftTag.textContent = "<";
  // spanDivTag.appendChild(spanLeftTag);
  // const spanRightTag = document.createElement('span');
  // spanRightTag.setAttribute('class', 'right');
  // spanRightTag.textContent = ">";
  // spanDivTag.appendChild(spanRightTag);
  // container.appendChild(spanDivTag);
  //  --- ---
  // setTimeout(()=>{
  //   data.dataPokemon.forEach(item => {
  //     const img = getImage(item.number);
  //     container.innerHTML = `
  //     <div>
  //       <img src="${img}" width="90%">
  //       <span>${item.number}</span>
  //     </div>
  //     <p>${item.name}</p>
  //     <span>
  //       <span class="button">view</span>
  //       <span class="left"><</span>
  //       <span class="right">></span>
  //     </span>
  //     `;
  //   }); // - end forEach
  // },50);
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


//  EXPORTS
module.exports = {
    setMenu
};
