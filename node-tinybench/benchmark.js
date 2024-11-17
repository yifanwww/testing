import { Bench } from 'tinybench';

function noop() {}

function fibonacci(n) {
    if (n === 1 || n === 2) return 1;
    let a = 1;
    let b = 1;
    let c = 2;
    for (let i = 4; i <= n; i++) {
        a = b;
        b = c;
        c = a + b;
    }
    return c;
}

const bench = new Bench({ time: 500 });

bench
    .add('noop', () => noop())
    .add('fibonacci 4', () => fibonacci(4))
    .add('fibonacci 20', () => fibonacci(20));

await bench.run();

console.table(bench.table());
