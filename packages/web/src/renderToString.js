import { render } from 'ink';
import EventEmitter from 'eventemitter3';
// Fake process.stdout
export class Stdout extends EventEmitter {
    constructor({ columns }) {
        super();
        this.output = '';
        this.columns = columns || 100;
    }
    write(str) {
        const sanitized = str.replace(/\n/g, '\r\n');
        this.emit('data', sanitized);
        this.output = sanitized;
    }
    toString() {
        return this.output.replace(/\n/g, '\r\n');
    }
}
export class Stdin extends EventEmitter {
    constructor() {
        super(...arguments);
        this.readableHighWaterMark = 1000;
        this.readableLength = 10000;
        this.isRaw = true;
        this.isTTY = true;
    }
    _read(size) { }
    _destroy(err, callback) { }
    setRawMode(mode) { }
    push(chunk, encoding) {
        this.emit('data', chunk);
        return true;
    }
    destroy(error) { }
    setEncoding(env) { }
    resume() { }
}
export default function renderToString(node, { columns, terminal } = {}, cb) {
    const stdout = new Stdout({ columns });
    const stdin = new Stdin();
    render(node, {
        stdout,
        stdin,
        debug: true,
    });
    if (terminal) {
        terminal.on('key', key => {
            stdin.push(key);
        });
    }
    stdout.on('data', data => {
        cb(data);
    });
    cb(String(stdout));
}
