function handleSingleFileImports(file) {
    
    const imports = {}
    let importsString = "";

    /* Import Regex patterns declarations */
    /* ES6 Imports
        example: import [Bob , {Zanta, Koko as Kon}] from ["houselib"]; 
        result: $1 = Bob, Zanta, Kon, $2 = houselib
    */
    const regexImportsStatement = /import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s]*([.@\w/_-]+)["'\s]*;?/g;
    let regexImportsStatementResult;

    const regexImportedPackages = /([\w*\n]+),.{(.*?)}/g;
    const regexOtherImports = /([\w*\n ]+)/g;

    /* While there are more imports to include */
    while ((regexImportsStatementResult = regexImportsStatement.exec(file.content)) !== null) {
        
        let defaultImport, otherImports;
        
        /* This is necessary to avoid infinite loops with zero-width matches */
        if (regexImportsStatementResult.index === regexImportsStatement.lastIndex) {
            regex.lastIndex++;
        }

        // console.log(regexImportsStatementResult);
        /* Assign result's values elsewhere to play */
        const [importStatement, importedPackages, packageName] = regexImportsStatementResult;
        
        /* If packageName doesn't exist create it as an empty object */
        if (!imports[packageName]) {
            imports[packageName] = {}
        }

        /* find all the imported packages in case there is default and other */
        const regexImportedPackagesResult = regexImportedPackages.exec(importedPackages)
        /* find default import */ 
        const regexDefaultImportResult = importedPackages.replace(/{[^\)]*}/g, '').match(/(\S+)/g);
        /* find other imports only */
        const regexOtherImportResult = importedPackages.match(/{([^)]+)}/g)

        /*  Check if there are default and other 
            or only default
            or only other
        */
        if (regexImportedPackagesResult) {

            defaultImport = regexImportedPackagesResult[1]
            otherImports = regexImportedPackagesResult[2].split(",")
        } else if (regexDefaultImportResult) {
            defaultImport = regexDefaultImportResult[0]
        } else  {
            otherImports = regexOtherImportResult[0].split(",")
        }
        // console.log(defaultImport)
        // console.log(otherImports)


        /* */
        imports[packageName].default = defaultImport
        if (imports[packageName].other) {
            imports[packageName].other = imports[packageName].other.concat(otherImports)
        } else {
            imports[packageName].other = otherImports
        }

        if (imports[packageName].other) {
            /* I summon the Dark Magician -- Ritual -- 8 Stars */
            function isString(candidate) {
                return (typeof candidate === 'string' || candidate instanceof String)
            }

            function transformToValidImport(importString) {
                return importString.replace("{", "")
                    .replace("}", "")
                    .trim()
            }
            imports[packageName].other = imports[packageName].other.filter(otherImport => isString(otherImport))
                .map(validImport => transformToValidImport(validImport))
                /* This is hacky */
            imports[packageName].other = imports[packageName].other.reduce((finalImportString, validImport) => {
                /* If its indeed a String and it's not already in, push it to our result string object*/
                if (isString(validImport) && !finalImportString.includes(validImport)) {
                    finalImportString.push(validImport)
                }

                return finalImportString
            }, [])
        }
        file.content = file.content.replace(importStatement, "")
    }

    /* An ayto ginei pote functional.. */
    for (let importPackage in imports) {

        let importModules = imports[importPackage]
        importsString = `from "${importPackage}"\n`

        if (importModules.other) {
            importsString = `{${importModules.other.join(", ")}} ${importsString}`
        }

        if (importModules.default) {
            let comma = ""
            if(importModules.other){
                comma = ","
            }
            importsString = `${importModules.default} ${comma}${importsString}`
        }
        importsString = `import ${importsString}`
    }
    // console.log(importsString)

    file.content = importsString + file.content
    return file
}
export default handleSingleFileImports ;