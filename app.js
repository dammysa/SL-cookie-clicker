const cookImg = document.getElementById("cookieImage");
let cookieCount = Number(localStorage.getItem("cookieCount")) ?? 0;
let cps = Number(localStorage.getItem("cps")) ?? 1; // moved cps and cookieCount here instead of a seperate area

[
  // const stringedCookie = JSON.stringify(cookieCount);
  // const stringedCPS = JSON.stringify(cps);
  // console.log(stringedCookie, stringedCPS);
  // localStorage.setItem("Cookie Count:", stringedCookie);
  // localStorage.setItem("CPS:", stringedCPS);
  // const cookieLocal = localStorage.getItem(stringedCookie);
  // const cpsLocal = localStorage.getItem(stringedCPS);
  // console.log(cpsLocal)
  // console.log(cookieLocal)
]; // For when I make it an object

function saveProgress() {
  // I had an issue here where I capitilised CookieCount and it would save to local storage as a seperate string
  localStorage.setItem("cookieCount", cookieCount);
  localStorage.setItem("cps", cps);
}

window.addEventListener("beforeunload", saveProgress);
setInterval(() => {
  saveProgress();
}, 60000); // added every minute save because safari doesnt use beforeunload

async function fetchData() {
  const response = await fetch(
    `https://cookie-upgrade-api.vercel.app/api/upgrades`
  );
  const data = await response.json();
  console.log(data);
  return data;
  // let upgradeName = data[0].name;
  // let upgradeCost = data[0].cost;
  // let upgradeIncrease = data[0].increase;
}

fetchData();

function cookiePlus() {
  // function added to change the text content of cookieCount
  document.getElementById(
    "cookieCount"
  ).textContent = `Cookies: ${cookieCount}`;
  // console.log("thru the function");
}
function cpsPlus() {
  document.getElementById("cps").textContent = `CPS: ${cps}`;
}

async function displayShop() {
  const shopItems = await fetchData();

  shopItems.forEach((item) => {
    const div = document.getElementById("shopItems");
    const shopName = document.createElement("p");
    const shopPrice = document.createElement("p");
    const cpsIncrease = document.createElement("p");
    const buyButton = document.createElement("button");
    const shopItemBox = document.createElement("div");

    shopItemBox.classList.add("shop-item-boxes");

    shopName.innerText = item.name;
    shopPrice.innerText = `Cost: ${item.cost} Cookies`;
    cpsIncrease.innerText = `Increase: ${item.increase} CPS`;
    buyButton.innerText = "Buy";

    shopItemBox.appendChild(shopName);
    shopItemBox.appendChild(shopPrice);
    shopItemBox.appendChild(cpsIncrease);
    shopItemBox.appendChild(buyButton);
    div.appendChild(shopItemBox);

    buyButton.addEventListener("click", () => {
      if (cookieCount < item.cost) alert("Not enough cookies");
      // Placeholder - I want to add a CSS element to attach to your mouse and tell you not enough
      else {
        cookieCount -= item.cost;
        cps += item.increase;
        cookiePlus();
        cpsPlus();
      }
    });
  });
}

displayShop();

setInterval(() => {
  cookieCount += cps;
  cpsPlus();
  cookiePlus();
  // console.log("cookie + 1");
}, 1000);

cookImg.addEventListener("click", () => {
  cookieCount++;
  cookiePlus();
  function playAudio(src) {
    new Audio(src).play();
  }
  playAudio(`./Resources/audiomass-output.mp3`);
});
