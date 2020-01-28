import hb from "handlebars";
import {deepValue} from "./utils/deepValue";
import {getSourceContext} from "./utils/getSourceContext";
import {getRegexResults} from "./utils/getRegexResults";
import generateHandlebarsTemplate from "./generateHandlebarsTemplate";
import {getRegexFromTemplate, getResultsFromCode} from "./mergeCode";
import {escapeRegExp} from "./mergeCodeUtils";

const allIds = []
export function compileTemplateFile(node, variables, context, generator, fileName = "", metadataSettings={}) {
  let newContext = {};
  if(node._variables) {
    variables = {...variables, ...node._variables};
    delete node._variables;
  }
  let newNode;
  let templateName = node._template;
  if(node._context) {
    const props = node._context;
    for(let prop in props) {
      if(props[prop].match(/var\((.*?)\)/)) {
        const [, variable] = props[prop].match(/var\((.*?)\)/);
        newContext[prop] = variables[variable];
      }
      else {
        newContext[prop] = deepValue(context, props[prop]);
      }
    }
  }
  // console.log(node._template, Object.keys(generator.components))
  if(generator.components[node._template]) {
    newNode = {
      ...node,
      _template: generator.components[node._template],
      _context: {...newContext, ...context}
    };
  }
  else if(generator.files[node._template]) {
    newNode = {
      ...node,
      _template: generator.files[node._template],
      _context: {...newContext, ...context}
    };
  }
  if(!newNode) {
    newNode = {
      ...node,
      _context: {...newContext, ...context}
    };
  }
  // console.log("compiling", templateName);
  function findClosingBlock(nodes, type) {
    let close = 0
    const closingBlock = nodes.findIndex((item) => {
      if(item.handlebars && item.handlebars.startsWith(type)) {
        close++
        return false
      }
      if(item.handlebars && item.handlebars.startsWith(`/${type}`)) {
        if(close === 0) {
          return true
        } else {
          close--
        }
        return false
      }
    })
    return closingBlock
  }
  function makeTreeForPartials(nodes, blockTypes, partials, prefix = "", affix = "") {
    const tree = []
    let afterBlock = -1
    const blockRegex = new RegExp(blockTypes.join("|"), "gm")
    nodes.forEach((node, index) => {
      let isEmpty = false
      if(afterBlock <= index) {
        let isBlockType = false
        for(const type of blockTypes) {
          if(node.handlebars && node.handlebars.startsWith(type)) {
            isBlockType = true

            const closingBlock = findClosingBlock(nodes.slice(index + 1), type)
            // console.log(nodes.slice(index+1, index+1+closingBlock))
            node.children = nodes.slice(index + 1, index + 1 + closingBlock)

            const [children, newPartials] = makeTreeForPartials(node.children, blockTypes, partials, prefix + node.fullText, `{{/${type}}}${affix}`)
            node.children = children.map(n => {
              const endingBlock = n.handlebars && n.handlebars.match(blockRegex) && `{{/${n.handlebars.match(blockRegex)[0]}}}`
              if(n.startPartial) {
                partials.push({find: n.fullText, replace: `{: ${n.startPartial}:}` + prefix + node.fullText + n.content + `${endingBlock ? endingBlock : ""}{{/${type}}}${affix}` + `{:/ ${n.startPartial}:}`})
              }
              return {
                ...n,
                parent: prefix + node.fullText + n.fullText + `${endingBlock ? endingBlock : ""}{{/${type}}}${affix}`
              }
            }
            )
            partials = newPartials
            if(!node.children.length) {
              isEmpty = true
            }
            // console.log(type, closingBlock, node.children)
            afterBlock = index + closingBlock + 2
          }
        }
        if((node.startPartial || isBlockType) && !isEmpty) {
          tree.push(node)
        }

      }

    })
    return [tree, partials]

  }
  const tree = getRegexResults(/({\:[^=/](?<startPartial>.*?)\:\}(?<content>.*?)\{\:\/(?<endPartial>.*?)\:\})|\{\{(?<handlebars>.*?)\}\}/gms, newNode._template)
  // console.log(JSON.stringify(makeTreeForPartials(tree, ["for", "if", "with"], [])[1], null, 2))
  const positionalPartialsWithContext = makeTreeForPartials(tree, ["for", "if", "with"], [])[1]
  for(const partial of positionalPartialsWithContext) {
    newNode._template = newNode._template.replace(partial.find, partial.replace)
  }
  const mainPositionRegex = /\{\:\=.*?(?<name>[a-z0-9]*)\:\}/gms

  const mainPositions = getRegexResults(mainPositionRegex, newNode._template)
  for(let position of mainPositions) {
    const mainPositionRegexWithContent = new RegExp(`\{\:\=.*?${position.name}.*?\:\}(?<content>.*?)\{\:\/.*?${position.name}.*?\:\}`, "gms")
    const mainPositionsWithContent = getRegexResults(mainPositionRegexWithContent, newNode._template)
    let newPartialContent = ""
    if(mainPositionsWithContent.length) {
      position = {name: position.name, ...mainPositionsWithContent[0]}
      newPartialContent = position.content
    }
    // console.log(newPartialContent)
    const positionedPartialRegex = new RegExp(`\{\:[^=\/].*?${position.name}.*?\:\}(?<content>.*?)\{\:\/.*?${position.name}.*?\:\}`, "gms")
    const positionedPartials = getRegexResults(positionedPartialRegex, newNode._template)
    // console.log(position.name, positionedPartials)
    for(const partialContent of positionedPartials) {
      newPartialContent += partialContent.content
      newNode._template = newNode._template.replace(partialContent.fullText, "")
    }
    newNode._template = newNode._template.replace(position.fullText, newPartialContent)
  }

  let hbExpressions = getRegexResults(/\{\{(?<handlebars>.*?)\}\}/gims, newNode._template)
  let regTemplate = newNode._template
  hbExpressions = hbExpressions.map((expr, index) => {
    const blockType = expr.handlebars.match(/^(for|if|with|case)/)
    if(blockType) {

      const closingBlock = findClosingBlock(hbExpressions.slice(index + 1), blockType[0])
      const id = hashCode(expr.handlebars)
      if(allIds.includes(id)){
        console.log("")
        throw "Same id error"
      }
      allIds.push(id)
      expr._id = id
      hbExpressions[index + closingBlock + 1]._id = id
    } else if(!expr._id) {
      expr._id = hashCode(expr.handlebars)
    }
    return expr
  })
  // console.log(hbExpressions)
  const exprIds = {}
  for(const expr of hbExpressions) {
    const blockType = expr.handlebars.match(/^(for|if|with|case)/)
    if(expr.handlebars.match(/^with|\/with/)) {
      // console.log("match", expr)
      regTemplate = regTemplate.replace(expr.fullText, "")
    } else if(blockType) {
      regTemplate = regTemplate.replace(expr.fullText, `{{${blockType[0]} ${expr._id}}}`)
    } else if(expr.handlebars.startsWith("/")) {
      regTemplate = regTemplate.replace(expr.fullText, `{{${expr.handlebars} ${expr._id}}}`)
    } else {
      regTemplate = regTemplate.replace(expr.fullText, `{{var ${expr._id}}}`)
    }
  }
  // console.log(regTemplate)
  const regexTemplate = getRegexFromTemplate(regTemplate)
  // console.log(regexTemplate)
  // for (const expr of hbExpressions){

  //   console.log(hashCode(expr.handlebars))
  // }
  // console.log(newNode._template)
  // const templateNewlinesReg = newNode._template.split("{{")
  // .map((line,index)=>`${line}(?<afterLine_${index}>.*?$)`).join("")
  const newLineContext = newNode._context
  // newLineContext._regex_item_line = true
  // let newLinesReg = hb.compile(generateHandlebarsTemplate(newNode._template))(newLineContext);

  // newLinesReg = newLinesReg.split("\n").map((l,i)=>
  //   l.match(/\(\?\<item_[0-9]*_line_[0-9]*\>\.\*\?\)/g)?
  //   l:
  //   `${l}(?<line_${i}>.*?)`
  // ).join("\n").replace(/[\n\s]+/gm, "[\\n\\s]*")
  // console.log(newLinesReg)
  const reg_context = newNode._context
  // reg_context._regex = true
  // reg_context._regex_item_line = false

  // let regLinesReg = hb.compile(generateHandlebarsTemplate(newNode._template))(reg_context);
  // console.log(regLinesReg.replace(/[\n\s]+/gm, "[\\n\\s]*"))
  // reg_context._regex = false
  // reg_context._regex_item_line = false
  const inComment = v => `/*${v}*/`
  const metadataOptions = {
    each: {
      before: (id, property, items)=>{
        return `/*start_for_${id} */`
      },
      after: (id, property, items)=>{
        return `/*end_for_${id} */`
      },
      value: (id, text)=>{return text},
      item: {
        before: (id,textId)=>{return inComment("item_"+id+textId)},
        after: (id,textId)=>{return inComment("_item_"+id+textId)},
        value: (id,textId, code)=>{
          // console.log(textId)
          return code
          // .split("\n").join("[\\s\\n]*")
        }
      }
    },
    getValue: {
      before: (itemId, field, item)=>{return `/*${item}_${itemId?itemId:"noid"}_${field}*/`},
      after: (itemId, field, item)=>{return `/*_${item}_${itemId?itemId:"noid"}_${field}*/`},
      value: (itemId, field, text)=>{

        return `(?=${text}(?<doc_${itemId}_${field}_unchanged>${text})|(?!${text})(?<doc_${itemId}_${field}>.*?))`
      }
    }
  }
  // reg_context._metadata = metadataOptions
  let metacode = hb.compile(generateHandlebarsTemplate(newNode._template))(reg_context);
  const codeParts  = metacode.split(/\/\*.*?\*\//g).map(item=>{
    const variable = item.match(/\(\?\=(.*?)\(\?\<.*?\>.*?\)\|\(\?\!.*?\)\(\?\<.*?\>.*?\)\)/)
    if(variable){
      return item
    }
    const text = escapeRegExp(item).split(" ").map((t,i)=>{
      if(t){
        return `(?!${t}(?<text_${i}>.*?))`
      }
      return t
    }).join(" ")
    return text
  })
  console.log(codeParts)

  const code = codeParts.map(item=>{
    const variable = item.match(/\(\?\=(.*?)\(\?\<.*?\>.*?\)\|\(\?\!.*?\)\(\?\<.*?\>.*?\)\)/)
    if(variable){
      return variable[1]
    }
    return item
  }).join("")

  // console.log(code)
  const inlineChange = code.replace("const", "let").split("\n")
  // console.log(inlineChange)
  // codeParts.map(part=>{
  //   inlineChange.findIndex((p, i)=>{
  //     if(p.match(new RegExp(part))){
  //       return true
  //       // console.log("got a match")
  //     }else{
  //       return false
  //       // console.log("no match")
  //     }
  //   })
  // })
  // check if new lines added and not changed content
  // if changed content:
  // check for changes in variables
  // check for changes before/after loop items
  // check for changes in static content =this will find content not in parenthesis (\).*?\()|^.*?\(|\).*?$

