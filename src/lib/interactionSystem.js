//  GRAPHIC ENGINE
const GE = require('./graphicEngine');

//  LOAD MENU ON SCREEN
GE.setMenu(document.querySelector(".screen"));

// --------------------------------
//  CLICKABLE POKEBALL TOP & BOTTOM
// --------------------------------
document.querySelector(".top").addEventListener("click", () => {
  document.querySelector(".frame").classList.toggle('open');
  document.querySelector(".frame").classList.add('fadeIn');
  document.querySelector(".pokeball.bottom").classList.toggle('slideInDown');
});

document.querySelector(".bottom").addEventListener("click", () => { document.location.href="/"; });
// --------------------------------
// --------------------------------
// --------------------------------


//  TEST
// document.querySelector(".button").addEventListener("click", ()=>{
//   document.querySelector(".pokedex").classList.add('animated','slideOutLeft');
// });

// document.querySelectorAll(".screen > ul > li").forEach(li => {
//   li.addEventListener("click", e => {
//       const menuBtn = e.target.textContent;
//       GE[menuBtn]();
//       console.log(GE);
//   });
// });
