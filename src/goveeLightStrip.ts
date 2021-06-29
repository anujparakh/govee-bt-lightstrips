import { Color } from './color';
import noble from "@abandonware/noble";

export type GoveeLightStrip = {
    uuid: string;
    name: string;
    model: string;
    writeCharacteristic: noble.Characteristic;
    color: Color;
    isWhite: boolean;
    brightness: number;
    power: boolean;
}