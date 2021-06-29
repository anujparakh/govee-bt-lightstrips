import { Color } from "./color";

// ----------------
// Models Supported
// ----------------
// export const H6182_MODEL = "H6182"; // RGB Bluetooth + WiFi TV Backlight LED Strip
export const H6182_MODEL = "TEMP"; // RGB Bluetooth + WiFi TV Backlight LED Strip
export const H6160_MODEL = "H6160"; // RGB Bluetooth + WiFi Waterproof 16.4 ft. LED Strip
export const MODELS = [
    H6182_MODEL,
    H6160_MODEL
]

// -----------------
// General Constants
// -----------------
export const WRITE_CHAR_UUID = "000102030405060708090a0b0c0d2b11" // Fixed writing characteristic for all Govee LED strips
export const EMPTY_COLOR: Color = { red: 0, green: 0, blue: 0 } // Empty placeholder color with RGB = 0
export const KEEP_ALIVE_PACKET = "aa010000000000000000000000000000000000ab" // Packet sent every 2 seconds to keep connection alive
export const KEEP_ALIVE_INTERVAL_MS = 2000
export const CONTROL_PACKET_ID = 0x33

// -------------
// Initial State
// -------------
export const INIT_POWER = true
export const INIT_COLOR: Color = {red: 0xFF, green: 0xFF, blue: 0xFF }
export const INIT_BRIGHTNESS = 0xFF