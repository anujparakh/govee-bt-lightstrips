# govee-bt-lightstrips
[![npm version](https://badge.fury.io/js/govee-bt-lightstrips.svg)](https://badge.fury.io/js/govee-bt-lightstrips)

Simple Node module used to control Govee Light Strips over BLE.

## Installation

`npm install govee-bt-lightstrips`

## Supported Models

Currently supported and tested models are:
- `H6182` RGB Bluetooth + WiFi TV Backlight LED Strip
- `H6160` RGB Bluetooth + WiFi Waterproof 16.4 ft. LED Strip

Module should probably work with other Govee lightstrip and light bulb models supporting bluetooth. 
Add model strings in the `MODELS` array in the [Constants](src/constants.ts) file.

## Controls

The module can be used to control:

- Power:
  - Turn led strip on or off
- RGB Color
  - Turn led strip to any RGB color using hex
- Tunable White Color
  - Turn led strip to any white color temperature. Uses different LEDs than the RGB.
- Brightness
  - Turn led brightness from 0x0 (off) to 0xFF (255 or 100%)

## Exported Methods

- `debug(on: boolean)`
  - Turn debug mode on/off. Adds debug print statements to help debug.
- `startDiscovery()`
  - Start discovery of bluetooth devices.
- `stopDiscovery()`
  - Stops discovery of bluetooth devices.
- `getListOfStrips(): [GoveeLEDStrip]`
  - Retrieves currently connected list of LED strips
- `setColorOfStrip(ledStrip: GoveeLightStrip, newColor: Color, isWhite: boolean): GoveeLightStrip | undefined`
  - Set the color of the given LED strip to the given color. If isWhite is true, will set to the given white color shade.
  Returns the changed LED strip to keep track of the changes.
- `setBrightnessOfStrip(ledStrip: GoveeLightStrip, newBrightness: number): GoveeLightStrip | undefined`
  - Set the brightness of the given LED Strip to given brightness. Returns the changed LED strip to keep track of the changes.
- `setPowerOfStrip(ledStrip: GoveeLightStrip, power: boolean):  GoveeLightStrip | undefined`
  - Set the power of the given LED Strip. Returns the changed LED strip to keep track of the changes.
- `registerScanStart(callback: Function)`
- `registerScanStop(callback: Function)`
- `registerDiscoveryCallback(callback: ((ledStrip: GoveeLightStrip) => void))`
  - Registers a callback to discovery of any ledStrip. Useful to keep track of all the ledStrips connected.
- `colorToHex(c: Color): string`
  - Converts a Color to a hex string (Helper)
- `hexToColor(s: string): Color`
  - Converts a hex string to a color (Helper)

## Example

```typescript

registerDiscoveryCallback(async (ledStrip) => 
{
  setPowerOfStrip(ledStrip, true); // turn on
  setBrightnessOfStrip(ledStrip, 0xFF); // max brightness
  setColorOfStrip(ledStrip, hexToColor("ff0000"), false); // color to red
  
  // Save instance of ledStrip for further use
  .....
}


// Turn on debug statements
debug(true);

// Start Discovery
startDiscovery()

```

## Types

### GoveeLEDStrip

Stores a Govee LED strip and it's details
- `uuid: string` UUID of the device
- `name: string` Bluetooth advertised name of the device
- `model: string` Model string of the device
- `writeCharacteristic: noble.Characteristic` Write Characteristic of the BLE device
- `color: Color` Current color of the device
- `isWhite: boolean` Is the current color a shade of white
- `brightness: number` Current brightness between 0 and 255
- `power: boolean` Current power state of the device

### Color

Stores a color as the RGB values. Uses helper functions to convert to and from a hex string
- `red: number`
- `green: number`
- `blue: number`

## Credit

The work for reverse engineering the bluetooth protocol wasn't done by me and this was only possible because of [BeauJBurroughs](https://github.com/BeauJBurroughs)'s work [here](https://github.com/BeauJBurroughs/Govee-H6127-Reverse-Engineering)

Also used the shades of white researched and listed [here](https://github.com/chvolkmann/govee_btled)
