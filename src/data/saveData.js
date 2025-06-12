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

export function SetUpgradeData(newUpgradeData) {upgradeData = newUpgradeData;}
export function IncrementUpgradeCount(upgradeId)
{
    for(let i = 0; i < upgradeState.length; i++)
    {
        if(upgradeState[i].id == upgradeId)
        {
            const name = ConvertUpgradeString(upgradeState[i].name);
            upgradeCountState[name]++;
            return;
        }
    }
}

function ConvertUpgradeString(upgradeString)
{
    if(typeof upgradeString !== "string") return "";
    let splitName = upgradeString.toLowerCase();
    
    for(let i = 0; i < splitName.length; i++)
    {
        if(splitName[i] == " ")
        {
            //Split by space
            splitName = splitName.split(" ");
            
            for(let j = 1; j < splitName.length; j++)
            {
                splitName[j] = splitName[j].charAt(0).toUpperCase() + splitName[j].slice(1);
            }

            splitName = splitName.join("");
            break;
        }
        if(splitName[i] == "-")
        {
            //Split by dash
            splitName = splitName.split("-");
            
            for(let j = 1; j < splitName.length; j++)
            {
                splitName[j] = splitName[j].charAt(0).toUpperCase() + splitName[j].slice(1);
            }

            splitName = splitName.join("");
            break;
        }
    }

    return splitName;
}