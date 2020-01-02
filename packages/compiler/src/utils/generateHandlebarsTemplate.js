import transformations from '../transformations';
/* Transforms GenLang syntax to HandleBars-compatible syntax */
export default function generateHandlebarsTemplate(content) {
    /*
      Applies transformations on the compilation process
      according to the transformations.js file
    */
    for(let transform of transformations) {
        /* Replaces regex compatible strings with expression */
        content=content.replace(transform.regex,transform.expression);
        /* If field contains the optional fields, replace too*/
        if(transform.closingRegex) {
            content=content.replace(transform.closingRegex,transform.closingExpression);
        }
    }
    return content;
}
