--(
attributes:
  styles: Styles
)--
  

{{for style in styles}}
{{> useStyles style=style}}
{{/for}}