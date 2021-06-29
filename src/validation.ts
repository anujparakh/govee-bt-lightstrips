import noble from "@abandonware/noble";
import { Color } from "./color";
import * as constants from "./constants"

// TODO: Change to UUID
export const isH6182 = (peripheralName: string) =>
    peripheralName.includes(constants.H6182_MODEL);
export const isH6160 = (peripheralName: string) =>
    peripheralName.includes(constants.H6160_MODEL);

export const isValidPeripheral = (peripheral: noble.Peripheral): string => {
    const { address, advertisement } = peripheral;
    if(!advertisement.localName)
    {
        return "";
    }
    else
    {
        // Check all the models
        for(var model of constants.MODELS)
        {
            if(advertisement.localName.includes(model))
            {
                return model
            }
        }
    }

    return "";
}

export const isValidValue = (x: number): boolean => {
    return (x >= 0 && x <= 0xFF)
}

export const isValidColor = (c: Color): boolean => {
    return isValidValue(c.red) && isValidValue(c.green) && isValidValue(c.blue)
}

