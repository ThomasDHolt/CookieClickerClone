import * as string from "../string.js"

export const gameState = {
    cookieCounter: Number(localStorage.getItem("cookieCounter")) || 0,
    cps: Number(localStorage.getItem("cps")) || 0
}

export const upgradeCountState = {
    autoClicker: Number(localStorage.getItem("autoClickerCount")) || 0,
    enhancedOven: Number(localStorage.getItem("enhancedOvenCount")) || 0,
    cookieFarm: Number(localStorage.getItem("cookieFarmCount")) || 0,
    robotBaker: Number(localStorage.getItem("robotBakerCount")) || 0,
    cookieFactory: Number(localStorage.getItem("cookieFactoryCount")) || 0,
    magicFlour: Number(localStorage.getItem("magicFlourCount")) || 0,
    timeMachine: Number(localStorage.getItem("timeMachineCount")) || 0,
    quantumOven: Number(localStorage.getItem("quantumOvenCount")) || 0,
    alienTechnology: Number(localStorage.getItem("alienTechnologyCount")) || 0,
    interdimensionalBaker: Number(localStorage.getItem("interdimensionalBakerCount")) || 0
}

export let upgradeState = [] // Tracks how many of each upgrade we have in the current game
export let upgradeData = [] // A record of data about each upgrade for performing checks and calculations
export let upgradeImages = [] // A record of upgrade images and their source paths

export function SetUpgradeData(newUpgradeData) {upgradeData = newUpgradeData;}
export function SetUpgradeImageData(newUpgradeImageData) {upgradeImages = newUpgradeImageData;}

export function GetUpgradeImage(upgradeId)
{
    try
    {
        for(let i = 0; i < upgradeImages.length; i++)
        {
            if(upgradeImages[i].id == upgradeId) {return upgradeImages[i].src;}
        }
    } catch(error)
    {
        throw new Error(`${error}`);
    }
}

export function GetUpgradeCount(name)
{
    try
    {
        return upgradeCountState[name];
    } catch(error)
    {
        throw new Error(`${error}`);
    }
}

export function IncrementUpgradeCount(upgradeId)
{
    for(let i = 0; i < upgradeState.length; i++)
    {
        if(upgradeState[i].id == upgradeId)
        {
            const name = string.ConvertUpgradeString(upgradeState[i].name);
            upgradeCountState[name]++;
            return;
        }
    }
}