export function ConvertUpgradeString(upgradeString)
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

export function FormatNumber(cookieAmount)
{
    const flippedString = FlipString(String(cookieAmount));
    if(flippedString.length <= 3) {return cookieAmount;}
    let split = flippedString.match(/.{1,3}/g);

    for(let i = 0; i < split.length; i++)
    {
        split[i] = FlipString(split[i]);
    }

    const numberSize = CheckNumberSize(split);

    split = [split[split.length-2], split[split.length-1]];

    return split.reverse().join(".").concat(` ${numberSize}`);
}

export function FlipString(string)
{
    return string.split("").reverse().join("");
}

export function CheckNumberSize(numberArray)
{
    switch(numberArray.length)
    {
        case 2:
            return "thousand";
        case 3:
            return "million";
        case 4:
            return "billion";
        case 4:
            return "trillion";
        case 5:
            return "quadrillion";
        case 6:
            return "quintillion";
        case 7:
            return "sextillion";
        case 8:
            return "septillion";
        case 9:
            return "octillion";
        case 10:
            return "nonillion";
        default:
            break;
    }
}