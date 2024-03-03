export interface EDIJsonObject {
    [key: string]: Array<{ [key: string]: string | string[] }>;
}

// Define the structure of each property within 'root'
export interface RootProperty {
    [key: string]: string | string[];
}

// Define the structure of the 'root' object, which contains dynamically named properties
export interface ParsedXmlRoot {
    [key: string]: RootProperty | RootProperty[];
}
