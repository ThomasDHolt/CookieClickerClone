import { describe, expect, test} from "vitest";
import { CheckNumberSize, FlipString, FormatNumber } from "../string.js";

describe("FlipString function tests", () => {
    test("Flip the string 'Thomas'", () => {
        const result = FlipString("Thomas");
        const expected = "samohT";
        expect(result).toBe(expected);
    });
});

describe("FormatNumber function tests", () => {
    test("Format 1021", () => {
        const result = FormatNumber(1021);
        const expected = "1.021 thousand";
        expect(result).toBe(expected);
    });
    test("Format 12534718", () => {
        const result = FormatNumber(12534718);
        const expected = "12.534 million";
        expect(result).toBe(expected);
    })
});

describe("CheckNumberSize function tests", () => {
    test("Check size of 1021", () => {
        const result = CheckNumberSize(["1", "021"]);
        const expected = "thousand";
        expect(result).toBe(expected);
    });
    test("Check size of 12345716", () => {
        const result = CheckNumberSize(["12", "345", "716"]);
        const expected = "million";
        expect(result).toBe(expected);
    })
})