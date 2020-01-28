import transformations from './transformations';
/* Transforms GenLang syntax to HandleBars-compatible syntax */
export default function generateHandlebarsTemplate(content) {
    /*
      Applies transformations on the compilation process
      according to the transformations.js file
    */
    let newContent = content
    for(let transform of transformations) {
        /* Replaces regex compatible strings with expression */
        const matches = []
        let res
        let i = 1
        let closingExpression =transform.closingExpression
        if(closingExpression)
        while((res = transform.regex.exec(newContent))!==null){
          closingExpression = closingExpression.replace(`$${i}`, res[1])
          i++
        }
        newContent=newContent.replace(transform.regex,transform.expression);
        /* If field contains the optional fields, replace too*/

        if(transform.closingRegex) {
          // console.log(transform)

            newContent=newContent
            .replace(transform.closingRegex,closingExpression)
        }
    }
    return newContent;
}
