import {EDIJsonObject} from "../../../types/types";
import {Utils} from "../../../utils";
import NodeCache from "node-cache";

export class ConverterService {

    private static cacheEdi: NodeCache = new NodeCache({stdTTL: 3000});
    private static cacheJson: NodeCache = new NodeCache({stdTTL: 3000});
    private static cacheXml: NodeCache = new NodeCache({stdTTL: 3000});

    public static convertEDIToJson(input: string): EDIJsonObject {
        const cacheKey = Utils.generateCacheKey('EDIToJson', input);
        const cachedResult = this.cacheEdi.get<EDIJsonObject>(cacheKey);

        if (cachedResult) return cachedResult;

        const result: EDIJsonObject = Utils.EDIToJson(input);
        this.cacheEdi.set(cacheKey, result);
        return result;
    }

    public static convertEDIToXml(input: string): string {
        const cacheKey = Utils.generateCacheKey('EDIToXML', input);
        const cachedResult = this.cacheEdi.get<string>(cacheKey);

        if (cachedResult) return cachedResult;

        const result = Utils.EDIToXML(input);
        this.cacheEdi.set(cacheKey, result);
        return result;
    }

    public static convertJsonXML(input: EDIJsonObject): string {
        const cacheKey = Utils.generateCacheKey('jsonToXml', JSON.stringify(input));
        const cachedResult = this.cacheJson.get<string>(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

        const result = Utils.jsonToXML(input);
        this.cacheJson.set(cacheKey, result);
        return result;
    }

    public static convertJsonEDI(input: EDIJsonObject): string {
        const cacheKey = Utils.generateCacheKey('jsonToEDI', JSON.stringify(input));
        const cachedResult = this.cacheJson.get<string>(cacheKey);

        if (cachedResult) return cachedResult;

        const result = Utils.jsonToEDI(input);
        this.cacheJson.set(cacheKey, result);
        return result
    }

    public static async convertXmlToJson(input: string): Promise<EDIJsonObject> {
        const cacheKey = Utils.generateCacheKey('xmlToJson', input);
        const cachedResult = this.cacheXml.get<EDIJsonObject>(cacheKey);

        if (cachedResult) return cachedResult;

        const result = await Utils.xmlToJson(input);
        this.cacheXml.set(cacheKey, result);
        return result;
    }

    public static async convertXmlToEDI(input: string): Promise<string> {
        const cacheKey = Utils.generateCacheKey('xmlToEdi', input);
        const cachedResult = this.cacheXml.get<EDIJsonObject>(cacheKey);

        if (cachedResult) return JSON.stringify(cachedResult);

        const result = await Utils.xmlToEDI(input);
        this.cacheXml.set(cacheKey, result);
        return result;
    }

}


