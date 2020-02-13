import * as ts from "typescript"
import  { forEachComment }  from 'tsutils/util/util';

export function getAst(src){
  const ast = ts.createSourceFile(
    "x.ts",
    src,
    ts.ScriptTarget.Latest,
     /*setParentNodes*/ false, ts.ScriptKind.TS
  );
    delete ast.parseDiagnostics
  const noParentAst = JSON.parse(JSON.stringify(ast))
  const comments = []
  forEachComment(ast, (_, comment)=>{
    if(comment.kind === 3){
      comment.value = src.substring(comment.pos+2, comment.end-2)
    }else{
      comment.value = src.substring(comment.pos+2, comment.end)
    }
    comments.push(comment)
  })
  return {...noParentAst,comments}
}