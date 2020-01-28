export function newLines(str) {
  return str.replace(/\n/gm, "~~~");
}
export function reverseNewLines(str) {
  return str.replace(/~~~/gim, "\n");
}
function getVariables(reg) {
  const varReg = /\(\?<(.*?)>.*?\)/g;
  return reg.match(varReg).map(v => v.replace(varReg, "$1"));
}
export function escapeRegExp(string) {
  return (
    string
      // .replace(/\n/gm, "")
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ); // $& means the whole matched string
}
// const splitters = /([.*+?^${}()|,:"'`=\n[\]\\])/gm;
const splitters = /(["\n,])/gm;
// const splitters = /([,])/gm;
// \|(?![^{]*})
const getId = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
export { getId };
export function getReg(gened) {
  let genedReg = "";
  // console.log(gened);
  const matches = gened.match(splitters);
  // console.log(matches);
  let beforeIndex = 0;
  let slice = escapeRegExp(gened);
  let code = "(?<startFile>.*?)";
  let startSlice = "";
  let i = 0;

  for (let res of matches) {
    const index = slice.indexOf(res);
    startSlice = slice.slice(0, index + res.length - 1);
    slice = slice.slice(index + res.length);
    code += `${startSlice}${res}(?<endprop_${getId()}>.*?)`;
    // console.log(startSlice, index);
  }
  code += "(?<endFile>.*?$)";
  // console.log(code);
  // console.log(genedReg);
  const matchReg = new RegExp(code, "");
  // console.log(matchReg);
  return code;
}
const getGroups = (reg, change) => {
  if (!change) {
    change = reg;
  }
  // console.log("reg", reg, "change", change);
  return new RegExp(reg, "gmi").exec(
    change.replace(/\\([.*+?^${}()=",])/gm, "$1")
  ).groups;
};
const getMultiGroups = (reg, value) => {
  return value.match(reg).map(v => ({ ...reg.exec(value).groups }));
};
const diff = (reg, change) => {
  // console.log("diff", reg, change);
  reg = newLines(reg).replace(/\(\?<(.*?)>(.*?)(\$?)\)/gim, "(?<$1>.*?$3)");
  change = newLines(change).replace(/\\/gim, "");
  const groups = { ...regit(reg, "gim").exec(change).groups };
  const startgroups = { ...regit(reg, "gim").exec(change).groups };
  return getMultiGroups(/\(\?<(?<name>.*?)>.*?\)/gim, reg)
    .map(it => ({ name: it.name, text: groups[it.name] }))
    .reverse()
    .map((item, index, array) => {
      // console.log("b",item.name, item.text);
      let nextItem;
      if (array[index + 1]) {
        nextItem = array[index + 1].name;
      }
      let block = false;
      const blockTypes = ["item", "loop"];
      const blockRegex = blockTypes.reduce((blockRegex, block, index, arr) => {
        blockRegex += `start_${block}_|end_${block}_`;
        if (index !== arr.length - 1) {
          blockRegex += "|";
        }
        return blockRegex;
      }, "");
      // console.log(blockRegex);
      const fullBlockRegex = `\\(?\\??<?(${blockRegex})[a-zA-Z0-9]?>?.*?\\)`;
      const block_id = regit(blockRegex, "gmi").exec(item.name);
      let name = item.name;
      const entries = item.text.match(/\(\?<.*?>.*?\)/gim);
      if (block_id) {
        const fullBlocks = item.text.match(regit(fullBlockRegex, "gmi")) || [];
        let closestBlock;
        if (fullBlocks) {
          closestBlock = fullBlocks
            .reverse()
            .find(i => i && i.match(block_id[0]));
          if (closestBlock) {
            // console.log("close", closestBlock);
            name = /<(.*?)>/.exec(closestBlock)[1];
          }
        }
        // console.log("ttttt", block_id, fullBlocks, name, item.name);
      }
      let replaceReg = regit(`\\(\\?<\(${name}\)>.*?\\)`, "gmi");
      if (!item.text.match(replaceReg)) {
        if (entries && entries.length > 1 && !change.match(nextItem)) {
          const last = entries.reverse()[0].match(/<(.*?)>/)[1];
          // console.log("last", last);

          replaceReg = regit(`\\(\\?<\(${last}\)>.*?\\)`, "gmi");
        }
      }

      const upperPart = item.text
        .replace(replaceReg, "%%%%%%%")
        .split("%%%%%%%");
      if (upperPart.length >= 2) {
        if (nextItem) {
          array[index + 1].text += upperPart[0];
          // console.log("pushed to", index + 1);
          item.text = item.text.replace(upperPart[0], "");
        }
      }
      item.text = item.text.replace(/\(\?<.*?>(.*?)\)/, `(?<${item.name}>$1)`);
      return item;
    })
    .reverse()
    .reduce((newTemplate, r) => {
      return newTemplate.replace(regit(`\\(\\?<${r.name}>.*?\\)`), r.text);
    }, reg);
  // console.log(
  //   "aaaaaaaasddddddddddd",
  //   // reg,

  //   // change,
  //   getMultiGroups(regit(reg, "gim"), change),
  //   getGroups("\\(\\?<(?<name>.*?)>.*?\\)", change),
  //   groups
  //   // reg,

  //   // .reduce(()=>{},{})
  // );
  // console.log(
  //   "ccc",

  // );
  // let entries = item.text.match(/\(\?<.*?>.*?\)/gim);
  // if (entries) {
  //   entries = entries.reverse();

  //   if (item.name.includes("end_loop")) {
  //     console.log("endloop");
  //   }
  //   // if (entries[0].includes("end_loop")) {
  //   // regit(
  //   //   `\\(\\?<(${item.name})>.*?\\)`,
  //   //   "gmi"
  //   // ).exec(entries[0])

  //   //   }
  //   // }
  //   if (entries[0].includes("start_loop")) {
  //     if (item.name.includes("end_loop")) {
  //     }
  //   }
  //   console.log("a", entries, item.name);
  // }
  const initial = getGroups(reg);
  // console.log(Object.keys(initial));

  const next = getGroups(change);
  // console.log(Object.keys(next));
  let patch = {};
  for (let i in initial) {
    if (!initial[i].match(next[i])) {
      patch[i] = next[i];
    }
  }
  // console.log(reg, change);
  return { ...patch };
};
export const mergeRegTemplates = (t1, t2) => {
  // console.log(t1, t2);

  // return diff(t1, t2);
  const patch = diff(t1, t2);
  console.log(patch);
  return patch
  let newRegTemplate = t1;
  console.log("patch", patch);

  // console.log("aaaaaaaaaaaaa",{...regit(t1,"gmi").exec(t2).groups})
  for (let g in patch) {
    if (newRegTemplate) {
      // console.log("p", g, patch[g]);
      newRegTemplate = newRegTemplate.replace(
        regit(`\\(\\?\<${g}\>.*?\\)`),
        patch[g].replace(/\(\?\<(.*?)\>(.*?)\)/, `(?<${g}>$2)`)
      );
    }
    // newRegTemplate && console.log(g, reverseNewLines(newRegTemplate));
  }
  // console.log(
  //   "groups",
  //   getGroups(t2),);
  return newRegTemplate;
  // console.log("patch",patch)
};
export const regit = (reg, args) => {
  try {
    if (args) {
      return new RegExp(reg, args);
    }
    return new RegExp(reg);

  }catch(err){
    for(let i in err){
      console.log(i)
    }
    throw "Regex Error"
  }
};
