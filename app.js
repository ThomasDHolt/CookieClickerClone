const bakeButton = document.getElementById("bakeButton");
const cookieCounter = document.getElementById("cookieCounter");
const clickerBuyButton = document.getElementById("buyClickerButton")
const cpsText = document.getElementById("cpsText");
const resetButton = document.getElementById("resetButton");

const gameState = {
    cookieCounter: Number(localStorage.getItem("cookieCounter")) || 0,
    cps: Number(localStorage.getItem("cps")) || 0
}

const tickRateInSeconds = 0.01; // 10 milliseconds

setInterval(SaveState, 1000);
setInterval(Tick, (tickRateInSeconds * 1000)); //Convert from seconds to milliseconds

function SaveState()
{
    localStorage.setItem("cookieCounter", gameState.cookieCounter);
    localStorage.setItem("cps", gameState.cps);
}

function Tick()
{
    UpdateUI();

    if(gameState.cps != 0) {gameState.cookieCounter += (gameState.cps * tickRateInSeconds);}
}

function UpdateUI()
{
    const truncCookieCount = Math.trunc(gameState.cookieCounter);
    const truncCps = Math.trunc(gameState.cps * 10) / 10;

    cookieCounter.innerText = `${truncCookieCount} cookies`;
    cpsText.innerHTML = `CPS: ${truncCps}`;
}

bakeButton.addEventListener("click", () => {
    gameState.cookieCounter++;
});

clickerBuyButton.addEventListener("click", () => {
    gameState.cps += 0.1;
})

resetButton.addEventListener("click", () => {
    gameState.cookieCounter = 0;
    gameState.cps = 0;
});