export const generateDocumentation = (documentation?: string[]) => {
    if (!documentation) return "";
    return `/**
    * ${documentation.join("\n * ")}
    */\n`;
};
