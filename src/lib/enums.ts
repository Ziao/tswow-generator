import { DocumentationModule, Table, TableType } from "../types/documentationModule";

export const extractEnums = (tables: Table[], exported = false) => {
    return (
        tables
            // Only enums
            .filter((t) => t.Type === TableType.Enumeration)
            // Map them to enum strings
            .map((t) => processEnum(t, exported))
    );
};

export const processEnum = (table: Table, exported: boolean) => {
    if (table.Type !== TableType.Enumeration) throw new Error(`Table ${table.Name} is not an enum`);
    if (!table.Fields) throw new Error(`Enum ${table.Name} has no fields`);

    return `${exported ? "export" : ""} enum ${table.Name} {
        ${table.Fields.map((f) => `${f.Name} = ${f.EnumValue},`).join("\n")}
    }`;
};

export const extractAllEnumNames = (modules: DocumentationModule[]) => {
    return modules
        .map((m) => m.Tables.filter((t) => t.Type === TableType.Enumeration))
        .flat()
        .map((t) => t.Name);
};
