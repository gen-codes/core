const cache = new WeakMap();

const pureBind = (fnc, arg) =>
    (cache.has(fnc) && cache.get(fnc).get(arg)) || bind(fnc, arg);

const bind = (fnc, arg) =>
    node(fnc).set(arg, fnc.bind(undefined, arg)).get(arg);

const node = (key) =>
    cache.get(key) || cache.set(key, new Map()).get(key);

export default (fnc, ...args) =>
    args.reduce((bound, arg) =>
        bound ? pureBind(bound, arg) : pureBind(fnc, arg), null)
