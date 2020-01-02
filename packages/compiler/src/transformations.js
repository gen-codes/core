/*
regex: searches for the specific string and saves the variables `(.*?)` in an array
expression: replaces specific string with variables `$[index of array]` with handlebars compatible syntax
closingRegex: searches for the end string of the block
closingExpression: replaces end string if the block with HB compatible syntax
example:
  1: {{for name in names}}
    {{name}}
  {{/for}}
  2: {{#each names as |name|}}
    {{name}}
  {{/for}}
  3: {{#each names as |name|}}
    {{name}}
  {{/each}}
*/


export default [
  // {
  //   regex: /{{filter (.*?) in (.*?) if (.*?)}}/g,
  //   expression: `{{#each $2 as |$1|}}{{if $3}}`,
  //   closingRegex: /{{\/filter}}/g,
  //   closingExpression: "{{/if}}{{/each}}"
  // },
  // {
  //   regex: /{{for (.*?) in (.*?)\[(\b\w+\b)(.*?)(\b\w+\b)\]}}/g,
  //   expression: '{{#each "$2[*$3$4$5]" as |$1|}}',
  //   closingRegex: /{{\/for}}/g,
  //   closingExpression: "{{/each}}"
  // },
  // {
  //   regex: /{{for (.*?) in (.*?)\[(\b\w+\b)\]}}/g,
  //   expression: '{{#each "$2[*$3=true]" as |$1|}}',
  //   closingRegex: /{{\/for}}/g,
  //   closingExpression: "{{/each}}"
  // },
  // {
  //   regex: /{{for (.*?),(.*?) in (.*?)}}/g,
  //   expression: "{{#each $3 as |$2 $1|}}",
  //   closingRegex: /{{\/for}}/g,
  //   closingExpression: "{{/each}}"
  // },
  {
    regex: /{{with (.*?)=(.*?)}}/g,
    expression: "{{#with $2 as | $1 |}}"
  },
  {
    regex: /{{for (.*?) in (.*?)}}/g,
    expression: `{{#each $2 "$2.$1" as |$1|}}`,
    closingRegex: /{{\/for}}/g,
    closingExpression: `{{/each}}`
  },
  {
    regex: /{{withObject (.*?) as (.*?)}}/g,
    expression: "{{#withObject $1 as |$2|}}",
    closingRegex: /{{\/withObject}}/g,
    closingExpression: "{{/withObject}}"
  },
  {
    regex: /{{(.*?)\.(.*?) in (.*?)}}/g,
    expression: "{{#each $3 as |$1|}}{{$1.$2}}{{/each}}",
  },
  {
    regex: /{{if (.*?) (\b\w+\b) (.*?)}}/g,
    expression: "{{#custom_if $1 '$2' $3}}",
    closingRegex: /{{\/if}}/g,
    closingExpression: "{{/custom_if}}"
  },
  {
    regex: /{{if (.*?) (\b\w+\b) (.*?) (.*?)}}/g,
    expression: "{{#custom_if $1 '$2' $3}}$4{{/custom_if}}"
  },


  {
    regex: /{{if (.*?) (.*?)}}/g,
    expression: "{{#custom_if $1 '$2'}}",
    closingRegex: /{{\/if}}/g,
    closingExpression: "{{/custom_if}}"
  },
    {
    regex: /{{if (.*?)}}/g,
    expression: "{{#custom_if $1 'exists'}}",
    closingRegex: /{{\/if}}/g,
    closingExpression: "{{/custom_if}}"
  },
  {
    regex: /{{if (.*?)}}(.*?){{\/if}}/g,
    expression: "{{#custom_if $1 'exists'}}$2{{/custom_if}}"
  },
  {
    regex: /{{case "(.*?)" break=(.*?)}}/g,
    expression: "{{#case '$1' break=$2}}",
    closingRegex:/{{\/case}}\n/g,
    closingExpression: "{{/case}}"
  },
  {
    regex: /{{case "(.*?)"}}/g,
    expression: "{{#case '$1' break=true}}",
    closingRegex:/{{\/case}}\n/g,
    closingExpression: "{{/case}}"
  },
  {
    regex: /{{switch (.*?)}}/g,
    expression: "{{#switch $1}}"
  },
  {
    regex: /{{(\b\w+\b)\((.*?),(.*?),(.*?)\)}}/g,
    expression: "{{$1 $2 $3 $4}}"
  },
  {
    regex: /{{(\b\w+\b)\((.*?),(.*?)\)}}/g,
    expression: "{{$1 $2 $3}}"
  },
  {
    regex: /{{(.*?)\((.*?)\)}}/g,
    expression: "{{$1 $2}}"
  },
  {
    regex: /}}\n{{/g,
    expression: "}}{{"
  },
  {
    regex: /\/\/\/\s\s*/g,
    expression: ""
  },
  {
    regex: /{{> (\b\w+\b).(\b\w+\b) (.*?)}}/,
    expression: "{{> $1$2 $3}}"
  },
  {
    regex: /{{(?!else\})([A-z.]*)}}/g,
    expression: '{{{getValue $1 "$1"}}}'
  },
  {
    regex: /{{"(.*?)"}}/g,
    expression: "$1"
  }
];
