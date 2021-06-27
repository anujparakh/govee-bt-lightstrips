import { hexify } from "./util";

export type Color = {
    red: number;
    green: number;
    blue: number;

}

export const xorColor = (c: Color): number =>
{
    return c.red ^ c.blue ^ c.green;
}

export const colorToHex = (c: Color): string =>
{
    return hexify(c.red) + hexify(c.green)+ hexify(c.blue)
}

export const hexToColor = (s: string): Color =>
{
    return { red: Number("0x" + s.substring(0,2)), green:  Number("0x" + s.substring(2,4)), blue:  Number("0x" + s.substring(4,6)) }
}