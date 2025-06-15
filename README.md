# Cyber Cookie Clicker

## Project Description
Cyber Cookie Clicker is a small recreation of the popular web game Cookie Clicker, in the style of the Steam game Bitburner. Click the floating cyber cookie to bake cookies and purchase upgrades with your baked cookies.

## How to get the project
- Type 'git clone git@github.com:ThomasDHolt/CookieClickerClone.git' and press Enter to clone the repository to a folder.
- cd to the git folder and type 'npm install' to install all the required packages.
- Finally, type 'code .' to open the project in VS Code.

## Tools
- Visual Studio Code
- Paint.NET
- Aseprite

## What requirements did I achieve
- I was able to retrieve data from the CookiesUpgrade API for use in the web app by the upgrade buttons.
- My approach to writing abstract functions whenever possible made my codebase more maintainable and less prone to bugs.
- Each upgrade button and the cyber cookie have a click event which triggers whenever the user clicks on them, the former has their click events applied dynamically.
- Extensive use of Flexbox has been made throughout the UI to make it more dynamic.
- Stats such as cookie count, cps and counts for each upgrade are stored locally so that user progress is saved for the next session.
- The game features two intervals which run simultaneously, a Tick which runs every tenth of a second, handles appending cookies with respect to cps and updates the UI, then Save which runs every 60 seconds and saves user progress in local storage.
- The function which handles purchasing upgrades is an abstract function which is applied to each button dynamically when they are created through the DOM, meaning that each upgrade is bought with the same code and changes can be quickly made.
- The cyber cookie is animated with a passive pulsing animation and a click animation, hopefully to make the user experience more interesting, although some additions could be made to further improve on this, like sound effects and visual effects when different buttons are clicked.
- The README contains instructions for deploying the repository onto a user's machine as well as a brief project description.
- Some use of Try Catch has been made, although it would be beneficial to expand it's usage throughout the project to make the codebase more rigid.

## Were there any requirements or goals that I was unable to achieve
- I didn't include a settings menu, this was mainly because I did not have any sound effects, therefore a volume slider would be pointless.

## Extra Reflection
- Getting to create my own sprites for the game with Aseprite was a fun experience which I believe gave the game more of a personal touch.
- The game's visual style is heavily inspired by the Steam game Bitburner, which itself is based off old console-based computer systems.
