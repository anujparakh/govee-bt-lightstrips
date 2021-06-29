import { hexToColor } from "./color";
import { WHITE_SHADES } from "./whiteShades";
import { startDiscovery, stopDiscovery, debug, GoveeLightStrip, Color, registerDiscoveryCallback, setBrightnessOfStrip, setColorOfStrip, setPowerOfStrip } from "./index";
import promptSync from 'prompt-sync';

const prompt = promptSync();


debug(true);

startDiscovery()


registerDiscoveryCallback(async (ledStrip) => {

    // while(true)
    // {
    //     const color =  prompt("Enter color: ")

    //     setColorOfStrip(ledStrip, hexToColor(color!))
    // }
    // console.log("found: " + ledStrip.name)

    setBrightnessOfStrip(ledStrip, 100)
    setPowerOfStrip(ledStrip, false)
    while (true)
    {
        // for(var i = 0; i < WHITE_SHADES.length; ++i)
        // {
        //     await new Promise(resolve => setTimeout(resolve, 500));
        //     setColorOfStrip(ledStrip, hexToColor(WHITE_SHADES[i]), true)
        // }

        // await new Promise(resolve => setTimeout(resolve, 2000));
        // setColorOfStrip(ledStrip, hexToColor("d6e1ff"), true)
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // setColorOfStrip(ledStrip, hexToColor("ffffff"), false)
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // setColorOfStrip(ledStrip, hexToColor("fcf8ff"), true)
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // setColorOfStrip(ledStrip, hexToColor("eceeff"), true)
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // setColorOfStrip(ledStrip, hexToColor("d6e1ff"), true)
    }

})