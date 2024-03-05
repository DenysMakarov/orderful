export interface EDIJsonObject {
    [key: string]: Array<{ [key: string]: string | string[] }>;
}

export interface RootProperty {
    [key: string]: string | string[];
}

export interface ParsedXmlRoot {
    [key: string]: RootProperty | RootProperty[];
}
