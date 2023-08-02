/** List of all known enums, set by setEnums() */
let enums: string[] | null = null;

/** List of all known constants, set by setConstants() */
let constants: string[] | null = null;

/**
 * List of odd types that need to be converted to something else.
 * Don't put stuff like `string: 'string'` here, that's handled by convertType().
 */
const typeMap: Record<string, string> = {
    textureAtlas: "string",
    table: "Record<string, unknown>",
    bool: "boolean",
    colorRGB: "string", // confirm (probably something like "AARRGGBB")
    luaIndex: "number",
    SimpleTexture: "string", // confirm
    WOWGUID: "string", // confirm
};

/**
 * Set the inner list of enums, so that we can convert them to Enum.EnumName within convertType()
 * This is one of the first things that should be done
 * @param allEnums List of all enum names
 */
export const setEnums = (allEnums: string[]) => (enums = allEnums);

/**
 * Set the inner list of constants, so that we can convert them to Constants.ConstantName within convertType()
 * This is one of the first things that should be done
 * @param allConstants List of all constant names
 */
export const setConstants = (allConstants: string[]) => (constants = allConstants);

/**
 * Convert a type to a typescript type, fixes enums and constants
 * Uses the typeMap to convert odd types that we don't know about
 * @param type Type to convert, e.g. "string", "bool", "table", "EnumName", "ConstantName"
 * @return Converted type to be used during definition generation
 */
export const convertType = (type: string) => {
    if (!enums) throw new Error("Enums not set");
    // if(!constants) throw new Error("Constants not set");

    if (typeMap[type]) return typeMap[type];
    if (enums?.includes(type)) return `Enum.${type}`;
    // if (constants?.includes(type)) return `Constants.${type}`;
    return type;
};
