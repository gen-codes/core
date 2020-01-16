import jsonQuery from 'json-query';
import generateHandlebarsTemplate from './generateHandlebarsTemplate';
import transformQuery from "./transformQuery";

export default function generateFileContexts(templates, globalContext) {
  
  //console.log(templates,globalContext)
  
  let templatesWithContext = [];
  
  //console.log("templates", templates)
  
  for(let template of templates) {
    
    //console.log("template filename", template.filename); 
    
    /* Optionally search for the helper keyword before the actual query */
    const jsonQueryRegex=/{{[\b\w+\b]*?[\(]?((\b\w+\b)\.(\b\w+\b) in (.*?))[\)]?}}/g;
    const queryResult = jsonQueryRegex.exec(template.filename);
    // console.log(queryResult);

    /* If our query brings forth the marsh */
    if(queryResult) {

      let [_, whole, objName, objField, query]=queryResult; //destructuring
        
      /* Find Context */
      let contexts = jsonQuery(
        transformQuery(query),
        {
          data: globalContext
        }
      ).value;

      /* If jsonQuery brings further results */
      if(contexts) {
        /* Inject context in template */
        const generatedTemplates = contexts.map(context=>{
          return {
            text: template.text,
            context: {
              ...globalContext,
              [objName]: context,
            },
            // Replace filename with the field from the context
            filename: template.filename.replace(whole,`"${context[objField]}"`)
          }
        })
        
        templatesWithContext = templatesWithContext.concat(generatedTemplates)
        
        /* If there are any children, recursively parse the filesystem tree and call for every 
            child the function given the context of its parent 
        */
        if(jsonQueryRegex.exec(template.filename)) {
            templatesWithContext = templatesWithContext.reduce((nestedTemplates,template) => {
                return nestedTemplates.concat(generateFileContexts([template], template.context));
            },[]);
        }
      }
    }
    else {
      templatesWithContext.push({
        ...template,
        context: globalContext
      })
    }
  }
  return templatesWithContext;
}
