import {
  getAst
} from "./getAst";
import * as ts from "typescript";

const code = `
import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@digigov/ui/core/Link';
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';

export interface ButtonStyles {
  /*
  thiis is th e multi
  line root comment
  */
  root: BaseCSSProperties;
  // this is responsive
  responsive: BaseCSSProperties;
}

export const useButtonStyles = makeStyles(theme => ({
  root: {
    fontWeightMedium: 'bolder',
    textTransform: 'none',
  },
  // this is rffsdsk
  responsive: {
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export interface ButtonProps extends Omit<MuiButtonProps, 'classes'> {
  xsFullWidth?: boolean;
  classes?: ButtonStyles & MuiButtonProps['classes'];
  component?: React.ElementType;
}
/* this is a button
*/
export const Button: React.FC<ButtonProps> = ({
  children,
  xsFullWidth,
  ...props
}) => {
  const { responsive, ...buttonClasses } = useButtonStyles(props);
  const classes = useMemo(() => {
    if (xsFullWidth) {
      buttonClasses.root = clsx(buttonClasses.root, responsive);
    }
    return buttonClasses;
  }, [xsFullWidth]);

  return (
    <MuiButton data-testid="button" classes={classes} {...props}>
      {children}
    </MuiButton>
  );
};

Button.defaultProps = {
  color: 'primary',
  variant: 'contained',
  size: 'large',
  xsFullWidth: true,
};

export default Button;

export interface ContinueButtonProps extends ButtonProps {
  label?: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  label = 'Continue',
  ...props
}) => {
  const component = props.type === 'submit' ? 'button' : Link;
  return (
    <Button component={component} {...props}>
      {label}
    </Button>
  );
};
ContinueButton.defaultProps = {
  label: 'primary'
};
`;
export const rules = {
  interfaces: {
    check: "statements[*kind=245]",
    data: {
      _value: [{
        path: "statements[*kind=245]",
        data: {
          name: "name.escapedText",
          props: [{
            path: "members[]",
            data: {
              name: "name.escapedText",
              required: "(questionToken.kind) !== 57",
              type: "type.typeName.escapedText|type.kind:typescriptKind",
              description: "$.comments[end>{name.pos}&pos<={name.end}].value"
            }
          }]
        }
      }]
    }
  },
  components: {
    check: "declarations[*].type.typeName[right][escapedText=FC]",
    data: {
      // v: "declarations[*].type.typeName[right][*escapedText=FC].parent.parent.parent",
      _value: [{
        path: "declarations[*].type.typeName[right][*escapedText=FC].parent.parent.parent",
        data: {
          docstring: "$.comments[end>(={pos}-15)].value",
          name: "name.escapedText",
          args: [{path:"type.typeArguments[*]",data:{
            name: "typeName.escapedText"
          }}]
        }
      }]
    },
  },
  defaultProps: {
    check: "expression.left.name[escapedText=defaultProps]",
    data: {
      _value: [{
        path: "expression.left.name[*escapedText=defaultProps].parent.parent.parent",
        data: {
          name: "expression.left.expression.escapedText",
          obj: "expression.left.name.escapedText",
          props: [{
            path: "expression.right.properties[]",
            data: {
              name: "name.escapedText",
              value: "initializer.text|initializer.kind"
            }
          }]
        }
      }]
    }
  }

}
const helpers = {
  typescriptKind: function(input) {
    console.log("typescript")
    return ts.SyntaxKind[input]
  }
}
export default {
  ast: getAst(code),
  rules,
  getAst,
  code,
  helpers
};