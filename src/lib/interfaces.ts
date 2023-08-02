import { Table, TableType } from "../types/documentationModule";
import { convertType } from "./types";

/**
 * Extracts all interfaces from a list of tables
 * @param tables List of tables to extract interfaces from
 * @return List of interface strings
 */
export const extractInterfaces = (tables: Table[]) => {
    return (
        tables
            // Only interfaces
            .filter((t) => t.Type === TableType.Structure)
            // Map them to interface strings
            .map((t) => processInterface(t))
    );
};

/**
 * Takes in a documentation table and returns a string representation of the resulting typescript interface
 * @param table Table to process
 * @return String representation of the interface
 */
export const processInterface = (table: Table) => {
    if (table.Type !== TableType.Structure) throw new Error(`Table ${table.Name} is not a interface`);
    if (table.Fields === undefined) throw new Error(`Table ${table.Name} has no fields`);

    return `export interface ${table.Name} {
        ${table.Fields.map((field) => {
            if (field.Type === undefined) throw new Error(`Field ${field.Name} has no type`);
            if (field.Name === undefined) throw new Error(`Field ${field.Name} has no name`);

            // todo: documentation, if available
            // todo: inner fields, interface?
            return `${field.Name}: ${convertType(field.Type)};`;
        }).join("\n")}
        
    }`;
};
