//  ---
//  SELECT ELEMENT FUNCTION
const select = (str) => {
  if(typeof(str) === 'string') return document.querySelector(str);
  else if(Array.isArray(str)){
    str = str.join(",");
    return document.querySelectorAll(str);
  }
};
//  ---

// ---
//  CLICKABLE POKEBALL TOP & BOTTOM
select(".top").addEventListener("click", () => {
  const frame = select(".frame");
  frame.classList.toggle("open");
  frame.classList.add("fadeIn");
  select(".bottom").classList.toggle("slideInDown");
});

select(".bottom").addEventListener("click", () => { document.location.href="/"; });
// ---

//  EXPORTS
module.exports = {
    select
};
