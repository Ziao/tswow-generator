import { Table, TableType } from "../types/documentationModule";
import { wrapInNamespace } from "./namespaces";
import { convertType } from "./types";

export const extractConstants = (tables: Table[]) => {
    return (
        tables
            // Only constants
            .filter((t) => t.Type === TableType.Constants)
            // Map them to constant strings
            .map((t) => processConstants(t))
    );
};

export const processConstants = (table: Table) => {
    if (table.Type !== TableType.Constants) throw new Error(`Table ${table.Name} is not a constants table`);
    if (!table.Values) throw new Error(`Enum ${table.Name} has no fields`);

    return wrapInNamespace(
        table.Name,
        `
        ${table.Values.map((val) => {
            if (val.Name === undefined) throw new Error(`Constant ${val.Name} has no name`);
            if (val.Type === undefined) throw new Error(`Constant ${val.Name} has no value`);
            // We don't care about value, only type
            // if (val.Value === undefined) throw new Error(`Constant value ${val.Name} has no value`);

            return `const ${val.Name}: ${convertType(val.Type)};`;
        }).join("\n")}`,
        false,
    );
};
