
import {
  getReg,
  regit,
  newLines,
  mergeRegTemplates,
  reverseNewLines,
  getId
} from "./mergeCodeUtils";
const template = `
{{name}}Create(
{{for item in conditions}}
  {{item.name}}="",
{{/for}}
)
`;
const data_1 = {
  name: "bob",
  items: [{ name: "misti" }]
};

const patches = [
  {
    template: `
|model_0_Name|bob||Create(
  |loop(model_0_properties)||item(model_0_properties_0)||model_0_properties_0_name|misti.as||="|model_0_properties_0_default|some||",|endItem(model_0_properties_0)||endLoop(model_0_properties)|
){

}
`
  },
    {
    template: `
|model_0_Name|bob||Create(
  |loop(model_0_properties)||item(model_0_properties_0)||model_0_properties_0_name|misti.as||="|model_0_properties_0_default|some||",|endItem(model_0_properties_0)|
  |item(model_1_properties_1)||model_1_properties_1_name|lost||="|model_1_properties_1_default|lam||",|endItem(model_1_properties_1)||endLoop(model_0_properties)|
){

}
`
  },
  {
    code: `
  bobCreate(
    misti.as="some",
    sdd,
    asds,
    bolo="",
    somenew,
    onemore,
    somespecial,
    last
  ){

  sdsdj
  asdjksd
  kjdskls
  as
  }
  `
  },

  //   {
  //     code: `
  // bobCreate(
  //   misti.as="some",
  //   lost="lafm",
  //   asds,
  //   bolo="",
  //   somenew,
  //   onemore,
  //   somespecial,
  //   last
  // ){

  // sdsdj
  // asdjksd
  // kjdskls
  // as
  // }
  // `
  //   },
//   {
//     template: `
// |model_0_Name|bob||Create(
//   |loop(model_0_properties)||item(model_0_properties_0)||model_0_properties_0_name|misti.as||="|model_0_properties_0_default|some||",|endItem(model_0_properties_0)|
//   |item(model_1_properties_1)||model_1_properties_1_name|lost||="|model_1_properties_1_default|lam||",|endItem(model_1_properties_1)|
//   |item(model_1_properties_2)||model_1_properties_2_name|hst||="|model_1_properties_2_default|lamsaa||",|endItem(model_1_properties_2)||endLoop(model_0_properties)|
// ){

// }
// `
  // }
];

