const template = `
{{name}}Create(
{{for item in items}}
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
bobCreate(
  misti="",
  middle,
  last
)
`
  },
  {
    code: `
sdsd
bobCreate(
  misti="sad",
  basda,
  middle,
  prelast,
  last
)
`
  },
  {
    template: `
bobCreate(
  misti="",
  middle,
  somenew,
  last
)
`
  },
  {
    template: `
bobCreate(
  misti="",
  somenew,
  onemore,
  last
)
`
  }
  //   {
  //     code: `
  // bobCreate(
  //   misti="",
  //   somenew,
  //   onemore,
  //   somespecial,
  //   last
  // )
  // `
  //   },
  //   {
  //     code: `
  // bobCreate(
  //   misti="",
  //   middle,
  //   somenew,
  //   onemore,
  //   lala,
  //   somespecial,
  //   last
  // )
  // `
  //   },
  //   {
  //     code: `
  // bobCreate(
  //   misti="bad",
  //   middle,
  //   somenew,
  //   onemore,
  //   somespecial,
  //   dflkdlflksdlsd;
  //   last
  // )
  // `
  //   },
  //   {
  //     code: `
  // bobCreate(
  //   misti="",
  //   middle,
  //   somenew,
  //   onemore,
  //   bold,
  //   last
  // )
  //  {
  // sd
  // }
  // sd

  // `
  //   },
];

function newLines(str) {
  return str.replace(/\n/gm, "~~~");
}
function reverseNewLines(str) {
  return str.replace(/~~~/gim, "\n");
}
let id = 0;
function escapeRegExp(string) {
  return (
    string
      // .replace(/\n/gm, "")
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ); // $& means the whole matched string
}
function getReg(gened) {
  let genedReg = "";
  // console.log(gened);
  const matches = gened.match(/([.*+?^${}()=",])/gm);
  // console.log(matches);
  let beforeIndex = 0;
  let slice = escapeRegExp(gened);
  let code = "(?<startFile>.*?)";
  let startSlice = "";
  let i = 0;
  const id = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10);
  for (let res of matches) {
    const index = slice.indexOf(res);
    startSlice = slice.slice(0, index + res.length - 1);
    slice = slice.slice(index + res.length);
    code += `${startSlice}${res}(?<endprop_${id()}>.*?)`;
    // console.log(startSlice, index);
  }
  code += "~~~(?<endFile>.*?$)";
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
  console.log("reg", reg,"change", change);
  return new RegExp(reg, "gmi").exec(
    change.replace(/\\([.*+?^${}()=",])/gm, "$1")
  ).groups;
};
const diff = (reg, change) => {
  // console.log("diff", reg, change);

  const initial = getGroups(reg);

  console.log(Object.keys(initial))
  const next = getGroups(change);
  console.log( Object.keys(next));
  // let patch = {};

  // for (let i in initial) {
  //   if (!initial[i].match(next[i])) {
  //     patch[i] = next[i];
  //   }
  // }
  // // console.log(reg, change);

  // return { ...patch };
};

const mergeRegTemplates = (t1, t2) => {
  // console.log(t1, t2);
  const patch = diff(t1, t2);

  let newRegTemplate = t1;
  // console.log(patch);
  for (let g in patch) {
    if (newRegTemplate) {
      console.log("p", g, patch[g]);
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
const regit = (reg, args) => {
  if (args) {
    return new RegExp(reg, args);
  }
  return new RegExp(reg);
};
const merge = patches => {
  const res = patches.reduce(
    (patchData, p) => {
      let template = false;
      if (p.template) {
        p = p.template;
        template = true;
      } else {
        p = p.code;
      }
      p = newLines(p);
      if (template) {
        const reg = getReg(p);
        if (!patchData.template) {
          patchData.template = reg;
          return patchData;
        }
        return {
          ...patchData,
          template: mergeRegTemplates(patchData.template, reg)
        };
      } else {
        for (let key in {
          ...regit(patchData.template, "gim").exec(p).groups
        }) {
        }
        const data = { ...regit(patchData.template).exec(p).groups };

        patchData.data = {
          ...patchData.data,
          ...Object.keys(data).reduce((dataExist, key) => {
            if (data[key]) {
              console.log(key === "endFile");
              if (dataExist[key]) {
                data[key] = dataExist[key] + data[key];
              }
              return {
                ...dataExist,
                [key]: data[key]
              };
            }
            return dataExist;
          }, {})
        };
      }
      return patchData;

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
  let key = "startFile";
  console.log(res.data[key]);
  console.log(result.replace(regit(`\(\?\<${key}\>.*?\)`), res.data[key]));
  for (let key in res.data) {
    console.log(key, regit(`\(\?<${key}>.*?\)`), res.data[key]);
    result = result.replace(
      regit(`\\(\\?<${key}>\\.\\*\\?.*?\\)`),
      res.data[key]
    );
  }
  console.log(res.data, result);

  return reverseNewLines(result.replace(/\(\?\<(.*?)\>.*?\)/gm, ""));
};

console.log(merge(patches));