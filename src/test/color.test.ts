import { colorToHex, hexToColor, xorColor } from "../"


describe("testing hexToColor function", () => {
    it("hex of ffffff should be red: 255, green: 255, blue: 255", () => {
        expect(hexToColor("ffffff")).toStrictEqual({red: 255, green: 255, blue: 255})
    })

    it("hex of 2050a0 should be red: 32, green: 80, blue: 160", () => {
        expect(hexToColor("2050a0")).toStrictEqual({red: 32, green: 80, blue: 160})
    })
})
