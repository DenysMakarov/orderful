import express from "express";
import {ConverterController} from "../controllers/converter.controller";

import Router from 'express';
import Middleware from "../middleware";
const router = Router();

router.post('/convert/edi/json', express.text(), Middleware.validateEDI, ConverterController.convertDocumentEDIToJson)
router.post('/convert/edi/xml', express.text(), Middleware.validateEDI, ConverterController.convertDocumentEDIToXML)
router.post('/convert/json/xml', Middleware.validateJSON, ConverterController.convertDocumentJsonToXML)
router.post('/convert/json/edi', Middleware.validateJSON, ConverterController.convertDocumentJsonToEDI)
router.post('/convert/xml/json', express.raw({ type: 'application/xml' }), ConverterController.convertDocumentXMLToJson)
router.post('/convert/xml/edi', express.raw({ type: 'application/xml' }), ConverterController.convertDocumentXMLToEDI)

export default router;

