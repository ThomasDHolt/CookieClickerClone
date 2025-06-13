import * as saveData from "./data/saveData.js";
import * as string from "./string.js";

const bakeButton = document.getElementById("bakeButton");
const cookieCounter = document.getElementById("cookieCounter");
const cpsText = document.getElementById("cpsText");
const resetButton = document.getElementById("resetButton");
const upgradesSection = document.getElementById("upgradesSection");

const tickRateInSeconds = 0.01; // 10 milliseconds

console.log(saveData.upgradeCountState);

Start();

async function Start()
{
    setInterval(SaveState, 1000);
    setInterval(Tick, (tickRateInSeconds * 1000)); //Convert from seconds to milliseconds

    const upgradeData = await GetUpgradeData();
    saveData.SetUpgradeData(upgradeData);
    DrawUpgradeButtons(saveData.upgradeData);

    console.log("UpgradeData:", saveData.upgradeData);
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
}

function DrawUpgradeButtons(data)
{
    for(let i = 0; i < data.length; i++)
    {
        console.log(`${data[i].name}:`, data[i]);
        const newButton = document.createElement("button");
        newButton.innerText = `${data[i].name} - ${data[i].cost}`;
        newButton.classList.add("upgrade-button");
        newButton.addEventListener("click", () => {PurchaseUpgrade(data[i])});
        upgradesSection.appendChild(newButton);
    }
}

async function GetUpgradeData()
{
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
    console.log("HTTP Response:", response);
    const data = await response.json();
    console.log("JSON Data:", data);

    for(let i = 0; i < data.length; i++)
    {
        const newUpgradeState = {
            id: `${data[i].id}`,
            name: `${data[i].name}`,
            count: 0
        }

        saveData.upgradeState.push(newUpgradeState);
    }

    return data;
}

function PurchaseUpgrade(upgradeData)
{
    if(saveData.gameState.cookieCounter >= upgradeData.cost)
    {
        console.log("UpgradeData:", upgradeData);
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