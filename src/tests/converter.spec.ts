import {Utils} from "../utils";

describe('EDI to JSON Conversion Test Suite', () => {
    it('converts basic EDI string to JSON object correctly', () => {
        const correctEdi = 'ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~';
        const correctJSON = {
            "ProductID": [
                {"ProductID1": "4", "ProductID2": "8", "ProductID3": "15", "ProductID4": "16", "ProductID5": "23"},
                {"ProductID1": "a", "ProductID2": "b", "ProductID3": "c", "ProductID4": "d", "ProductID5": "e"}
            ],
            "AddressID": [
                {"AddressID1": "42", "AddressID2": "108", "AddressID3": "3", "AddressID4": "14"}
            ],
            "ContactID": [
                {"ContactID1": "59", "ContactID2": "26"}
            ]
        };
        expect(Utils.EDIToJson(correctEdi)).toEqual(correctJSON);
    });

    it('handles segments with empty values correctly', () => {
        const input = 'ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~';
        const expectedResult = {
            "ProductID": [
                {"ProductID1": "4", "ProductID2": "8", "ProductID3": "15", "ProductID4": "16", "ProductID5": "23"},
                {"ProductID1": "a", "ProductID2": "b", "ProductID3": "c", "ProductID4": "d", "ProductID5": "e"}
            ]
        };
        expect(Utils.EDIToJson(input)).not.toEqual(expectedResult);
    });

    it('handles empty string input correctly', () => {
        const input = '';
        const expectedResult = {};
        expect(Utils.EDIToJson(input)).toEqual(expectedResult);
    });

    it('handles repeated keys with different values correctly', () => {
        const input = 'ProductID*1*2~ProductID*3*4~AddressID*5~';
        const expectedResult = {
            "ProductID": [
                {"ProductID1": "1", "ProductID2": "2"},
                {"ProductID1": "3", "ProductID2": "4"}
            ],
            "AddressID": [
                {"AddressID1": "5"}
            ]
        };
        expect(Utils.EDIToJson(input)).toEqual(expectedResult);
    });
});

describe('EDI to XML Conversion Test Suite', () => {
    it('converts basic EDI string to XML format correctly', () => {
        const input = 'ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~';
        const expectedResult =
`<?xml version="1.0" encoding="UTF-8" ?>
<root>
    <ProductID>
        <ProductID1>4</ProductID1>
        <ProductID2>8</ProductID2>
        <ProductID3>15</ProductID3>
        <ProductID4>16</ProductID4>
        <ProductID5>23</ProductID5>
    </ProductID>
    <ProductID>
        <ProductID1>a</ProductID1>
        <ProductID2>b</ProductID2>
        <ProductID3>c</ProductID3>
        <ProductID4>d</ProductID4>
        <ProductID5>e</ProductID5>
    </ProductID>
    <AddressID>
        <AddressID1>42</AddressID1>
        <AddressID2>108</AddressID2>
        <AddressID3>3</AddressID3>
        <AddressID4>14</AddressID4>
    </AddressID>
    <ContactID>
        <ContactID1>59</ContactID1>
        <ContactID2>26</ContactID2>
    </ContactID>
</root>`.trim();
        expect(Utils.EDIToXML(input)).toBe(expectedResult);
    });

    it('handles empty EDI string correctly, returning an empty root element', () => {
        const input = '';
        const expectedResult = `<?xml version="1.0" encoding="UTF-8" ?>
<root/>
`.trim(); // Adjust this based on whether your method uses self-closing tags
        expect(Utils.EDIToXML(input)).toBe(expectedResult);
    });

    it('correctly converts a single segment EDI string to XML format', () => {
        const input = 'ContactID*59*26~';
        const expectedResult = `<?xml version="1.0" encoding="UTF-8" ?>
<ContactID>
    <ContactID1>59</ContactID1>
    <ContactID2>26</ContactID2>
</ContactID>`.trim();
        expect(Utils.EDIToXML(input)).toBe(expectedResult);
    });

    it('correctly converts a single segment EDI string to XML format', () => {
        const input = 'ContactID*59*26~';
        const expectedResult = `<?xml version="1.0" encoding="UTF-8" ?>
<ContactID>
    <ContactID1>59</ContactID1>
    <ContactID2>26</ContactID2>
    <ContactID2>26</ContactID2>
    <ContactID2>26</ContactID2>
</ContactID>`.trim();
        expect(Utils.EDIToXML(input)).not.toBe(expectedResult);
    });
});

describe('jsonToXML Functionality', () => {
    it('converts basic JSON object to XML string correctly', () => {
        const input = {
            ProductID: [
                { ProductID1: "4", ProductID2: "8" }
            ]
        };

        const expectedResult =
`<?xml version="1.0" encoding="UTF-8" ?>
<ProductID>
    <ProductID1>4</ProductID1>
    <ProductID2>8</ProductID2>
</ProductID>`.trim();
        const incorrectResult =
            `<?xml version="1.0" encoding="UTF-8" ?>
<ProductID>
    <ProductID1>4</ProductID1>
    <ProductID2>8</ProductID2>
    <ProductID2>8</ProductID2>
    <ProductID2>8</ProductID2>
</ProductID>`.trim();
        expect(Utils.jsonToXML(input)).toBe(expectedResult);
        expect(Utils.jsonToXML(input)).not.toBe(incorrectResult);
    });
});

describe('jsonToEDI Functionality', () => {
    it('converts basic JSON object to EDI string correctly', () => {
        const input = {
            "ProductID": [{"ProductID1": "4", "ProductID2": "8"}]
        };
        const expectedResult = "ProductID*4*8~";
        expect(Utils.jsonToEDI(input)).toBe(expectedResult);
    });

    it('handles segments with empty values correctly', () => {
        const input = {
            "ProductID": [{"ProductID1": "", "ProductID2": ""}]
        };
        const expectedResult = "ProductID**~";
        expect(Utils.jsonToEDI(input)).toBe(expectedResult);
    });

    it('converts multiple segments and values correctly', () => {
        const input = {
            "ProductID": [{"ProductID1": "4", "ProductID2": "8"}],
            "Order": [{"Order1": "123", "Order2": "456"}]
        };
        const expectedResult = "ProductID*4*8~Order*123*456~";
        expect(Utils.jsonToEDI(input)).toBe(expectedResult);
    });

});

describe('xmlTojson Functionality', () => {
    it('converts single nodes into arrays for consistency', async () => {
        const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<root>
    <ContactID>
        <ContactID1>59</ContactID1>
        <ContactID2>26</ContactID2>
    </ContactID>
</root>`;

        const expectedResult = {
            root: { // Adjusted to include the root object
                "ContactID": [
                    {
                        "ContactID1": "59",
                        "ContactID2": "26"
                    }
                ]
            }
        };

        const incorrectResult_1 = {
            root: { // Adjusted to include the root object
                "ContactID": [
                    {
                        "ContactID1": "59",
                        "ContactID2": "26",
                        "ContactID32": "6",
                    }
                ]
            }
        };

        const incorrectResult_2 = {
            root: { // Adjusted to include the root object
                "ContactID":
                    {
                        "ContactID1": "59",
                        "ContactID2": "26",
                        "ContactID32": "6",
                    }
            }
        };

        await expect(Utils.xmlToJson(xml)).resolves.toEqual(expectedResult);
        await expect(Utils.xmlToJson(xml)).resolves.not.toEqual(incorrectResult_1);
        await expect(Utils.xmlToJson(xml)).resolves.not.toEqual(incorrectResult_2);
    });
});




