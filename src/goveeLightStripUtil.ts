import noble from "@abandonware/noble"
import { GoveeLightStrip } from "./goveeLightStrip"
import { Color, colorToHex, xorColor } from "./color"
import { hexify } from "./util";

enum MessageType {
    Power = 0x01,
    Brightness = 0x04,
    Color = 0x05
}

let EMPTY_COLOR: Color = {red: 0, green: 0, blue: 0}

export const sendHexMessage = async (lightStrip: GoveeLightStrip, message: string) =>
{
    await lightStrip.writeCharacteristic.writeAsync(Buffer.from(message, "hex"), false)
}

function assembleMessageWithChecksum(messageType: MessageType, specialByte: number, rgbColor: Color, flag: number, whiteColor: Color) : string
{
    let checksum = 0x33 ^ messageType ^ specialByte ^ xorColor(rgbColor) ^ flag ^ xorColor(whiteColor);
    return "33" + hexify(messageType)
        + hexify(specialByte)
        + colorToHex(rgbColor)
        + hexify(flag)
        + colorToHex(whiteColor)
        + "000000000000000000"
        + hexify(checksum)
}

//
// ASSUMING ALL PROVIDED VALUES ARE ALREADY VALIDATED
//

export const setLightStripBrightness = (lightStrip: GoveeLightStrip, newVal: number): GoveeLightStrip =>
{
    sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Brightness, newVal, EMPTY_COLOR, 0x0, EMPTY_COLOR))
    lightStrip.brightness = newVal
    return lightStrip
}

export const setLightStripPower = (lightStrip: GoveeLightStrip, newVal: boolean): GoveeLightStrip =>
{
    let flag = newVal ? 1 : 0;
    sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Power, flag, EMPTY_COLOR, 0x0, EMPTY_COLOR))

    lightStrip.power = newVal
    return lightStrip
}

export const setLightStripColor = (lightStrip: GoveeLightStrip, newColor: Color, isWhite: boolean): GoveeLightStrip =>
{
    if(isWhite)
    {
        sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Color, 0x2, EMPTY_COLOR, 0x1, newColor))
    }
    else
    {
        sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Color, 0x2, newColor, 0x0, EMPTY_COLOR))
    }

    lightStrip.color = newColor
    return lightStrip
}

// INITIAL STATE
let INIT_POWER = true
let INIT_COLOR: Color = {red: 0xFF, green: 0xFF, blue: 0xFF }
let INIT_BRIGHTNESS = 0xFF

export const setInitialState = (lightStrip: GoveeLightStrip) =>
{
    setLightStripColor(lightStrip, INIT_COLOR, true);
    setLightStripBrightness(lightStrip, INIT_BRIGHTNESS);
    setLightStripPower(lightStrip, INIT_POWER);
}