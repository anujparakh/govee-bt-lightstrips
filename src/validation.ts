import noble from "@abandonware/noble";
import { Color } from "./color";

const h6182_string = "H6182_7A56"; // RGB Bluetooth + WiFi TV Backlight LED Strip

// TODO: Change to UUID
export const isH6182 = (peripheralName: string) =>
    peripheralName.includes(h6182_string);

export const isValidPeripheral = (peripheral: noble.Peripheral) => {
    const { address, advertisement } = peripheral;
    if(!advertisement.localName)
    {
        return false;
    }

    return (advertisement.localName.includes(h6182_string))
}

export const isValidValue = (x: number): boolean => {
    return (x >= 0 && x <= 0xFF)
}

export const isValidColor = (c: Color): boolean => {
    return isValidValue(c.red) && isValidValue(c.green) && isValidValue(c.blue)
}

