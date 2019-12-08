//  CREATE MENU ELEMENTS
const setMenu = (container) => {
  const menu = { 0: "pokedex", 1: "trainer", 2: "credits" };
  const ul = document.createElement('ul');
  Object.values(menu).forEach((item, id) => {
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
      });
      // ---

      //  TEST
      if(id === 0){
        setTimeout(()=>{
          document.querySelector(".button").addEventListener("click", ()=>{
            document.querySelector(".pokedex").classList.add('animated','slideOutLeft');
          });
        },50);
      }
      //  ---
    });
  });
};

//  EXPORTS FUNCTIONS
module.exports = {
    setMenu
};