const getMultiGroups = (reg, value) => {
  return value.match(reg).map(v => ({ ...reg.exec(value).groups }));
};
/(?<loop>)(?<item>)(?<name>)(?<value>)(?<condition>)/;
function preRegBlocks(template, blockTypes) {
  return blockTypes.reduce(
    ({ blockIds, template }, type) => {
      console.log(regit(`\\|${type}\\((?<name>.*?)\\)\\|`, "gim"), template);
      const blockGroups = getMultiGroups(
        regit(`\\|${type}\\((?<name>.*?)\\)\\|`, "gim"),
        template
      );
      console.log("blockGroups", blockGroups);
      for (const { name } of blockGroups) {
        const uid = getId();
        console.log(name);
        const start = `start_${type}_${uid}`;
        const end = `end_${type}_${uid}`;
        blockIds = blockIds.concat([start, end]);
        template = template
          .replace(`|${type}(${name})|`, `~${start}~`)
          .replace(regit(`\\|end${type}\\(${name}\\)\\|`, "i"), `~${end}~`);
        // console.log("bTemp", template, `|${type}(${name})|`);
      }

      return {
        blockIds,
        template
      };
    },
    { blockIds: [], template }
  );
}
function getRegForScalar(string) {
  if (!string) {
    return ".*?";
  }
  return `[${string.split("").reduce((regex, char) => {
    if (char.match(/[a-zA-Z0-9]/)) {
      if (!regex.includes("a-zA-Z0-9")) {
        regex += "a-zA-Z0-9";
      }
    } else if (!regex.includes(char)) {
      regex += char;
    }
    return regex;
  }, "")}]*`;
}
function nonEmptyObject(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    if (obj[key] === "") {
      return newObj;
    }
    return {
      ...newObj,
      [key]: obj[key]
    };
  }, {});
}
const merge = patches => {
  const res = patches.reduce(
    (patchData, p) => {
      console.log(p.template);
      if (p.template) {
        const { blockIds, template } = preRegBlocks(p.template, [
          "loop",
          // "if",
          "item"
        ]);
        const dataReg = /\|(?<name>[a-zA-Z0-9_]*)\|(?<value>.*?)\|\|/gim;

        console.log("blockTemplate", template);
        p.template = template;
        // console.log(blockIds);
        const dataGroups = getMultiGroups(dataReg, p.template);
        const templateWithLooseData = dataGroups.reduce(
          (template, data, index) => {
            return template.replace(
              `|${data.name}|${data.value}||`,
              `~${data.name}~`
            );
          },
          p.template
        );
        // console.log("looseTemplate", templateWithLooseData);

        const templateWithBasicGroups = getReg(templateWithLooseData);
        const templateWithData = dataGroups.reduce((template, data, index) => {
          for (let key in patchData.data) {
            patchData[key] += data.value;
          }
          if (!patchData.data[data.name]) {
            patchData.data[data.name] = data.value;
          }
          return template.replace(
            `~${data.name}~`,
            `(?<${data.name}>${getRegForScalar(data.value)})`
          );
        }, templateWithBasicGroups);
        // console.log(templateWithData);
        const templateWithBlocks = blockIds.reduce((template, data, index) => {
          return template.replace(`~${data}~`, `(?<${data}>.*?)`);
        }, templateWithData);
        // console.log(
        //   templateWithBlocks,
        //   // templateWithData,
        //   dataGroups
        //   // dataGroups
        // );
        // return;

        // console.log(templateWithLooseData, templateWithBasicGroups);

        // console.log(templateWithData);
        // console.log("template", getReg(templateWithData || p.code))
        // console.log("groups", getVariables(templateWithData));
        if (patchData.template) {
          console.log(
            "merged",
            mergeRegTemplates(patchData.template, templateWithBlocks)
          );
          patchData.template = mergeRegTemplates(
            patchData.template,
            templateWithBlocks
          );
          console.log("merged", patchData.template);
        } else {
          patchData.template = templateWithBlocks;
        }
        // console.log(patchData);
        return patchData;
      }
      if (p.code) {
        console.log("code:", newLines(p.code), patchData.template);
        // const groups = {}
        const groups = {
          ...regit(patchData.template, "").exec(newLines(p.code))
            .groups
        };
        console.log("sd", groups);
        // for(let key in groups){
        //   if(patchData.data[key]){
        //     patchData.data[key] = patchData.data[key] + groups[key]
        //   }else{
        //     patchData.data[key] =groups[key]

        //   }
        // }
        patchData.data = {
          ...patchData.data,
          ...nonEmptyObject(groups)
        };
        console.log(
          "log1",
          patchData.data
          // regit(newLines(patchData.template), "gmi"),
          // newLines(p.code),
          // patchData,
          // p,
          // newLines(patchData.template),
          // newLines(p.code),

          // {
          //   ...regit(newLines(patchData.template), "gmi").exec(newLines(p.code))
          //     .groups
          // }
        );
      }
      return patchData;
      // let template = false;
      // if (p.template) {
      //   p = p.template;
      //   template = true;
      // } else {
      //   p = p.code;
      // }
      // p = newLines(p);
      // if (template) {
      //   const reg = getReg(p);
      //   if (!patchData.template) {
      //     patchData.template = reg;
      //     return patchData;
      //   }
      //   return {
      //     ...patchData,
      //     template: mergeRegTemplates(patchData.template, reg)
      //   };
      // } else {
      //   for (let key in {
      //     ...regit(patchData.template, "gim").exec(p).groups
      //   }) {
      //   }
      //   const data = { ...regit(patchData.template).exec(p).groups };

      //   patchData.data = {
      //     ...patchData.data,
      //     ...Object.keys(data).reduce((dataExist, key) => {
      //       if (data[key]) {
      //         console.log(key === "endFile");
      //         if (dataExist[key]) {
      //           data[key] = dataExist[key] + data[key];
      //         }
      //         return {
      //           ...dataExist,
      //           [key]: data[key]
      //         };
      //       }
      //       return dataExist;
      //     }, {})
      //   };
      // }
      // return patchData;

      // if (patchData) {
      //   console.log("dataaa", patchData, p);
      //   console.log(regit(patchData).exec(p));
      //   // return diff(patchData, p);
      // }
      // return reg;
    },
    { template: null, data: {} }
  );
  let result = res.template;
  // let key = "startFile";
  // console.log(res.data[key]);
  // console.log(result.replace(regit(`\(\?\<${key}\>.*?\)`), res.data[key]));
  console.log(res.data, res.template);
  // for (let key in res.data) {
  //   // console.log(key, regit(`\(\?<${key}>.*?\)`), res.data[key]);
  //   result = result.replace(regit(`\\(\\?<${key}>.*?\\)`), res.data[key]);
  // }
  // // console.log(res.data, result);

  return reverseNewLines(result.replace(/\(\?\<(.*?)\>.*?\)/gm, ""));
};

console.log(merge(patches));
// const reg1 = getReg(gened_1);
// const reg2 = getReg(gened_2);
// const merged = mergeRegTemplates(reg1, reg2);
// console.log(diff(reg1, changed_1_1),diff(merged, changed_1_1))

// const medReg = reg2.replace(/\(\?\<(.*?)\>.*?\)/gim, "$1");
// console.log(medReg);
// diff(reg1, reg2.replace(/\\/gm, ""));
// diff(reg1, changed_1_1);
// // let source = escapeRegExp(changed_1_1);
// let source = changed_1_1.replace(/\n/gm, "");
// const matchChange = source.match(matchReg);

// console.log(matchChange, source, matchReg);

// const regex = /\/-(.*?)\//gim;
// const coms = gened_1_source.match(regex);
// let i = 0;
// for (let c of coms) {
//   sourceRegex = sourceRegex.replace(c, `(?<prop_${i++}>.*?)`);
// }
// const gened_1_regex = new RegExp(sourceRegex, "gmi");

// console.log(
//   coms,
//   gened_1_regex,
//   changed_1_1.replace(/\n/gm, "").match(gened_1_regex),
//   gened_1_regex.exec(changed_1_1.replace(/\n/gm, "")).groups
// );

