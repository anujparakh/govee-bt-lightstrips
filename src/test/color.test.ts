import { colorToHex, hexToColor, xorColor } from "../color"


test("xorColor: xor of 0x88 ^ 0x77 ^ 0x66 should be 0x99", () => {
    expect(xorColor({ red: 0x88, green: 0x77, blue: 0x66 })).toBe(0x99)
})

test("xorColor: xor of 0x01 ^ 0x01 ^ 0x01 should be 0x01", () => {
    expect(xorColor({ red: 1, green: 1, blue: 1 })).toBe(1)
})

test("colorToHex: rgb of white should be ffffff", () => {
    expect(colorToHex({red: 255, green: 255, blue: 255})).toBe("ffffff")
})

test("colorToHex: rgb of red: 32, green: 80, blue: 160 should be 2050a0", () => {
    expect(colorToHex({red: 32, green: 80, blue: 160})).toBe("2050a0")
})

describe("testing hexToColor function", () => {
    it("hex of ffffff should be red: 255, green: 255, blue: 255", () => {
        expect(hexToColor("ffffff")).toStrictEqual({red: 255, green: 255, blue: 255})
    })

    it("hex of 2050a0 should be red: 32, green: 80, blue: 160", () => {
        expect(hexToColor("2050a0")).toStrictEqual({red: 32, green: 80, blue: 160})
    })
})
