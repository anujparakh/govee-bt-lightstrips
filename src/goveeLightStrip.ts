import { Color } from './color';

export type GoveeLightStrip = {
    uuid: string;
    name: string;
    color: Color;
    brightness: number;
    power: boolean;
}