--(
name: element
description: Create a react component with material-ui
attributes:
- ref: Element
)--

// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
{{> materialUIImports imports=materialUIImports}}
{{> useStyles styles=styles}}

export default function {{name}}(props) {
  {{for prop in props}}
  const {
    {{prop.key.replace("!","")}},
    ...restProps
  } = props
  {{/for}}
  const { xsFullWidth, ...restProps } = props;
{{for style in styles}}
  const classes{{upperCase(style.key)}} = use{{upperCase(style.key)}}Styles()
}));
  let classes = {}
{{for state in states}}
  {{> stateAction state=state}}
{{/for}}

  return (
    <MuiButton classes={classes} {...restProps}>
      {props.children}
    </MuiButton>
  );
}
{{if propTypes}}
{{name}}.propTypes = {
{{for prop in propTypes}}
  {{prop.key}}: {{prop.value}},
{{/for}}
};
{{/if}}
{{if default}}
{{name}}.defaultProps = {
  {{for defaultProp in defaultProps}}
    {{defaultProp.key}}: {{toValue(defaultProp.value)}},
  {{/for}}
};
{{/if}}


