
const cliSchema = [
  {
    name: "Project",
    plural: "Projects",
    properties: {
      type: ["Start new generator", "Install generator"],
      "if(type === 'Start new generator')": {
        create: "Generator"
      },
      // "switch(type)": {
      //   "Start new generator": {
      //     create: "Generator"
      //   }
      // }
    }
  },
  {
    name: "Generator",
    plural: "Generators",
    properties: {
      name: "string!",
      version: {
        default: "1.0.0",
        type: "string",
        validators: [
          /[0-9]+\.[0-9]+\.[0-9]+$/,
          function(data) {
            // check with latest version
            if(data.data.endsWith("beta")) {
              return {
                ...data,
                errors: data.errors.concat(["beta is not allowed"])

              }
            }
            return data
          }
        ]

      },
      persistent: "boolean",
      test: "Tests",
      installExternalPackages: "boolean",
      "if(installExternalPackages)": {
        install: "GeneratorPackages",
        // {
        //   enum: { 
        //     type: "rest",
        //     service: (query) => `https://api.npms.io/v2/search?q=${query}`,
        //     parser: {
        //       item: {
        //         label: "{package.name}@{package.version}",
        //         value: {
        //           link: "{package.links.npm}",
        //           name: "{package.name}",
        //           version: "{package.version}"
        //         }
        //       }
        //     },
        //   },
        //   multiple: true,
        //   onSubmit: function(data) {
        //     // git clone packages into cache
        //   }
        // },
      },
      "if(install)": {
        forkGenerators: "boolean",
      },
      // "if(forkGenerators)": {
      //   selectGenerators: {
      //     enum: "$.install",
      //     onSubmit: function(data) {
      //       // copy to projectPath folder under ./.gen
      //     }
      //   },
      //   trackWithCurrentGit: {
      //     type: "boolean",
      //     onSubmit: function(data) {
      //       // add or remove on .gitignore
      //     }
      //   }
      // },


    }
  },
  {
    name: "RunGenerator",
    plural: "RunGenerators",
    description: "",
    title: "Run an installed generator module",
    properties: {
      name: "InstalledGenerator",
    },
    // events: {
    //   onSubmit: (data)=>{

    //   }
    // }
  },
  {
    name: "InstalledGenerator",
    plural: "InstalledGenerators",
    description: "",
    title: "Find an installed module",
    data: {
      type: "config",
      service: "genModule",
      resultsPath: "dependencies",
      transform: (dependencies)=>{
        const names = Object.keys(dependencies)
        const versions =  Object.values(dependencies)
        return names.map((name,index)=>({name, version: versions[index]}))
      },
      realTime: true,
      search: ["name"]
    },
    properties: {
      _label: "{name}@{version}",
      name: "{name}",
      version: "{version}"
    }
  },
  {
    name: "GeneratorPackage",
    plural: "GeneratorPackages",
    data: {
      type: "rest",
      service: (query) => `https://api.npms.io/v2/search?q=${query}`,
      resultsPath: null,
      
    },
    properties: {
      _label: "{package.name}@{package.version}",
      link: "{package.links.npm}",
      name: "{package.name}",
      version: "{package.version}"
    }
  },
  {
    name: "Test",
    plural: "Tests",
    properties: {
      name: "string",
    }
  }

]

export default cliSchema
