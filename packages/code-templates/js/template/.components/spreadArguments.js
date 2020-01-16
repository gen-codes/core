{{if arguments notEmpty}}
const { {{for argument in arguments}}
{{argument.name}}, 
{{/for}} } = {{{from}}}
{{/if}}