//   const newCode = `

//   happy
//   goodBye Author,hello Book,goodBye Publisher,hello Comic,hello Review,goodBye Reviewer,

// // `
//   const regResults = getResultsFromCode(regexTemplate, newCode)

  // console.log("results", JSON.stringify(regResults, null, 2))
  // const mainPositionedPartial = code.match(/\{\:=(?<positionName>.*?)\:\}(.*?)\{\:\/(.*?)\:\}/gims)
  // const positionedPartials = code.match(/\{\:[^=\/](?<positionName>.*?)\:\}(.*?)\{\:\/(.*?)\:\}/gims)
  // code = generator.hooks.order.map(o => generator.hooks.files[o]).reduce((newCode, hook) => {
  //   return hook({filename: fileName, content: newCode}).content;
  // }, code);
  newNode.code = code;
  // console.log(code)
  return newNode;
}
const merge = ()=>{
  // check for new lines regex
  // check for var updates
  // check for item new lines
  // check for text new lines
}
const ids = {}
function hashCode(str) {
  const MD5 = function(d) {var result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase()}; function M(d) {for(var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f} function X(d) {for(var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for(m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _} function V(d) {for(var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _} function Y(d, _) {d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for(var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)} return Array(m, f, r, i)} function md5_cmn(d, _, m, f, r, i) {return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)} function md5_ff(d, _, m, f, r, i, n) {return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)} function md5_gg(d, _, m, f, r, i, n) {return md5_cmn(_ & f | m & ~f, d, _, r, i, n)} function md5_hh(d, _, m, f, r, i, n) {return md5_cmn(_ ^ m ^ f, d, _, r, i, n)} function md5_ii(d, _, m, f, r, i, n) {return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)} function safe_add(d, _) {var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m} function bit_rol(d, _) {return d << _ | d >>> 32 - _}
  let id = MD5(str) + Math.random()*1000
  return id
  // if(ids[id]) {
  //   ids[id]++
  // } else {
  //   ids[id] = 1
  // }

  return `${id}_${ids[id]}`
};
