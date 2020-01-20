export function nthback(n) {
  var calls = 0;
  var errored;
  return function wrap(cb) {
    return function wrapped(e) {
      if(errored) return;
      if(e) {
        errored = true;
        cb.call(this, e);
        return;
      }
      if(++calls >= n) {
        if(calls > n) {
          cb.call(this, new Error('called more than ' + n + 'times'));
        } else {
          cb.apply(this, arguments);
        }
      }
    };
  };
};