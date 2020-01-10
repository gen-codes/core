--(
name: elementDoc
description: Covers the elements docs
attributes:
- ref: Element
- name: elementLocation
  value: templates[type="element"].file
)--
---
id: {{lowerCase(name)}}
title: {{name}}
---

import {{name}} from '{{templates[type="element"].file}}';

export const Props = props => {
  console.log(props)
  return (
    <div>props</div>
  );
}

## Example

{{for test in tests[0,1]}}
{{test.render}}
{{/for}}
## How to use
```js

import {{name} from 'govgr/components/{{name}}';

{{tests[0].render}}
```


## When to use this component
{{docs.when}}
## How it works
{{docs.how}}

{{for section in docs.customSections}}
## {{section.key}}
{{section.value}}
{{/for}}
