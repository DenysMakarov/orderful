import {Request, Response, NextFunction} from 'express';
import ApiError from "../../../errors/ApiError";

import Ajv from "ajv";
const ajv = new Ajv();

const schema = {
    "type": "object",
    "additionalProperties": {
        "type": "array",
        "items": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "type": "string" },
                    { "type": "number" }
                ]
            }
        }
    }
};

const validate = ajv.compile(schema);

class Middleware {
    public static validateEDI(req: Request, res: Response, next: NextFunction):void{
        const EDIDoc = req.body;
            // Regular Expression Explanation:
            // ^ - Asserts the start of the string.
            // [^\s~]+ - Matches the segment identifier which cannot contain spaces or '~'.
            // (\*[^*~]+)+ - Matches one or more groups of '*' followed by characters that are not '*' or '~', allowing spaces within values.
            // (?!.*~\s|.*\s~) - Negative lookahead to ensure there are no spaces before or after '~'.
            // (?:~[^\s~]+(\*[^*~]+)+)* - Matches additional segments starting with '~' without spaces in identifiers and values separated by '*' without leading or trailing spaces.
            // ~$ - Ensures the string ends with '~' and there's no space before it.
            const regex = /^[^\s~]+(\*[^*~]+)+(?!.*~\s|.*\s~)(?:~[^\s~]+(\*[^*~]+)+)*~$/;

            if (!regex.test(EDIDoc)) {
                res.status(400).send('Invalid EDI format.');
            }
            next()
    }


    public static validateJSON(req: Request, res: Response, next: NextFunction): void {
            const json = req.body;
            const isValid = validate(json);

            if (!isValid) {
                res.status(400).send('Invalid JSON format.');
            }
             next()
    }
}

export default Middleware;
