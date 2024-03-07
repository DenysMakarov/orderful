import {Builder, parseStringPromise} from 'xml2js';
import {EDIJsonObject, ParsedXmlRoot} from "../types/types";
import NodeCache from "node-cache";

export class Utils {

    public static generateCacheKey(prefix: string, input: string): string {
        return `${prefix}:${input}`;
    }

    public static EDIToJson(input: string): EDIJsonObject {
        const segments = input.trim().split('~');
        const result: EDIJsonObject = {};

        segments.forEach(seg => {
            const segment = seg.trim();
            if (!segment) return; // Skip empty segments

            const elements = segment.split('*');
            const key = elements[0];
            if (!result[key]) {
                result[key] = [];
            }

            const obj: { [key: string]: string } = {};
            elements.slice(1).forEach((value, index) => {
                obj[`${key}${index + 1}`] = value;
            });

            result[key].push(obj);
        });
        return result;
    }

    public static EDIToXML(input: string): string {
        const json = this.EDIToJson(input);
        return this.jsonToXML(json);
    }

    public static jsonToXML(input: EDIJsonObject): string {
        const builder = new Builder({
            headless: true,
            renderOpts: {'pretty': true, 'indent': '    ', 'newline': '\n'}
        });
        const xmlWithoutDeclaration = builder.buildObject(input);
        return `<?xml version="1.0" encoding="UTF-8" ?>\n${xmlWithoutDeclaration}`;
    }

    public static jsonToEDI(input: EDIJsonObject): string {
        return Object.entries(input).flatMap(([segmentKey, segments]) =>
            segments.map(segment =>
                `${segmentKey}*${Object.values(segment).join('*')}`
            )
        ).join('~') + '~';
    }

    private static normalizeToJsonArray(json: { root: ParsedXmlRoot }): void {
        Object.keys(json.root).forEach(key => {
            const property = json.root[key];
            if (typeof property === 'object' && !Array.isArray(property)) {
                json.root[key] = [property];
            }
        });
    }

    public static async xmlToJson(xml: string): Promise<EDIJsonObject> {
        const json = await parseStringPromise(xml, {explicitArray: false});
        this.normalizeToJsonArray(json);
        return json;
    }

    public static async xmlToEDI(xml: string): Promise<string> {
        const json = await parseStringPromise(xml);
        return this.jsonToEDI(json.root);
    }

}

