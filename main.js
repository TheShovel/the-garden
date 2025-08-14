//audio
const wind = new Audio("audio/wind.wav");
wind.loop = true;
wind.volume = 0.5;

const music = new Audio("audio/music.mp3");
music.loop = true;

// elements and stuff
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

@keyframes clouds {
  0% { transform: translateY(-5px); }
  50% { transform: translateY(0px); }
  100% { transform: translateY(5px); }
}
`;
document.head.appendChild(styleSheet);

const background = document.createElement("div");
background.style.cssText = `
  bottom: 100px;
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
  width: 125px;
  height: 140px;
  top: 0px;
  background: url("assets/assetsSource/sun.PNG");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  background-position-x: -11px;
  background-position-y: -11px;
  `;
background.appendChild(thesun);
const mountain = document.createElement("div");
mountain.style.cssText = `
  opacity: 0;
  user-select: none;
  right: -20px;
  top: 10px;
  position: absolute;
  width: 400px;
  height: 200px;
  background: url("assets/assetsSource/mountains.PNG");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  background-position-x: -11px;
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
  background: url("assets/assetsSource/fence.PNG");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  background-position-y: 11px;
  `;
const smolhaj = document.createElement("div");
smolhaj.style.cssText = `
  opacity: 0;
  user-select: none;
  right: 15px;
  top: 160px;
  position: absolute;
  background: cyan;
  width: 100px;
  height: 60px;
  background: url("assets/assetsSource/smolhaj.PNG");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  pointer-events: none;
  `;

const radio = document.createElement("div");
radio.style.cssText = `
  opacity: 0;
  user-select: none;
  right: 10px;
  top: 175px;
  position: absolute;
  background: red;
  width: 60px;
  height: 50px;
  background: url("assets/assetsSource/radio.PNG");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  pointer-events: none;
  `;
const gardenFrame = document.createElement("div");
gardenFrame.style.cssText = `
  user-select: none;
  position: absolute;
  width: 100%;
  height: 230px;
  `;
const ground = document.createElement("div");
ground.style.cssText = `
  opacity: 0;
  user-select: none;
  position: absolute;
  width: 100%;
  height: 230px;
  background: url(assets/assetsSource/ground.PNG);
  background-size: 108% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  background-position-x: -11px;
  `;

background.appendChild(mountain);
background.appendChild(fence);
background.appendChild(ground);
background.appendChild(gardenFrame);
background.appendChild(smolhaj);
background.appendChild(radio);

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
  transition: all 5s ease;
  `;
background.appendChild(statsFrame);
const flowersPlantedDisplay = document.createElement("div");
flowersPlantedDisplay.style.cssText = `
  user-select: none;
  font-family: monospace;
  font-size: 16px;
  `;
flowersPlantedDisplay.innerText = "click the bag";
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
  opacity: 0;
  right: -75px;
  position: absolute;
  background: url(assets/assetsSource/balloon.PNG);
  width: 75px;
  height: 75px;
  top: 50px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 25s ease;
  animation: clouds 1s ease-in-out infinite alternate;
  `;

const clouds = document.createElement("div");
clouds.style.cssText = `
  opacity: 0;
  user-select: none;
  right: 0px;
  top: 40px;
  position: absolute;
  background: blue;
  width: 300px;
  height: 100px;
  background: url("assets/assetsSource/clouds.PNG");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 5s ease;
  animation: clouds 3s ease-in-out infinite alternate;
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
let plantMultiplier = 1;
let plantsPlanted = 0;
let lvlReq = 2;
let lastUpgradeReach = 0;
const upgradePath = [
  "More seeds",
  "Ground",
  "More seeds",
  "Radio",
  "A lot more seeds",
  "A lot of growth speed",
  "The sun",
  "More seeds",
  "x2 multiplier",
  "Growth speed",
  "Clouds",
  "balloons",
  "Fence",
  "A lot more seeds",
  "x4 multiplier",
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

function playSound(url) {
  const sound = new Audio(url);
  sound.play();
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
  balloon.style.opacity = 1;
  balloon.style.right = "410px";
  await delay(8000);
  balloon.style.opacity = 0;
  await delay(12000);
  balloon.style.right = "-75px";
  await delay(16000);
  balloons();
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
  if (lvl > upgradePath.length - 1) {
  } else {
    xpIndicator.style.opacity = 1;
  }

  if (plantsPlanted >= lvlReq) {
    lastUpgradeReach = plantsPlanted;
    lvlReq += Math.min(Math.ceil(lvlReq / 2), 100);
    await delay(1000);
    switch (upgradeType) {
      case "A lot more seeds":
        spawnPlant();
        spawnPlant();
        spawnPlant();
        spawnPlant();
        break;
      case "More seeds":
        spawnPlant();
        spawnPlant();
        break;
      case "Growth speed":
        growthSpeed += -100;
        break;
      case "A lot of growth speed":
        growthSpeed += -200;
        break;
      case "Radio":
        radio.style.opacity = 1;
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
        spawnPlant();
        spawnPlant();
        balloons();
        break;
      case "Mountains":
        mountain.style.opacity = "1";
        break;
      case "Ground":
        growthSpeed += -200;
        ground.style.opacity = "1";
        break;
      case "Friend shark":
        smolhaj.style.opacity = "1";
        spawnPlant();
        growthSpeed += -200;
        break;
      case "x2 multiplier":
        plantMultiplier = 2;
        break;
      case "x4 multiplier":
        plantMultiplier = 4;
        break;
    }
    lvl++;
    if (lvl > upgradePath.length - 1) {
      const endGameUpgrades = ["More seeds", "Growth speed"];
      completeIndicator.style.opacity = "0";
      xpIndicator.style.opacity = "0";
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
    width: 50px;
    height: 50px;
    bottom: 500px;
    transition: all 0.75s ease-in;
    transform-origin: 50% 100% 0;
    opacity: 0;
    `;
  setPlantImage("/assets/assetsSource/seed-bag.PNG", plantObj);
  plantObj.style.left = randomInt(0, 350) + "px";
  gardenFrame.appendChild(plantObj);
  await delay(10);
  plantObj.style.opacity = 1;
  plantObj.style.bottom = randomInt(20, 175) + "px";
  plantObj.style.zIndex = 175 - parseInt(plantObj.style.bottom);
  await delay(740);
  playSound("audio/hitGround.wav");
  plantObj.onclick = async () => {
    playSound("audio/plant.wav");
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
      plantObj.style.cursor = "";
      plantObj.onclick = null;
      playSound("audio/collect.wav");
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
      plantsPlanted += plantMultiplier;
      if (lvl > upgradePath.length - 1) {
        flowersPlantedDisplay.innerText = `You did it! Thank you for playing <3`;
      } else {
        if (plantsPlanted == 1) {
          flowersPlantedDisplay.innerText = `${plantsPlanted} plant grown`;
        } else {
          flowersPlantedDisplay.innerText = `${plantsPlanted} plants grown`;
        }
      }
      await updateDisplays();
      await delay(750);
      spawnPlant();
      delete plants[id];
      plantObj.remove();
    };
  };
};
spawnPlant();

//misc
async function fixzoom() {
  if (window.innerWidth > window.innerHeight) {
    background.style.bottom = "100px";

    background.style.zoom = (250 * window.innerWidth) / 2507 + "%";
  } else {
    //scaling if you play on half the monitor
    background.style.bottom = "";
    background.style.zoom = (600 * window.innerWidth) / 2507 + "%";
  }
  await delay(100);
  fixzoom();
}
fixzoom();
