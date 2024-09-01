import noble from "@abandonware/noble"
import { GoveeLightStrip } from "./goveeLightStrip";
import { Color, colorToHex } from "./color"
import { isValidColor, isValidPeripheral, isValidValue } from "./validation";
import { sendKeepAlive, setInitialState, setLightStripBrightness, setLightStripColor, setLightStripPower } from "./goveeLightStripUtil";
import * as constants from "./constants"

process.env.NOBLE_REPORT_ALL_HCI_EVENTS = "1"; // needed on Linux including Raspberry Pi

let DEBUG = true;
let scanStartCallback: undefined | Function;
let scanStopCallback: undefined | Function;
let discoveryCallback: undefined | ((ledStrip: GoveeLightStrip) => void); // called when a light strip is found and connected
let ledStrips: { [uuid: string] : GoveeLightStrip } = {};

noble.on("discover", async (peripheral) => {
    const { id, uuid, address, state, rssi, advertisement } = peripheral;

    if (DEBUG) console.log("Discovered", id, uuid, address, state, rssi, advertisement.localName);
    let model = isValidPeripheral(peripheral);
    if(model == "" || ledStrips[uuid]) return;
    // if (model == "") {
    //     if (DEBUG) {
    //         // TODO: Print something
    //     }
    //     return
    // }

    // Strip already exists
    // if(ledStrips[uuid]) return;

    if(DEBUG) {

        peripheral.on("disconnect", (err) => {
            if (err) console.error(advertisement.localName + " disconnected with error: " + err);
            console.debug('Disconnected: ' + JSON.stringify(peripheral, null, 2));
        })

        peripheral.on("connect", (err) => {
            if (err) console.error(advertisement.localName + " connected with error: " + err);
            console.debug('Connected: ' + JSON.stringify(peripheral, null, 2));
        })
    }

    // Connect and find the writing characteristic
    await peripheral.connectAsync()
    let stuffFound = await peripheral.discoverSomeServicesAndCharacteristicsAsync([],[constants.WRITE_CHAR_UUID])
    if(!stuffFound.characteristics) return;
    if (DEBUG) console.log("Found stuff: " + JSON.stringify(stuffFound, null, 2));

    // Save the Light Strip with Initial State
    let toSave: GoveeLightStrip = {
        uuid,
        name: advertisement.localName,
        model,
        writeCharacteristic: stuffFound.characteristics[0],
        color: constants.INIT_COLOR,
        isWhite: false,
        brightness: constants.INIT_BRIGHTNESS,
        power: constants.INIT_POWER
    };

    // Set initial state
    setInitialState(toSave);
    ledStrips[toSave.uuid] = toSave;

    // Setup Keep Alive for connection
    setInterval(() => {
        sendKeepAlive(toSave);
        if (DEBUG) console.log("sending KEEP ALIVE", toSave.name);
    }, constants.KEEP_ALIVE_INTERVAL_MS);

    // Setup discovery callback
    if(discoveryCallback) discoveryCallback(toSave);

});

noble.on("scanStart", () => {
    if(DEBUG) console.log("Scan Started!");
    if(scanStartCallback) scanStartCallback();
});

noble.on("scanStop", () => {
    if(DEBUG) console.log("Scan Stopped!");
    if(scanStopCallback) scanStopCallback();
});

// expose the debug variable
export const debug = (on: boolean) => DEBUG = on;

export const startDiscovery = async() =>
    await noble.startScanningAsync([], false);

export const stopDiscovery = async() => {
    await noble.stopScanningAsync();
    scanStartCallback = undefined;
    scanStopCallback  = undefined;
}

export const getListOfStrips = () => ledStrips;

// CONTROL RELATED EXPORTS

export const setColorOfStrip = (ledStrip: GoveeLightStrip, newColor: Color, isWhite: boolean): GoveeLightStrip | undefined => {

    if(DEBUG) console.log('Color: #' + colorToHex(newColor) + ', White: ' + isWhite + ', Strip: '+ ledStrip.uuid);

    if(!isValidColor(newColor)) {
        if (DEBUG) console.error('ERROR: INVALID COLOR', newColor);
        // TODO: Make error types
        return;
    }

    ledStrips[ledStrip.uuid] = setLightStripColor(ledStrip, newColor, isWhite);
    return ledStrips[ledStrip.uuid];
}

export const setBrightnessOfStrip = (ledStrip: GoveeLightStrip, newBrightness: number): GoveeLightStrip | undefined => {
    if(!isValidValue(newBrightness)) {
        if (DEBUG) console.error('ERROR: INVALID BRIGHTNESS', newBrightness);
        // TODO: Make error types
        return;
    }

    ledStrips[ledStrip.uuid] = setLightStripBrightness(ledStrip, newBrightness);
    return ledStrips[ledStrip.uuid];
}

export const setPowerOfStrip = (ledStrip: GoveeLightStrip, power: boolean): GoveeLightStrip | undefined => {
    ledStrips[ledStrip.uuid] = setLightStripPower(ledStrip, power);
    return ledStrips[ledStrip.uuid];
}

export const registerScanStart = (callback: Function) => { scanStartCallback = callback };
export const registerScanStop  = (callback: Function) => { scanStopCallback  = callback };
export const registerDiscoveryCallback = (callback: ((ledStrip: GoveeLightStrip) => void)) => { discoveryCallback = callback };

export * from "./goveeLightStrip";
export * from "./color";
