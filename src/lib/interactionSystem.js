const GE = require('./graphicEngine');


document.querySelector(".top").addEventListener("click", () => {
  document.querySelector(".frame").classList.toggle('open');
  document.querySelector(".frame").classList.add('fadeIn');

  // if(document.querySelector(".slideInDown")){
  //   document.querySelector(".pokeball.bottom").classList.toggle('slideInUp');
  // }else{
    document.querySelector(".pokeball.bottom").classList.toggle('slideInDown');
  // }
});

document.querySelector(".bottom").addEventListener("click", () => { document.location.href="/"; });


document.querySelectorAll(".screen > ul > li").forEach(li => {
  li.addEventListener("click", e => {
    const url = `/${e.target.textContent}`;
    fetch(url, {mode: 'no-cors'}).then(r=>r.text()).then(res=>{
      document.querySelector('.screen').innerHTML = res;
    });
  });
});


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
