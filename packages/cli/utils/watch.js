
function watch(filePath, genFolder=".gen") {
  const filePath = commander.args || "."
  // genFolder = escapeRegexp(genFolder)
  const watcher = chokidar.watch(filePath, {
    ignored: new RegExp(`node_modules|${genFolder}\\/db\\.json|\\.git`),
    persistent: true,
  });
  console.log(filePath)
  db = new Data(path.join(filePath.toString(), `${genFolder}/db.json`))

  watcher
    // .on('add', listener)
    .on('change', onFileChange)
    // .on('unlink', listener)
    .on('error', error => console.error(error))
    .on('ready', () => {
      console.log('Watching for changes');
      const paths = watcher.getWatched()
      let allFiles = {}
      for(const p in paths) {
        allFiles = {
          ...paths[p].reduce((objPath, path) => {
            const filePath = `${p}/${path}`
            if(paths[filePath]) {
              return objPath
            }

            objPath[filePath] = true
            return objPath
          }, {}),
          ...allFiles
        }
      }
      Object.keys(allFiles)
        .sort(f => f.match(new RegExp(`${genFolder}\/templates`)) ? -1 : +1)
        .forEach(processFile)
    });
}

function processFile(filePath) {
  console.log(filePath)
  const File = db.collection("File", FileSchema)
  const Partial = db.collection("Partial")
  const InlinePartial = db.collection("InlinePartial")
  const text = fs.readFileSync(filePath).toString()
  let type = "file"
  if(filePath.includes("/.gen/partials/")) {
    type = "partial"

    const partialName = filePath.match(/\/([^/]+)\.(.+)$/)[1]

    const partial = Partial().findOneOrCreate({
      code: text,
      name: partialName
    })
  } else if(filePath.includes("./gen/templates/")) {
    type = "template"
  }

  if(type === "file") {
    const file = File().findOneOrCreate({path: filePath})
    console.log(file)
    file.text = text
    const inlinePartialYamlResults = getRegexResults(
      /\/\*gen\n((?=id:.*?)id:(?<id>.*?)|)use:(?<use>.*?)\ndata:(?<data>.*?)\*\/((?=.*?\/\/gen)(?<code>.*?\/\/gen)|.*?)/gism,
      text
    )
    if(inlinePartialYamlResults.length) {
      file.hasInlinePartials = true

      const partialResults = inlinePartialYamlResults.map(p => {
        console.log(p.use, p.data)
        const id = p.id && yaml.safeLoad(p.id, "utf8")
        const use = yaml.safeLoad(p.use, "utf8")
        const data = yaml.safeLoad(p.data, "utf8")

        const code = p.code || ""
        let partial
        console.log("oartuaksm ", p)
        if(id) {
          partial = InlinePartial(id)
        } else {
          partial = InlinePartial({use, code, data: data || {}, fullText: p.fullText})
        }
        return partial
      })
      file.partials = partialResults.map(p => p.id)
      for(const partial of partialResults) {
        if(!partial.code) {
          partial.code = hb.compile(Partial().findOne({name: partial.use}).code)(partial.data)

          file.text = file.text.replace(partial.fullText, `/*gen
${yaml.safeDump({id: partial.id, use: partial.use, data: partial.data, }, {skipInvalid: true})}
*/
${partial.code}
//gen
`)
          fs.writeFileSync(file.path, file.text)

        }
      }
    }

  }

}