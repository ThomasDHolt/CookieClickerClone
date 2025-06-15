import * as saveData from "./data/saveData.js";
import * as string from "./string.js";

const bakeButton = document.getElementById("bakeButton");
const cookieCounter = document.getElementById("cookieCounter");
const cpsText = document.getElementById("cpsText");
const resetButton = document.getElementById("resetButton");
const upgradesSection = document.getElementById("upgradesSection");
const upgradeTotals = [];

const tickRateInSeconds = 0.01; // 10 milliseconds

Start();

async function Start()
{
    setInterval(SaveState, 1000 * 60);
    setInterval(Tick, (tickRateInSeconds * 1000)); //Convert from seconds to milliseconds

    const upgradeData = await GetUpgradeData();
    const upgradeImageData = await GetUpgradeImageData();

    saveData.SetUpgradeData(upgradeData);
    saveData.SetUpgradeImageData(upgradeImageData);

    DrawUpgradeButtons(saveData.upgradeData);
}

function Tick()
{
    UpdateUI();

    if(saveData.gameState.cps != 0) {saveData.gameState.cookieCounter += (saveData.gameState.cps * tickRateInSeconds);}
}

function SaveState()
{
    // Save general data
    localStorage.setItem("cookieCounter", saveData.gameState.cookieCounter);
    localStorage.setItem("cps", saveData.gameState.cps);

    // Save upgrade data
    localStorage.setItem("autoClickerCount", saveData.upgradeCountState.autoClicker);
    localStorage.setItem("enhancedOvenCount", saveData.upgradeCountState.enhancedOven);
    localStorage.setItem("cookieFarmCount", saveData.upgradeCountState.cookieFarm);
    localStorage.setItem("robotBakerCount", saveData.upgradeCountState.robotBaker);
    localStorage.setItem("cookieFactoryCount", saveData.upgradeCountState.cookieFactory);
    localStorage.setItem("magicFlourCount", saveData.upgradeCountState.magicFlour);
    localStorage.setItem("timeMachineCount", saveData.upgradeCountState.timeMachine);
    localStorage.setItem("quantumOvenCount", saveData.upgradeCountState.quantumOven);
    localStorage.setItem("alienTechnologyCount", saveData.upgradeCountState.alienTechnology);
    localStorage.setItem("interdimensionalBakerCount", saveData.upgradeCountState.interdimensionalBaker);
}

function UpdateUI()
{
    const truncCookieCount = Math.trunc(saveData.gameState.cookieCounter);
    const truncCps = Math.trunc(saveData.gameState.cps * 10) / 10;

    cookieCounter.innerText = `${string.FormatNumber(truncCookieCount)} cookies`;
    cpsText.innerHTML = `CPS: ${string.FormatNumber(truncCps)}`;

    for(let i = 0; i < upgradeTotals.length; i++)
    {
        const formatName = string.ConvertUpgradeString(saveData.upgradeData[i].name);
        const count = saveData.GetUpgradeCount(formatName);
        upgradeTotals[i].innerText = count;
    }

    document.title = `${string.FormatNumber(truncCookieCount)} cookies - Cookie Clicker`;
}

function DrawUpgradeButtons(upgradeData)
{
    for(let i = 0; i < upgradeData.length; i++)
    {
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("flex-container", "flex-row", "upgrade-button-border-style");

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image-div", "flex-container", "flex-centre-horizontal", "flex-centre-vertical");

        const buttonAnchor = document.createElement("a");
        buttonAnchor.addEventListener("click", () => {PurchaseUpgrade(upgradeData[i])});
        buttonAnchor.classList.add("upgrade-button");
        imageDiv.appendChild(buttonAnchor);

        const upgradeImage = document.createElement("img");
        upgradeImage.src = saveData.GetUpgradeImage(upgradeData[i].id);
        upgradeImage.classList.add("upgrade-button-image-size", "pixelate", "image-border-style");
        buttonAnchor.appendChild(upgradeImage);
        buttonDiv.appendChild(imageDiv);

        const upgradeName = document.createElement("p");
        upgradeName.innerText = upgradeData[i].name;
        upgradeName.classList.add("upgrade-name-margin");
        buttonDiv.appendChild(upgradeName);

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("flex-container", "flex-column", "flex-grow")

        const upgradeCost = document.createElement("p");
        upgradeCost.innerText = `${string.FormatNumber(upgradeData[i].cost)} cookies`;
        upgradeCost.classList.add("upgrade-cost-font", "text-at-end");
        detailsDiv.appendChild(upgradeCost);

        const upgradeTotal = document.createElement("p");
        upgradeTotal.innerText = "0";
        upgradeTotal.classList.add("upgrade-total-font", "text-at-end");
        upgradeTotals.push(upgradeTotal);
        detailsDiv.appendChild(upgradeTotal);

        buttonDiv.appendChild(detailsDiv);

        upgradesSection.appendChild(buttonDiv);
    }
}

async function LoadJsonFromUrl(url)
{
    try
    {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error)
    {
        throw new Error(`${error}`);
    }
}

async function GetUpgradeImageData()
{
    const upgradeImageData = await LoadJsonFromUrl("./src/data/upgradeImages.json");
    return upgradeImageData;
}

async function GetUpgradeData()
{
    const upgradeData = await LoadJsonFromUrl("https://cookie-upgrade-api.vercel.app/api/upgrades");

    for(let i = 0; i < upgradeData.length; i++)
    {
        const newUpgradeState = {
            id: `${upgradeData[i].id}`,
            name: `${upgradeData[i].name}`,
            count: 0
        }

        saveData.upgradeState.push(newUpgradeState);
    }

    return upgradeData;
}

function PurchaseUpgrade(upgradeData)
{
    if(saveData.gameState.cookieCounter >= upgradeData.cost)
    {
        saveData.gameState.cps += upgradeData.increase;
        saveData.gameState.cookieCounter -= upgradeData.cost;
        saveData.IncrementUpgradeCount(upgradeData.id);
    }
}

bakeButton.addEventListener("click", () => {
    saveData.gameState.cookieCounter++;
});

resetButton.addEventListener("click", () => {
    saveData.gameState.cookieCounter = 0;
    saveData.gameState.cps = 0;

    saveData.upgradeCountState.autoClicker = 0;
    saveData.upgradeCountState.enhancedOven = 0;
    saveData.upgradeCountState.cookieFarm = 0;
    saveData.upgradeCountState.robotBaker = 0;
    saveData.upgradeCountState.cookieFactory = 0;
    saveData.upgradeCountState.magicFlour = 0;
    saveData.upgradeCountState.timeMachine = 0;
    saveData.upgradeCountState.quantumOven = 0;
    saveData.upgradeCountState.alienTechnology = 0;
    saveData.upgradeCountState.interdimensionalBaker = 0;
});