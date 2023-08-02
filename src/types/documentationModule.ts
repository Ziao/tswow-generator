export interface DocumentationModule {
    Tables: Table[];
    Name: string;
    Type?: DocumentationModuleType;
    Namespace?: string;
    Functions?: Function[];
    Events?: Event[];
}

export interface Event {
    Name: string;
    Type: EventType;
    LiteralName: string;
    Payload?: Payload[];
    Documentation?: string[];
}

export interface Payload {
    Name: string;
    Type: string;
    Nilable: boolean;
    InnerType?: string;
    Mixin?: Mixin;
    Documentation?: string[];
    StrideIndex?: number;
    Default?: boolean;
}

export enum Mixin {
    ColorMixin = "ColorMixin",
    ItemLocationMixin = "ItemLocationMixin",
    ItemTransmogInfoMixin = "ItemTransmogInfoMixin",
    PlayerLocationMixin = "PlayerLocationMixin",
    ReportInfoMixin = "ReportInfoMixin",
    TransmogLocationMixin = "TransmogLocationMixin",
    TransmogPendingInfoMixin = "TransmogPendingInfoMixin",
    Vector2DMixin = "Vector2DMixin",
    Vector3DMixin = "Vector3DMixin",
}

export enum EventType {
    Event = "Event",
}

export interface Function {
    Name: string;
    Type: FunctionType;
    Arguments?: Argument[];
    Returns?: Argument[];
    Documentation?: string[];
}

export interface Argument {
    Name: string;
    Type: string;
    Nilable?: boolean;
    Default?: Default;
    Documentation?: string[];
    Mixin?: Mixin;
    InnerType?: string;
    StrideIndex?: number;
    EnumValue?: number;
}

export type Default = boolean | number | string;

export enum FunctionType {
    Function = "Function",
}

export interface Table {
    Name: string;
    Type: TableType;
    NumValues?: number;
    MinValue?: number;
    MaxValue?: number;
    Fields?: Argument[];
    Values?: Value[];
    Arguments?: PurpleArgument[];
    Documentation?: string[];
}

export interface PurpleArgument {
    Name: string;
    Type: string;
    Nilable: boolean;
}

export enum TableType {
    CallbackType = "CallbackType",
    Constants = "Constants",
    Enumeration = "Enumeration",
    Structure = "Structure",
}

export interface Value {
    Name: string;
    Type: ValueType;
    Value: number;
}

export enum ValueType {
    CalendarGetEventType = "CalendarGetEventType",
    CharCustomizationType = "CharCustomizationType",
    ItemWeaponSubclass = "ItemWeaponSubclass",
    Number = "number",
}

export enum DocumentationModuleType {
    ScriptObject = "ScriptObject",
    System = "System",
}
