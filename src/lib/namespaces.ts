export const wrapInNamespace = (namespace: string, code: string, declare?: boolean) => {
    // return `${declare ? "declare" : ""} namespace ${namespace} {
    return `${declare ? "declare" : ""} namespace ${namespace} {
        ${code}
    }`;
};
