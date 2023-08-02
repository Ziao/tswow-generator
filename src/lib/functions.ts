import { Function, Table, TableType } from "../types/documentationModule";
import { generateDocumentation } from "./documentation";
import { convertType } from "./types";

export const processFunction = (func: Function, declare = false) => {
    // todo: include arguments
    const documentation = generateDocumentation(func.Documentation);

    return `${documentation}${declare ? "declare" : ""} function ${func.Name}(${parseArgs(func)}) : void`;
};

const parseArgs = (func: Function) => {
    if (!func.Arguments) return "";

    return func.Arguments.map((arg) => {
        // todo: default - these can use constants!
        // todo: documentation
        // todo: mixin
        // todo: inner type - interface
        // todo: stride index - wut
        // todo: enumValue - enum

        return `${arg.Name + (arg.Nilable && "?")}: ${convertType(arg.Type)}`;
    }).join(", ");
};
