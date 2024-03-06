import {NextFunction, Request, Response} from "express";
import {ConverterService} from "../services/converter.service";
import ApiError from "../../../errors/ApiError";


export class ConverterController {

    public static convertDocumentEDIToJson(req: Request, res: Response, next: NextFunction): void {
        try {
            const EDIDoc = req.body;
            const doc = ConverterService.convertEDIToJson(EDIDoc);
            res.status(200).json(doc);
        } catch (e) {
            next(ApiError.serverError('Failed to convert EDI to JSON'))
            return;
        }
    }

    public static convertDocumentEDIToXML(req: Request, res: Response, next: NextFunction): void {
        try {
            const EDIDoc = req.body;
            const doc = ConverterService.convertEDIToXml(EDIDoc);
            res.type('application/xml');
            res.status(200).send(doc);
        } catch (e) {
            next(ApiError.serverError('Failed to convert EDI to XML'))
        }
    }


    public static convertDocumentJsonToXML(req: Request, res: Response, next: NextFunction): void {
        try {
            const jsonInput = req.body;
            const doc = ConverterService.convertJsonXML(jsonInput);
            res.type('application/xml');
            res.status(200).send(doc);
        } catch (e) {
            next(ApiError.serverError('Failed to convert JSON to XML'))
        }
    }

    public static  convertDocumentJsonToEDI(req: Request, res: Response, next: NextFunction): void {
        try {
            const xmpInput = req.body;
            const doc = ConverterService.convertJsonEDI(xmpInput);
            res.type('application/text');
            res.status(200).send(doc);
        } catch (e) {
            next(ApiError.serverError('Failed to convert JSON to EDI'))
        }
    }


    public static async convertDocumentXMLToJson(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const xmlInput = req.body;
            const {root} = await ConverterService.convertXmlToJson(xmlInput);
            res.status(200).json(root);
        } catch (e) {
            next(ApiError.serverError('Failed to convert XML to JSON'))
        }
    }

    public static async convertDocumentXMLToEDI(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const xmlInput = req.body;
            const doc = await ConverterService.convertXmlToEDI(xmlInput);
            res.type('application/text');
            res.status(200).send(doc);
        } catch (e) {
            next(ApiError.serverError('Failed to convert XML to EDI'))
        }
    }


}


