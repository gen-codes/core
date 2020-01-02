export function getSourceContext(context, path, splitter="$") {
  context = JSON.parse(JSON.stringify(context));

  if(Array.isArray(context)) {
    return context.map((item, index) => {
      return getSourceContext(item, `${path}${splitter}${index}${splitter}`);
    });
  }
  else if(typeof (context) === "object") {
    for(let key in context) {
      if(["string", "number", "boolean"].includes(typeof (context[key]))) {
        context[key] = `${path}${splitter}${key}${splitter}`;
      }
      else if(context[key]) {
        context[key] = getSourceContext(context[key], `${path}${splitter}${key}${splitter}`);
      }
    }
  }
  // delete context._flat
  return context;
}
