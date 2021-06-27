import noble from "@abandonware/noble"
import { GoveeLightStrip } from "./goveeLightStrip";
import { Color, colorToHex } from "./color"
import { isValidColor, isValidPeripheral, isValidValue } from "./validation";
import { sendHexMessage, setInitialState, setLightStripBrightness, setLightStripColor, setLightStripPower } from "./goveeLightStripUtil";

process.env.NOBLE_REPORT_ALL_HCI_EVENTS = "1"; // needed on Linux including Raspberry Pi

let DEBUG = true

let WRITE_CHAR_UUID = "000102030405060708090a0b0c0d2b11"
let KEEP_ALIVE_PACKET = "aa010000000000000000000000000000000000ab"

let scanStartCallback: undefined | Function;
let scanStopCallback: undefined | Function;
let discoveryCallback: undefined | ((ledStrip: GoveeLightStrip) => void); // called when a light strip is found and connected
// TODO: add disconnection callback

var ledStrips: { [uuid: string] : GoveeLightStrip } = {}

noble.on("discover", async (peripheral) => {
    const { id, uuid, address, state, rssi, advertisement } = peripheral;

    if (DEBUG)
    {
        // console.log("Discovered", id, uuid, address, state, rssi, advertisement.localName);
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

    peripheral.on("disconnect", (err) => {
        console.log("disconnected with error: " + err)
    })

    peripheral.on("connect", (err) => {
        console.log("connected with error: " + err)
    })

    await peripheral.connectAsync()
    let stuffFound = await peripheral.discoverSomeServicesAndCharacteristicsAsync([],[WRITE_CHAR_UUID])
    if(!stuffFound.characteristics)
    {
        return
    }

    let toSave: GoveeLightStrip = {
        uuid,
        name: advertisement.localName,
        writeCharacteristic: stuffFound.characteristics[0],
        color: { red: 255, green: 255, blue: 255},
        brightness: 0,
        power: false
    }

    // Set initial state
    setInitialState(toSave)
    ledStrips[toSave.uuid] = toSave

    setInterval(() => {
        sendHexMessage(toSave, KEEP_ALIVE_PACKET)
        if(DEBUG)
        {
            console.log("sending KEEP ALIVE")
        }
    }, 2000)

    if(discoveryCallback)
    {
        discoveryCallback(toSave)
    }


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

export const setColorOfStrip = (ledStrip: GoveeLightStrip, newColor: Color): GoveeLightStrip | undefined => {

    if(DEBUG)
    {
        console.log('Setting color to #' + colorToHex(newColor) + ' for ' + ledStrip.uuid)
    }

    if(!isValidColor(newColor))
    {
        if(DEBUG)
        {
            console.log('ERROR: INVALID COLOR')
        }
        // TODO: Make error types
        return
    }

    ledStrips[ledStrip.uuid] = setLightStripColor(ledStrip, newColor, false)
    return ledStrips[ledStrip.uuid]
}

export const setBrightnessOfStrip = (ledStrip: GoveeLightStrip, newBrightness: number) => {
    if(!isValidValue(newBrightness))
    {
        // TODO: Make error types
        return
    }

    setLightStripBrightness(ledStrip, 10)
}

export const setPowerOfStrip = (ledStrip: GoveeLightStrip, power: boolean) => {

    setLightStripPower(ledStrip, power)

}

export const registerScanStart = (callback: Function) => { scanStartCallback = callback }
export const registerScanStop  = (callback: Function) => { scanStopCallback  = callback }
export const registerDiscoveryCallback = (callback: ((ledStrip: GoveeLightStrip) => void)) => { discoveryCallback = callback }


export * from "./goveeLightStrip"
export * from "./color"