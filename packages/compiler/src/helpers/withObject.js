
export default {
  withObject(context, options) {
    let fn = options.fn;
      const queryRegex = /([0-9]+)\.([A-z]*)/
      const [,id,] = queryRegex.exec(context) || []
      let data = options.data;
      context = data._flat[id]
      return fn(context, {
        data: data,
        blockParams: [context]
      });
  }
}