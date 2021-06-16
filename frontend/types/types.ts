export interface StringObject {
    [index: string]: string;
}

export interface AnyObject {
    [index: string]: any; // eslint-disable-line
}

export type EventType = {
    type: string;
    value: AnyObject;
};

export type ConversationType = {
    id: string;
    avatarUrl: string;
    name: string;
    lastMessage: string;
    date: Date;
};

export enum FeatureTypeEnum {
    NEWSLETTER = "newsletter",
    TESTIMONIAL = "testimonial",
    APPOINTMENT = "appointment",
    KNOWLEDGE = "knowledge",
    PROPERTY = "property",
}

export type FeatureType = {
    id: string;
    type: FeatureTypeEnum;
    label: string;
};

export type OperatorType = {
    id: string;
    avatarUrl: string;
    name: string;
    active: boolean;
};

export type MessageType = {
    id: string;
    avatarUrl: string;
    name: string;
    message: string;
    isOperator: boolean;
    date: Date;
};

export enum ProfileRowEnum {
    EMAIL = "email",
    PHONE = "phone",
    ADDRESS = "address",
    TIMEZONE = "timezone",
    WECHAT = "wechat",
}

export type ProfileRowType = {
    type: ProfileRowEnum;
    title: string;
    value: string;
};

export enum SidebarMenuEnum {
    CHAT = "chat",
    CALENDAR = "calendar",
    CONTACT = "contact",
    PROPERTY = "property",
    BUILD = "build",
    AGENT = "agent",
    ANALYTIC = "analytic",
    SETTING = "setting",
    NOTIFICATION = "notification",
    PROFILE = "profile",
}
