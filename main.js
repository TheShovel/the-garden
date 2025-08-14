//audio
var wind = new Audio("audio/wind.wav");
wind.loop = true;
wind.volume = 0.5;

var music = new Audio("audio/music.mp3");
music.loop = true;

var plantFall = new Audio("audio/fall.wav");
var plantCollect = new Audio("audio/collect.wav");
var hitGround = new Audio("audio/hitGround.wav");
var plantPlant = new Audio("audio/plant.wav");

// elements and stuff
//
const body = document.body;

body.style.cssText = `
  user-select: none;
  overflow: hidden;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
  `;

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes sway {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(-5deg); }
}
`;
document.head.appendChild(styleSheet);

const background = document.createElement("div");
background.style.cssText = `
  user-select: none;
  position: absolute;
  background: white;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: end;
  `;
body.appendChild(background);
const thesun = document.createElement("div");
thesun.style.cssText = `
  opacity: 0;
  user-select: none;
  left: 0px;
  position: absolute;
  background: red;
  width: 125px;
  height: 125px;
  top: 0px;
  transition: all 2s ease;
  `;
background.appendChild(thesun);
const mountain = document.createElement("div");
mountain.style.cssText = `
  opacity: 0;
  user-select: none;
  right: 0px;
  top: 60px;
  position: absolute;
  background: blue;
  width: 100%;
  height: 140px;
  transition: all 2s ease;
  `;

const fence = document.createElement("div");
fence.style.cssText = `
  opacity: 0;
  user-select: none;
  right: 0px;
  top: 120px;
  position: absolute;
  background: blue;
  width: 100%;
  height: 80px;
  transition: all 2s ease;
  `;
const gardenFrame = document.createElement("div");
gardenFrame.style.cssText = `
  user-select: none;
  position: absolute;
  background: grey;
  width: 100%;
  height: 200px;
  `;
background.appendChild(mountain);
background.appendChild(fence);
background.appendChild(gardenFrame);

const statsFrame = document.createElement("div");
statsFrame.style.cssText = `
  user-select: none;
  position: absolute;
  background: white;
  width: 100%;
  height: 60px;
  bottom: -60px;
  display: flex;
  justify-content: center;
  align-items: center;
  `;
background.appendChild(statsFrame);
const flowersPlantedDisplay = document.createElement("div");
flowersPlantedDisplay.style.cssText = `
  user-select: none;
  font-family: monospace;
  font-size: 16px;
  `;
flowersPlantedDisplay.innerText = "click the seed bag";
statsFrame.appendChild(flowersPlantedDisplay);
const xpIndicator = document.createElement("div");
xpIndicator.style.cssText = `
  opacity: 0;
  user-select: none;
  white-space: nowrap;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  position: absolute;
  font-family: monospace;
  font-size: 12px;
  background: black;
  color: white;
  width: 0%;
  height: 20px;
  top: 0px;
  left: 0px;
  transition: all 0.2s linear;
  `;
xpIndicator.innerText = "";
statsFrame.appendChild(xpIndicator);

const completeIndicator = document.createElement("div");
completeIndicator.style.cssText = `
  opacity: 0;
  user-select: none;
  white-space: nowrap;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  position: absolute;
  font-family: monospace;
  font-size: 12px;
  background: black;
  color: white;
  width: 0%;
  height: 20px;
  bottom: 0px;
  left: 0px;
  transition: all 4s linear;
  `;
completeIndicator.innerText = "";
statsFrame.appendChild(completeIndicator);

const balloon = document.createElement("div");
balloon.style.cssText = `
  user-select: none;
  visibility: hidden;
  right: -75px;
  position: absolute;
  background: red;
  width: 75px;
  height: 75px;
  top: 50px;
  transition: all 15s linear;
  `;

const clouds = document.createElement("div");
clouds.style.cssText = `
  opacity: 0;
  user-select: none;
  right: 0px;
  top: 40px;
  position: absolute;
  background: blue;
  width: 100%;
  height: 125px;
  transition: all 2s ease;
  `;

background.appendChild(clouds);
background.appendChild(balloon);

// variables
let plants = {};
plantTypes = [
  "flower",
  "rose",
  "mushroom",
  "dandelion",
  "sad-flower",
  "cool-flower",
];
let plantsPlanted = 0;
let lvlReq = 2;
let lastUpgradeReach = 0;
const upgradePath = [
  "More seeds",
  "Growth speed",
  "Radio",
  "A lot more seeds",
  "A lot of growth speed",
  "The sun",
  "More seeds",
  "Growth speed",
  "Clouds",
  "A lot more seeds",
  "balloons",
  "Fence",
  "A lot more seeds",
  "A lot of growth speed",
  "Mountains",
  "Friend shark",
  "Final stretch",
];
let lvl = 0;
let upgradeType = upgradePath[0];
let growthSpeed = 3000;

//functions and stuff
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setPlantImage(url, object) {
  const img = new Image();
  img.src = url;
  img.onload = function () {
    object.style.background = `url(${url})`;
    object.style.width = this.width / 3 + "px";
    object.style.height = this.height / 3 + "px";
    object.style.backgroundSize = "100% 100%";
    object.style.backgroundRepeat = "no-repeat";
  };
}

async function balloons() {
  balloon.style.background = "red";
  balloon.style.visibility = "visible";
  await delay(1);
  balloon.style.right = "410px";
  balloon.style.visibility = "hidden";
}

async function updateDisplays() {
  xpIndicator.innerText =
    `/Next upgrade (` +
    (plantsPlanted - lastUpgradeReach) +
    `/` +
    (lvlReq - lastUpgradeReach) +
    `): =${upgradeType}=/`;

  xpIndicator.style.width =
    100 -
    ((lvlReq - lastUpgradeReach - (plantsPlanted - lastUpgradeReach)) /
      (lvlReq - lastUpgradeReach)) *
      100 +
    "%";

  completeIndicator.style.width =
    100 - ((upgradePath.length - lvl) / upgradePath.length) * 100 + "%";
  completeIndicator.innerText =
    "/Progress: " +
    Math.floor(100 - ((upgradePath.length - lvl) / upgradePath.length) * 100) +
    "%/";
  xpIndicator.style.opacity = 1;

  if (plantsPlanted >= lvlReq) {
    lastUpgradeReach = plantsPlanted;
    lvlReq += Math.ceil(lvlReq / 2);
    await delay(1000);
    switch (upgradeType) {
      case "A lot more seeds":
        spawnPlant();
        spawnPlant();
        spawnPlant();
        break;
      case "More seeds":
        spawnPlant();
        break;
      case "Growth speed":
        growthSpeed += -100;
        break;
      case "A lot of growth speed":
        growthSpeed += -200;
        break;
      case "Radio":
        completeIndicator.style.opacity = 1;
        music.play();
        break;
      case "The sun":
        thesun.style.opacity = "1";
        spawnPlant();
        break;
      case "Clouds":
        clouds.style.opacity = "1";
        growthSpeed += -200;
        spawnPlant();
        break;
      case "Fence":
        fence.style.opacity = "1";
        growthSpeed += -100;
        spawnPlant();
        break;
      case "balloons":
        growthSpeed += -200;
        spawnPlant();
        balloons();
        break;
      case "Mountains":
        mountain.style.opacity = "1";
        break;
    }
    lvl++;
    if (lvl > upgradePath.length - 1) {
      console.log("Reached end of upgrade path");
      const endGameUpgrades = ["More seeds", "Growth speed"];
      upgradeType = endGameUpgrades[randomInt(0, endGameUpgrades.length - 1)];
    } else {
      upgradeType = upgradePath[lvl];
    }
    updateDisplays();
  }
}

//game logic
const spawnPlant = async () => {
  const id = randomInt(0, 99999999);
  plants[id] = plantTypes[randomInt(0, plantTypes.length - 1)];
  const plantObj = document.createElement("div");
  plantObj.style.cssText = `
    user-select: none;
    cursor: pointer;
    position: absolute;
    background: purple;
    width: 50px;
    height: 50px;
    bottom: 500px;
    transition: all 0.75s ease-in;
    transform-origin: 50% 100% 0;
    opacity: 0;
    `;
  plantObj.style.left = randomInt(0, 350) + "px";
  gardenFrame.appendChild(plantObj);
  await delay(10);
  plantObj.style.opacity = 1;
  plantFall.play();
  plantObj.style.bottom = randomInt(20, 175) + "px";
  plantObj.style.zIndex = 175 - parseInt(plantObj.style.bottom);
  await delay(740);
  hitGround.play();
  plantObj.onclick = async () => {
    plantPlant.play();
    async function plantAnimation() {
      plantObj.style.backgroundSize = "100% 90%";
      await delay(200);
      plantObj.style.backgroundSize = "100% 100%";
    }
    if (plantsPlanted == 0) {
      wind.play();
      flowersPlantedDisplay.innerText = "watch the plant grow";
    }
    plantObj.onclick = null;
    plantObj.style.cursor = "";
    plantObj.style.transition = "all 0.1s ease";
    plantAnimation();
    setPlantImage(`assets/assetsSource/grow1.PNG`, plantObj);
    await delay(200);

    plantObj.style.animation = "sway 3s ease-in-out infinite alternate";

    await delay(growthSpeed + randomInt(0, 100));
    plantAnimation();
    setPlantImage(`assets/assetsSource/grow2.PNG`, plantObj);
    plantObj.style.animation = "";
    await delay(200);

    await delay(growthSpeed + randomInt(0, 100));
    plantAnimation();
    plantObj.style.animation = "sway 3s ease-in-out infinite alternate";
    setPlantImage(`assets/assetsSource/${plants[id]}.PNG`, plantObj);
    if (plantsPlanted == 0) {
      flowersPlantedDisplay.innerText = "pick up the plant";
    }
    await delay(100);

    plantObj.style.cursor = "pointer";
    plantObj.onclick = async () => {
      plantObj.onclick = null;
      plantCollect.play();
      if (plantsPlanted == 0) {
        flowersPlantedDisplay.innerText = "";
      }
      plantObj.style.transition = "all 1s ease";
      await delay(1);
      plantObj.style.left = parseInt(plantObj.style.left) + 15 + "px";
      plantObj.style.bottom = parseInt(plantObj.style.bottom) - 15 + "px";
      plantObj.style.width = "20px";
      plantObj.style.height = "80px";
      plantObj.style.opacity = "0";
      plantsPlanted++;
      if (plantsPlanted == 1) {
        flowersPlantedDisplay.innerText = `${plantsPlanted} plant grown`;
      } else {
        flowersPlantedDisplay.innerText = `${plantsPlanted} plants grown`;
      }
      await updateDisplays();
      await delay(2000);
      spawnPlant();
      delete plants[id];
      plantObj.remove();
    };
  };
};
spawnPlant();

//misc
async function fixzoom() {
  background.style.zoom = (250 * window.innerWidth) / 2507 + "%";
  await delay(100);
  fixzoom();
}
fixzoom();
