import { Color } from './color';
import noble from "@abandonware/noble";

export type GoveeLightStrip = {
    uuid: string;
    name: string;
    writeCharacteristic: noble.Characteristic;
    color: Color;
    brightness: number;
    power: boolean;
}