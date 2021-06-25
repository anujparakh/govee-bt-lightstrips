import noble from "@abandonware/noble"
import { GoveeLightStrip } from "./goveeLightStrip";
import { Color } from "./color"
import { isValidPeripheral } from "./validation";

process.env.NOBLE_REPORT_ALL_HCI_EVENTS = "1"; // needed on Linux including Raspberry Pi

let DEBUG = true

let scanStartCallback: undefined | Function;
let scanStopCallback: undefined | Function;

var ledStrips: { [uuid: string] : GoveeLightStrip } = {}

noble.on("discover", async (peripheral) => {
    const { id, uuid, address, state, rssi, advertisement } = peripheral;

    if (DEBUG)
    {
        console.log("Discovered", id, uuid, address, state, rssi, advertisement.localName);
    }

    if(!isValidPeripheral(peripheral))
    {
        if(DEBUG)
        {
            // TODO: Print something
        }
        return
    }

    // Save the LED Strip
    if(ledStrips[uuid])
    {
        return
    }

    await peripheral.connectAsync()
    let stuffFound = await peripheral.discoverSomeServicesAndCharacteristicsAsync(["000102030405060708090a0b0c0d1910"],["000102030405060708090a0b0c0d2b11"])
    console.log(stuffFound)

    let toSave: GoveeLightStrip = {
        uuid,
        name: advertisement.localName,
        color: { red: 255, green: 255, blue: 255},
        brightness: 0,
        power: false
    }

    // Set initial state



})

noble.on("scanStart", () => {
    if(DEBUG)
    {
        console.log("Scan Started!");
    }
    if(scanStartCallback)
    {
        scanStartCallback();
    }
})

noble.on("scanStop", () => {
    if(DEBUG)
    {
        console.log("Scan Stopped!");
    }
    if(scanStopCallback)
    {
        scanStopCallback();
    }
})

// expose the debug variable
export const debug = (on: boolean) => {
    DEBUG = on;
};

export const startDiscovery = async() => {
    await noble.startScanningAsync([], false)
}

export const stopDiscovery = async() => {
    await noble.stopScanningAsync()

    scanStartCallback = undefined;
    scanStopCallback  = undefined;
}

export const getListOfStrips = () => {
    return ledStrips
}

export const setColorOfStrip = (ledStrip: GoveeLightStrip, newColor: Color) => {

}

export const setBrightnessOfStrip = (ledStrip: GoveeLightStrip, newBrightness: number) => {

}

export const setPowerOfStrip = (ledStrip: GoveeLightStrip, power: boolean) => {

}


export * from "./goveeLightStrip"
export * from "./color"