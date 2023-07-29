const toggleButton = document.querySelector(".toggleButton");
const viewGrid = document.querySelector(".grid");
const viewList = document.querySelector(".list");
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const navbar = document.querySelector(".navbar-light");
const cryptoDataBox = document.querySelector('.rounded-12')

function toggle() {
  if (
    toggleButton.innerHTML ===
    '<i class="fa-solid fa-toggle-off" id="toggleButton"></i>'
  ) {
    toggleButton.innerHTML =
      '<i class="fa-solid fa-toggle-on" id="toggleButton"></i>';
    body.style.backgroundColor = "black";
    body.style.color = "white";

    navbar.classList.replace("navbar-light", "navbar-dark");
  } else {
    toggleButton.innerHTML =
      '<i class="fa-solid fa-toggle-off" id="toggleButton"></i>';
    body.style.backgroundColor = "white";
    body.style.color = "black";

    navbar.classList.replace("navbar-dark", "navbar-light");
  }
}
toggleButton.addEventListener("click", toggle);
viewGrid.style.borderBottom = "2px solid blue";
function viewGridFunction() {
  if (viewGrid.style.borderBottom === "") {
    viewGrid.style.borderBottom = "2px solid blue";
    viewList.style.borderBottom = "";
  }
}
viewGrid.addEventListener("click", viewGridFunction);

function viewListFunction() {
  if (viewList) {
    viewList.style.borderBottom = "2px solid blue";
    viewGrid.style.borderBottom = "";
    cryptoDataBox.style.width ='100%'
    cryptoDataBox.style.flexDirecion = ''
    
  }
}

viewList.addEventListener("click", viewListFunction);

async function cryptoData() {

  let response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
    
  );
let coinDetails= await response.json()
let coins=''
coinDetails.map((i)=>{
  coins+=`
  <div class="card bg-dark text-light rounded-12 " style="width: 18rem;">
        <div class="image">
          <img
            src=${i.image}
            alt="bitcoin"
            class="cryptoImage"
          />
          <div class="coinName">
            <h5>${i.id}</h5>
            <p>${i.name}</p>
          </div>

        </div>
        <div class="card-body">
          <h5 class="card-text percentBorder">${i.price_change_percentage_24h}</h5>
          <h5 class="card-title coinPrice"><span>$</span>${i.current_price}</h5>
          <div class="additionalDetails">
          <p>
            Total Volume: ${i.total_volume}
          </p>
          <p>Market Cap: ${i.market_cap}</p>
        </div>
        </div>
      </div>
  `
})
document.querySelector('.data').innerHTML=coins
}
addEventListener('DOMContentLoaded', cryptoData)