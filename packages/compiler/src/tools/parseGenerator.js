import fs from "fs";
import {listFiles} from "./utils/listFiles";
import generateHandlebarsTemplate from "./generateHandlebarsTemplate"

export function parseGenerator(generatorDirectory) {
  const directories = [
    "schema",
    "template",
    "hooks",
    "helpers"
  ];
  const generatorDir = `${generatorDirectory}/backend/`;
  const generator = directories.filter(dirName => {
    return fs.existsSync(`${generatorDir}${dirName}`);
  })
    .reduce((data, dirName) => {
      const fullPath = `${generatorDir}${dirName}`;
      switch(dirName) {
        case "schema": {
          const models = fs.readdirSync(`${fullPath}`);
          const schema = models
            .filter(model => model.endsWith(".js"))
            .map(model => model.replace(".js", ""))
            .reduce((models, model) => {
              models[model] = require(`${fullPath.replace("./src/", "./")}/${model}`).default;
              return models;
            }, {});
          data.schema = schema;
          break;
        }
        case "template": {
          const templateFiles = listFiles(`${fullPath}/`);
          data.components = {};
          data.files = {};
          data.extensions = {};
          templateFiles.forEach(file => {
            const templateFile = fs.readFileSync(file).toString()
            if(file.includes(".components")) {
              data.components[file.split("/").reverse()[0].replace(/\.[a-z]+$/, "")] = templateFile;
            }
            else if(file.includes(".extensions")) {
              data.extensions[file.split("/").reverse()[0].replace(/\.[a-z]+$/, "")] = templateFile;
            }
            else {
              // console.log("TCL: fullPath", fullPath);
              data.files[file.replace(fullPath.replace("./", "")+"/", "")] = templateFile;
            }
          });
          break;
        }
        case "hooks": {
          const hooksOrder = require(fullPath.replace("./src/", "./")).default;
          data.hooks = {
            order: hooksOrder,
            files: listFiles(fullPath).reduce((files, fileName) => {
              // console.log(fileName.replace("src/", "./"))
              return {
                ...files,
                [`./${fileName}`
                  .replace(`${fullPath}/`, "")
                  .replace(/.[a-zA-Z]+$/, "")]: require(fileName.replace("src/", "./")).default
              };
            }, {})
          };
          break;
        }
        case "helpers": {
          data.helpers = listFiles(fullPath).reduce((files, fileName) => {
              return {
                ...files,
                [`./${fileName}`.replace(`${fullPath}/`, "").replace(/.[a-zA-Z]+$/, "")]: require(fileName.replace("src/", "./")).default
              };
            }, {})

        }
      }
      return data;
    }, {});
  if(fs.existsSync(`${generatorDirectory}/plugins`)) {
    const pluginNames = fs.readdirSync(`${generatorDirectory}/plugins`);
    generator.plugins = pluginNames
      .map(name => `${generatorDirectory}/plugins/${name}`)
      .map(parseGenerator)
      .reduce((genData, gen, index) => {
        genData[pluginNames[index]] = gen;
        return genData;
      }, {});
    // console.log(generator)
  }
  if(fs.existsSync(`${generatorDir}.filetree.js`)) {
    generator.fileTree = require(`${generatorDir.replace("./src", ".")}.filetree.js`).default;
  }
  return generator;
}
