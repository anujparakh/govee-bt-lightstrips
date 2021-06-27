import { hexToColor } from "./color";
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

    setBrightnessOfStrip(ledStrip, 5)
    while (true)
    {
        await new Promise(resolve => setTimeout(resolve, 5000));
        setColorOfStrip(ledStrip, hexToColor("ff0000"))
        await new Promise(resolve => setTimeout(resolve, 5000));
        setColorOfStrip(ledStrip, hexToColor("ffff00"))
        await new Promise(resolve => setTimeout(resolve, 5000));
        setColorOfStrip(ledStrip, hexToColor("ffffff"))
        await new Promise(resolve => setTimeout(resolve, 5000));
        setColorOfStrip(ledStrip, hexToColor("00ffff"))
        await new Promise(resolve => setTimeout(resolve, 5000));
        setColorOfStrip(ledStrip, hexToColor("aa00ff"))
    }

})