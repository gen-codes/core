function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function unflat(data) {
  const result = [];
  Object.keys(data).forEach( flatKey => {
    const keys = flatKey.split('.');
    let unftn = { [keys[keys.length - 1]]: data[flatKey] };
    for (var i = keys.length - 1; i--;) {
      unftn = { [keys[i]]: unftn }
    }
    result.push( unftn )
  });

  return mergeDeep( {}, ...result);
}