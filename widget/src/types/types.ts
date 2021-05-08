export interface StringObject {
    [index: string]: string;
}

export interface AnyObject {
    [index: string]: any; // eslint-disable-line
}


export type EventType = {
    type: string;
    value: AnyObject;
}
