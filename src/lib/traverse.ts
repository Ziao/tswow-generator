import { readdir, stat } from "fs-extra";

/**
 * Traverse a folder and call a callback for each file, recursively.
 * @param folderPath
 * @param callback
 */
export const traverseFolder = async (folderPath: string, callback: (filePath: string) => void | Promise<void>) => {
    const files = await readdir(folderPath);
    for (const file of files) {
        const filePath = `${folderPath}/${file}`;
        const stats = await stat(filePath);
        if (stats.isDirectory()) {
            await traverseFolder(filePath, callback);
        } else {
            await callback(filePath);
        }
    }
};
