import noble from "@abandonware/noble";

const h6182_string = "H6182"; // RGB Bluetooth + WiFi TV Backlight LED Strip

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

