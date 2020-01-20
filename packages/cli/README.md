# @gen-codes/cli

This package is the console interface of gen.codes metaprogramming framework.

## Features

- Use publicly available code generators
- Create code generators

## Install 
```bash
$ npm i -g @gen-codes/cli
```
## Run
### Generate a module's file
```bash
$ gen run -t @gen-codes/react/componentDoc.js
```
Choose the location where the generated file will be saved.
Then fill in the form with the required data.
### Generate based on a module schema model
```bash
$ gen run -m @gen-codes/react/component
```
This will bring a dialog to choose the location where associated files will be saved.
After that input the required data.
### Generate using a project filetree.
```bash
# from local filetree
$ gen run -f ./gen.filetree.json
# or from a published project module
$ gen run -f @gen-codes/mern-app
```


## Embed it on a project

Navigate to your project root folder you want to bootstrap with gen.codes and run:
```bash
$ gen init . 
```
This will open a form that will guide you through the configuration.

The folders `.gen/templates`, `.gen/templates/.partials` and `.gen/schema` will be created. The `schema` folder contains the data structure, restrictions and automations.
The `templates` folder contains files with template code dependent on schema models and custom inputs.


### Install generators
You can install generators from repo.gen.codes
```bash
# locally if initialized
$ gen install @gen-codes/react @digigov/material-ui 
# globally
$ gen install -g @gen-codes/react @digigov/material-ui 
```
You can also search and install
```bash
$ gen search
```
This will bring up the search and install interface



## Generating
Generate based on a known <generator_name>

    gen run <generator_name>
if the generator doesn't exist locally it will try to fetch it from
gen-codes store.

To choose from installed generators run:

    gen run


## Creating generators

### Module dependencies

    gen install <module_name>

### Javascript dependencies

    gen npm install <dependency_name>

### File Templates
Any file you create in the `templates` folder is a file template.
You can specify information and the required arguments in the head of the file using
this syntax:
```
--(
name: element
description: Create a react component with material-ui
attributes:
- ref: Element
)--
```
### Partial Templates
Create a folder `template/.partials` and add the code you want to reuse.
You can call a partial from a file template using this syntax:
```
{> partial-name arg1=data1 arg2=data2}
```
### Extension Templates
You must specify a hook in the original template file using this syntax:
```
{>= extend-config}
```
and then on the plugin or connector create the folder `template/.extensions`. In this folder create a file with name `extend-config` and 
add the code which extends the original template file.
### Filetree Templates
example
```js
export default {
  _variables: {
    mainClientFile: "client/main.js",
    mainServerFile: "server/server.js",
    webpackServerConfig: "webpack.config.server.js",
    webpackClientConfig: "webpack.config.client.js"
  },
  "{{app.name}}":{

    server: {
      models: {
        "{{model.name in app.models[]}}.model.js": {
          _template: "mongooseSchema"
        }
      },
      helpers: {
        "{{helper.name in app.helpers}}.js":{
          _template: "javascript/function"
        }
      },
      routes: {
        "{{model.name in app.models[]}}.routes.js": {
          _template: "routes",
          _context: {
            routes: "model.routes",
            prefix: "model.name"
          }
        }
      },
      "devBundle.js": {
        _template: "devBundle",
        _context: {
          webpackClientConfig: "var(webpackClientConfig)"
        }
      },
      "server.js": {
        _template: "server.js"
      }

    },
    ".babelrc": {
      _template: "babelrc",
    },
    "nodemon.json": {
      _template: "nodemon",
      _context: {
        webpackServerConfig: "var(webpackServerConfig)"
      }
    },
    "var(webpackClientConfig)": {
      _template: "config.client",
      _context: {
        mainFile: "var(mainClientFile)"
      }
    },
    "webpack.config.client.production.js": {
      _template: "config.client.production",
      _context: {
        mainFile: "var(mainClientFile)"
      }
    },
    "var(webpackServerConfig)": {
      _template: "config.server",
      _context: {
        mainFile: "var(mainServerFile)"
      }
    }
  }
}
```
### Template helpers
Create a template helper function in the `helpers` folder.
You can't export default. Only named exports is allowed.
```js
export function helperName(arg1,arg2){
  // do something with args
  return something
}
```
### Custom Syntax
You can add a custom template syntax by specifying a regex transformation.
Create a `.transformations.js` file and export an array with objects like this:
```js
{
  regex: /{{for (.*?) in (.*?)}}/g,
  expression: `{{#each $2 "$2.$1" as |$1|}}`,
  closingRegex: /{{\/for}}/g,
  closingExpression: `{{/each}}`
}
```
The expression must be a handlebars expression.
## Extending and combining generators
To combine a generator create a connector.

### Data rules

### Hooks
You can run custom transformations after the code has been generated.
For example you mhy want to run a linter or a beautifier.
Create the folder `hooks` and the file `index.js` where you export 
the order in which the hooks will run. The create files named after 
the the hooks before. From there export a default function that takes as input the code and returns the transformed code or throws an error.
### Loops
You can loop a filtered array using the syntax that `json-query` npm package uses.
Example: 
```
{{for model in models[type='Account']}}
const {{model.name}} = new Account()
{{/for}}
```
### Conditionals
You can use normal javascript in if statements like below:
```
{{if model.type === 'Account' && model.name.startsWith('admin')}}
//{{model.name}} is an admin account
{{/if}}
```