import noble from "@abandonware/noble"
import { GoveeLightStrip } from "./goveeLightStrip"
import { Color, colorToHex, xorColor } from "./color"
import { hexify } from "./util";
import * as constants from "./constants"

enum MessageType {
    Power = 0x01,
    Brightness = 0x04,
    Color = 0x05
}

const sendHexMessage = async (lightStrip: GoveeLightStrip, message: string) =>
{
    await lightStrip.writeCharacteristic.writeAsync(Buffer.from(message, "hex"), false)
}

function assembleMessageWithChecksum(messageType: MessageType, specialByte: number, rgbColor: Color, flag: number, whiteColor: Color) : string
{
    let checksum = constants.CONTROL_PACKET_ID ^ messageType ^ specialByte ^ xorColor(rgbColor) ^ flag ^ xorColor(whiteColor);
    return hexify(constants.CONTROL_PACKET_ID)
        + hexify(messageType)
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
    sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Brightness, newVal, constants.EMPTY_COLOR, 0x0, constants.EMPTY_COLOR))
    lightStrip.brightness = newVal
    return lightStrip
}

export const setLightStripPower = (lightStrip: GoveeLightStrip, newVal: boolean): GoveeLightStrip =>
{
    let flag = newVal ? 1 : 0;
    sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Power, flag, constants.EMPTY_COLOR, 0x0, constants.EMPTY_COLOR))

    lightStrip.power = newVal
    return lightStrip
}

export const setLightStripColor = (lightStrip: GoveeLightStrip, newColor: Color, isWhite: boolean): GoveeLightStrip =>
{
    if(isWhite)
    {
        sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Color, 0x2, constants.EMPTY_COLOR, 0x1, newColor))
    }
    else
    {
        sendHexMessage(lightStrip, assembleMessageWithChecksum(MessageType.Color, 0x2, newColor, 0x0, constants.EMPTY_COLOR))
    }

    lightStrip.color = newColor
    return lightStrip
}

export const sendKeepAlive = (lightStrip: GoveeLightStrip) => {
    sendHexMessage(lightStrip, constants.KEEP_ALIVE_PACKET)
}

export const setInitialState = (lightStrip: GoveeLightStrip) =>
{
    setLightStripColor(lightStrip, constants.INIT_COLOR, true);
    setLightStripBrightness(lightStrip, constants.INIT_BRIGHTNESS);
    setLightStripPower(lightStrip, constants.INIT_POWER);
}