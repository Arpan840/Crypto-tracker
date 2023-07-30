document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggleButton");
  const viewGrid = document.querySelector(".grid");
  const viewList = document.querySelector(".list");
  const body = document.querySelector("body");
  const nav = document.querySelector("nav");
  const navbar = document.querySelector(".navbar-light");
  const coinBoxes = document.getElementsByClassName("coinBox");
  const data = document.querySelector(".data");
  let coinDetails;
  let originalGridViewHTML;
  function toggle() {
    if (toggleButton.innerHTML.includes("fa-toggle-off")) {
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

  toggleButton.addEventListener("click", toggle);

  viewGrid.style.borderBottom = "2px solid blue";

  function switchToGridView() {
    viewGrid.style.borderBottom = "2px solid blue";
    viewList.style.borderBottom = "";

    
    data.innerHTML = originalGridViewHTML;
  }

  function switchToListView() {
    viewGrid.style.borderBottom = "";
    viewList.style.borderBottom = "2px solid blue";

    let table = `
      <table class="coinTable">
        <tr>
          <th>Crypto Image</th>
          <th>ID</th>
          <th>Name</th>
          <th>24h % Change</th>
          <th>Price (USD)</th>
          <th>Total Volume</th>
          <th>Market Cap</th>
        </tr>
    `;

    coinDetails.forEach((i) => {
      table += `
        <tr>
          <td><img src=${i.image} alt="bitcoin" class="cryptoImage" /></td>
          <td>${i.id}</td>
          <td>${i.name}</td>
          <td>${i.price_change_percentage_24h}%</td>
          <td>$${i.current_price}</td>
          <td>${i.total_volume}</td>
          <td>${i.market_cap}</td>
        </tr>
      `;
    });

    table += `</table>`;
    data.innerHTML = table;
  }

  viewGrid.addEventListener("click", switchToGridView);
  viewList.addEventListener("click", switchToListView);

  async function cryptoData() {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    );

    coinDetails = await response.json(); // Assign fetched data to coinDetails

    let coins = "";

    coinDetails.forEach((i) => {
      coins += `
        <div class="coinBox">
          <div class="image">
            <img src=${i.image} alt="bitcoin" class="cryptoImage" />
            <h5>${i.id}</h5>
            <p>${i.name}</p>
          </div>
          <h5 class="percentBorder">${i.price_change_percentage_24h}</h5>
          <h5 class="coinPrice"><span>$</span>${i.current_price}</h5>
          <p>Total Volume: ${i.total_volume}</p>
          <p>Market Cap: ${i.market_cap}</p>
        </div>
      `;
    });

    data.innerHTML = coins;

    
    originalGridViewHTML = coins;
  }

  cryptoData();
});