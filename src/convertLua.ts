import { ensureDir, readdir, readFile, remove, writeFile } from "fs-extra";
import { fixes } from "./fixes";

// After careful consideration and several attempts, I found that it is exponentially easier to simply convert the lua
// code to javascript and then parse that, than it is to parse the LUA code into an AST and go from there.
// While this code may not be perfect, and certainly won't work for all lua code, it works for the Blizzard API docs.

(async () => {
    const documentationModules: any[] = [];

    const path = "./wow-ui-source/Interface/Addons/Blizzard_APIDocumentationGenerated";
    const apiDocsLuaFiles = await readdir(path);

    for (const file of apiDocsLuaFiles) {
        // We only care about lua files
        if (!file.endsWith(".lua")) continue;

        const module = file.replace("Documentation.lua", "");

        console.log(`Processing ${file}...`);
        let contents = await readFile(`${path}/${file}`, "utf8");

        // Remove useless stuff at the bottom of every file
        contents = contents.replace(/APIDocumentation:AddDocumentationTable\(.*\);?/, "");

        const fixLuaArray = (contents: string, openBracketIndex: number) => {
            let replacedContents = contents;
            if (replacedContents[openBracketIndex] !== "{")
                throw new Error(`No open bracket found at ${openBracketIndex}`);

            // Start traversing characters. We keep track of strings, and those are not counted.
            // When we find a {, we increment the counter. When we find a }, we decrement the counter.
            // When the counter is 0, we've found the closing bracket and can replace it.
            let bracketCounter = 0;
            let inString = false;

            for (let i = openBracketIndex; i < replacedContents.length; i++) {
                // Todo: string check
                if (replacedContents[i] === "{") bracketCounter++;
                if (replacedContents[i] === "}" && bracketCounter > 0) bracketCounter--;
                if (replacedContents[i] === "}" && bracketCounter === 0) {
                    // console.log(`Found closing bracket at ${i}`);
                    // We've found the closing bracket

                    // Replace the first { with [
                    replacedContents =
                        replacedContents.substring(0, openBracketIndex) +
                        "[" +
                        replacedContents.substring(openBracketIndex + 1);

                    // Replace the closing one with ]
                    replacedContents = replacedContents.substring(0, i) + "]" + replacedContents.substring(i + 1);
                    break;
                }
            }

            return replacedContents;
        };

        // Fix arrays of objects
        const openBracketMatches = contents.matchAll(/{\s*{/gi);
        for (const match of openBracketMatches) {
            // console.log(`Found an array at ${match.index}`);
            if (typeof match.index !== "number") throw new Error("No index found (why would this happen?)");
            contents = fixLuaArray(contents, match.index);
        }

        // Fix simple arrays
        contents = contents.replaceAll(/\{\s*([^={}]*)\s\}/gi, "[ $1 ]");

        // Convert all = to :
        contents = contents.replace(/=/g, ":");

        // Fix the now broken first line
        contents = contents.replace(/local .* :\s*/, "export const documentation =");

        // Add the fixes so the files will parse
        if (fixes[module]) contents = fixes[module] + "\n" + contents;

        // Save the file
        await ensureDir("./temp");
        await writeFile(`./temp/${module}.ts`, contents);

        // Try importing it
        try {
            // Base url is this file, so ..
            const { documentation } = await import(`../temp/${module}`);
            if (!documentation.Name) documentation.Name = module;
            documentationModules.push(documentation);
        } catch (e) {
            console.warn((e as Error).message);
        }
    }

    await writeFile("./temp/documentationModules.json", JSON.stringify(documentationModules, null, 4));

    // Delete all the files in temp, except for documentationModules.json
    const tempFiles = await readdir("./temp");
    for (const file of tempFiles) {
        if (file === "_documentationModules.json") continue;
        await remove(`./temp/${file}`);
    }

    console.log("Done!");
})();
