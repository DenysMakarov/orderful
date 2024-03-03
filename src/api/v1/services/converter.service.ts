import {EDIJsonObject} from "../../../types/types";
import {Utils} from "../../../utils";

 export class ConverterService {
    public static convertEDIToJson (input: string): EDIJsonObject {
        return Utils.EDIToJson(input);
    }

     public static convertEDIToXml (input: string): string {
         return Utils.EDIToXML(input);
     }

     public static convertJsonXML (input: EDIJsonObject): string {
         return Utils.jsonToXML(input);
     }

     public static convertJsonEDI (input: EDIJsonObject): string {
         return Utils.jsonToEDI(input);
     }

     public static async convertXmlToJson (input: string): Promise<EDIJsonObject> {
         return await Utils.xmlToJson(input);
     }

     public static async convertXmlToEDI (input: string): Promise<any> {
         return await Utils.xmlToEDI(input);
     }

}


