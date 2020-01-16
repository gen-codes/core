# @gen-codes/cli

This package is the console interface of gen.codes metaprogramming framework.

## Features

- Use publicly available code generators
- Create code generators

## Install 
```bash
$ npm i -g @gen-codes/cli
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
### Partial Templates
### Extension Templates
### Template helpers
### Custom Syntax
regex transformations
## Extending and combining generators

### Data rules

### Hooks
### Comma
### Loops
filters
### Conditionals
### String Modifiers
### Custom Helpers
Create the folder helpers where the templates folder is.
Create a file and export a js function. The handlebars 
### Partials