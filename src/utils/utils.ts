import {Builder, parseStringPromise} from 'xml2js';
import {EDIJsonObject, ParsedXmlRoot} from "../types/types";
import NodeCache from "node-cache";

export class Utils {
    private static cache: NodeCache = new NodeCache({stdTTL: 300});

    private static generateCacheKey(prefix: string, input: string): string {
        return `${prefix}:${input}`;
    }

    public static EDIToJson(input: string): EDIJsonObject {
        const cacheKey = this.generateCacheKey('EDIToJson', input);
        const cachedResult = this.cache.get<EDIJsonObject>(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

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
        this.cache.set(cacheKey, result);
        return result;
    }

    public static EDIToXML(input: string): string {
        const cacheKey = this.generateCacheKey('EDIToXML', input);
        const cachedResult = this.cache.get<string>(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }
        const json = this.EDIToJson(input);
        const xml = this.jsonToXML(json);
        this.cache.set(cacheKey, xml);
        return xml;
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
        const cacheKey = this.generateCacheKey('jsonToEDI', JSON.stringify(input));
        const cachedResult = this.cache.get<string>(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }
        const edi = Object.entries(input).flatMap(([segmentKey, segments]) =>
            segments.map(segment =>
                `${segmentKey}*${Object.values(segment).join('*')}`
            )
        ).join('~') + '~';
        this.cache.set(cacheKey, edi);
        return edi;
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
        const cacheKey = this.generateCacheKey('xmlToJson', xml);
        const cachedResult = this.cache.get<EDIJsonObject>(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

        const json = await parseStringPromise(xml, {explicitArray: false});
        this.normalizeToJsonArray(json);
        this.cache.set(cacheKey, json);
        return json;
    }

    public static async xmlToEDI(xml: string): Promise<string> {
        const json = await parseStringPromise(xml);
        return this.jsonToEDI(json.root);
    }

}

