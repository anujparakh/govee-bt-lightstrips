import { isValidColor, isValidPeripheral, isValidValue } from "../validation";
import noble from "@abandonware/noble";
import * as constants from "../constants"

describe("test isValidValue function", () => {
    it("should return invalid for isValidValue(-1)", () => {
        expect(isValidValue(-1)).toBe(false)
    })

    it("should return invalid for isValidValue(256)", () => {
        expect(isValidValue(256)).toBe(false)
    })

    it("should return invalid for isValidValue(0)", () => {
        expect(isValidValue(0)).toBe(true)
    })

    it("should return invalid for isValidValue(255)", () => {
        expect(isValidValue(255)).toBe(true)
    })

})

describe("test isValidColor function", () => {
    it("should return invalid for out of range red", () => {
        expect(isValidColor({red: 256, green: 0, blue: 0})).toBe(false)
    })

    it("should return invalid for out of range green", () => {
        expect(isValidColor({red: 0, green: 256, blue: 0})).toBe(false)
    })

    it("should return invalid for out of range blue", () => {
        expect(isValidColor({red: 1, green: 2, blue: 256})).toBe(false)
    })

    it("should return valid for valid color", () => {
        expect(isValidColor({red: 255, green: 0, blue: 0})).toBe(true)
    })

})

describe("test isValidPeripheral", () => {

    it("should return valid for valid model in name", () => {
        expect(isValidPeripheral({ "advertisement": { "localName": constants.H6160_MODEL} } as noble.Peripheral)).toBe(constants.H6160_MODEL)
    })

    it("should return invalid for unsupported model", () => {
        expect(isValidPeripheral({ "advertisement": { "localName": "H1234"} } as noble.Peripheral)).toBe("")
    })

    it("should return invalid for empty model", () => {
        expect(isValidPeripheral({ "advertisement": { "localName": ""} } as noble.Peripheral)).toBe("")
    })

})