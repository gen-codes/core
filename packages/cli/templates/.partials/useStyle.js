--(
attributes:
  style: Style
)--

const use{{upperCase(style.name)}}Styles = makeStyles(theme => ({
  {{for breakpoint in style.breakpoints}}
  [theme.breakpoints[{{breakpoint}}]]: {
    {{{style.css}}}
  }
  {{/for}}
}));