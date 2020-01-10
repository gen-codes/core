--(
  attributes:
    imports: Element.materialUIImports

)--
{{for importPackage in imports}}
import {{importPackage}} from "@material-ui/core/{{importPackage}}"
{{/for}}