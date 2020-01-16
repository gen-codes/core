import jsonQuery from 'json-query';


const escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

const badChars = /[&<>"'`=]/g,
  possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj/* , ...source */) {
  for(let i = 1; i < arguments.length; i++) {
    for(let key in arguments[i]) {
      if(Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}


// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
let isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if(isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
/* eslint-enable func-style */

/* istanbul ignore next */
const isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
function indexOf(array, value) {
  for(let i = 0, len = array.length; i < len; i++) {
    if(array[i] === value) {
      return i;
    }
  }
  return -1;
}


function escapeExpression(string) {
  if(typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if(string && string.toHTML) {
      return string.toHTML();
    } else if(string == null) {
      return '';
    } else if(!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if(!possible.test(string)) {return string;}
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if(!value && value !== 0) {
    return true;
  } else if(isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  let frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function each(context, textId , options) {
  if(!options) {
    throw new Error('Must pass iterator to #each');
  }
  const metadata = options.data.root._metadata
  if(typeof context === "string") {
    context = jsonQuery(context, {
      data: options.data.root
    }).value
  }
  const hyperContext = this;
  let fn = options.fn,
    inverse = options.inverse,
    i = 0,
    ret = '',
    data;

  if(isFunction(context)) {context = context.call(this);}
  if(options.data) {
    data = createFrame(options.data);
  }
  function execIteration(field, index, last) {
    if(data) {
      data.key = field;
      data.index = index;
      data.first = index === 0;
      data.last = !!last;
      data = {...data.root, ...data}
    }
    let part = fn({...data.root, ...context[field]}, { // here we add the context outside of the loop
      data: data,
      blockParams: [context[field], field, hyperContext]
    });

    let before = ""
    let after = ""
    if(metadata && metadata.each){
      const eachItem = metadata.each.item
      if(eachItem.before){
        before = eachItem.before(context[field]._id, textId)
      }
      if(eachItem.after){
        after = eachItem.after(context[field]._id, textId)
      }
      if(eachItem.value){
        part = eachItem.value(context[field]._id,textId, part)
      }
    }
    ret = ret + before + part + after
  }
  if(context && typeof context === 'object') {
    if(isArray(context)) {
      for(let j = context.length; i < j; i++) {
        if(i in context) {
          execIteration(i, i, i === context.length - 1);
        }
      }
    } else {
      let priorKey;

      for(let key in context) {
        if(context.hasOwnProperty(key)) {
          // We're running the iterations one step out of sync so we can detect
          // the last iteration without have to scan the object twice and create
          // an itermediate keys array.
          if(priorKey !== undefined) {
            execIteration(priorKey, i - 1);
          }
          priorKey = key;
          i++;
        }
      }
      if(priorKey !== undefined) {
        execIteration(priorKey, i - 1, true);
      }
    }
  }
  const eachOptions = metadata && metadata.each || {}
  let {before, after, value} = eachOptions
  before = before?before(textId):""
  after = after?after(textId):""
  ret = value?value(textId, ret):ret
  ret = `${before}${ret}${after}`
  if(i === 0) {
    ret = inverse(this);
  }

  return ret;
}
export default {each};
