import {regit, escapeRegExp} from "./mergeCodeUtils";
// ((?=min:.*?,)min:(?<property_min>.*?),|(?!min:.*?))
const beforeForBlock = name => `(?<${name}>.*?(`;
const afterForBlock = name => `.*?)*(?:(?<${name}>)))`;
export function getRegexFromTemplate(template) {
  // const afterForBlock = name => `.*?(?<end${name}>.*?))*(?:(?<${name}>.*?)))`;
  // `)*(?:(?<_${forBlock}>.*?))`
  const variableRegex = name =>
    `(?<before_${name}>.*?)(?<${name}>[a-zA-Z0-9_]*)(?<after_${name}>.*?)`;

  const states = [template];
  const replaceWithRegex = replacement => (t, m) => {
    const name = m.replace(/[^a-zA-Z0-9]/g, "_").replace(/__/g, "");
    return t.replace(m, replacement(name));
  };
  const last = arr =>
    arr.slice(-1).reduce(t => {
      return t;
    });
  // console.log(template)
  let matches = template.match(/\{\{(.*?)\}\}/g) || [];
  // console.log(matches)
  states.push(
    template
      .split(regit(matches.map(escapeRegExp).join("|"), "g"))
      .map(escapeRegExp)
      .reduce(
        (t, m, index, arr) => {
          return `${t}${m}${matches[index] ? matches[index] : ""}`;
        },

        ""
      )
  );
  matches = last(states)
    .match(/\{\{for (.*?)\}\}/g) || []
  states.push(
    matches
      .reduce(replaceWithRegex(beforeForBlock), last(states))
  );
  // console.log(last(states));
  matches = last(states)
    .match(/\{\{\/for (.*?)\}\}/g) || []

  states.push(
    matches
      .reduce(replaceWithRegex(afterForBlock), last(states))
  );
  // ((?=min:.*?,)min:(?<property_min>.*?),|(?!min:.*?))

  // console.log("aaaa", last(states).match(/\{\{if (.*?)\}\}/)[1]);
  matches = last(states)
  .match(/\{\{if (.*?)\}\}/g) || []
  states.push(
        matches
        .reverse()
        .reduce((state, i) => {
          const [before, fullAfter] = state.split(i);
          const [middle, after] = fullAfter.split(i.replace("{{", "{{/"));
          const middleReg = middle.replace(/\{\{.*?\}\}/gim, ".*?");
          state = `${before}((?= ${middleReg})${middle}|(?! ${middleReg}))${after}`;
          // console.log(i, state);
          // i = last(states)
          return state;
        }, last(states))
  );
  // console.log("bbbb", last(states));
  matches = last(states)
  .match(/\{\{(.*?)\}\}/g) || []
  states.push(
      matches
      .reduce(replaceWithRegex(variableRegex), last(states))
  );
  const endTemplate = last(states).replace(/[ \n]+/g, "[\\s]*");
  return endTemplate
}
export function getResultsFromCode(reg, code, inFor = false) {
  const endCode = code.replace(/[ \n]+/g, "");
  const endReg = regit(reg, "gmi");
  let result;
  const results = [];
  if(!code) {
    return [];
  }
  while((result = endReg.exec(code)) !== null) {
    if(!result.some((r) => Boolean(r))) {
      break;
    }
    results.push({...result.groups});
  }
  return results.map(result => {
    const forBlocks = Object.keys(result).filter(k => k.startsWith("for"));
    forBlocks.forEach(forBlock => {
      const after = reg.split(beforeForBlock(forBlock))[1];
      let body = after.split(afterForBlock(`_${forBlock}`))[0];
      const bodyWithoutVar = body.replace(/\(\?<.*?>.*?\)/gim, ".*?")
      body = `((?=.*?)(?<before_item_${forBlock}>.*?)${body}|(?<after_item_${forBlock}>.*?)$)`
      // console.log("boddy", body, result[forBlock])
      // const test =
      // (
      //   (
      //     ?=bot:.*?.*?.*?,
      //   )
      //   (
      //     ?<before_item_for_p_in_property_bin>.*?
      //   )bot:
      //   (
      //     ?<before_p>.*?
      //   )(
      //     ?<p>[a-zA-Z0-9_]*
      //   )(
      //     ?<after_p>.*?
      //   ),|(
      //     ?!bot:.*?.*?.*?,
      //     )(
      //       ?<after_item_for_p_in_property_bin>.*?
      //     )
      //   $
      // )/
      const subResults = getResultsFromCode(body, result[forBlock], true);

      result[forBlock] = subResults;
      if(subResults) {
        for(let key in subResults[0]) {
          // console.log(key);
          delete result[key];
        }
      }

    });

    return result;
  });
};


// split by line and by start and end of item in loop
// diff per deeply nested items first goiing outer
