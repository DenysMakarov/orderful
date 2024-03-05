import express from "express";
import {ConverterController} from "../controllers/converter.controller";

import Router from 'express';
import Middleware from "../middleware";

const router = Router();

/**
 * @openapi
 * /convert/edi/json:
 *   post:
 *     summary: "Convert EDI to JSON"
 *     description: "Accepts EDI text and converts it to a JSON structure."
 *     tags:
 *       - Conversion
 *     requestBody:
 *       description: "EDI text to be converted"
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~
 *     responses:
 *       200:
 *         description: "Successfully converted the EDI to JSON."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {
 *     "ProductID": [
 *         {
 *             "ProductID1": "4",
 *             "ProductID2": "8",
 *             "ProductID3": "15",
 *             "ProductID4": "16",
 *             "ProductID5": "23"
 *         },
 *         {
 *             "ProductID1": "a",
 *             "ProductID2": "b",
 *             "ProductID3": "c",
 *             "ProductID4": "d",
 *             "ProductID5": "e"
 *         }
 *     ],
 *     "AddressID": [
 *         {
 *             "AddressID1": "42",
 *             "AddressID2": "108",
 *             "AddressID3": "3",
 *             "AddressID4": "14"
 *         }
 *     ],
 *     "ContactID": [
 *         {
 *             "ContactID1": "59",
 *             "ContactID2": "26"
 *         }
 *     ]
 * }
 *       400:
 *         description: "There was something wrong with the EDI text provided."
 */
router.post('/convert/edi/json', express.text(), Middleware.validateEDI, ConverterController.convertDocumentEDIToJson)


router.post('/convert/edi/xml', express.text(), Middleware.validateEDI, ConverterController.convertDocumentEDIToXML)
router.post('/convert/json/xml', Middleware.validateJSON, ConverterController.convertDocumentJsonToXML)
router.post('/convert/json/edi', Middleware.validateJSON, ConverterController.convertDocumentJsonToEDI)
router.post('/convert/xml/json', express.raw({type: 'application/xml'}), ConverterController.convertDocumentXMLToJson)
router.post('/convert/xml/edi', express.raw({type: 'application/xml'}), ConverterController.convertDocumentXMLToEDI)

export default router;

