import { Bench } from 'tinybench';

const bench = new Bench({ time: 500 });

bench
    .add('empty', () => {})
    .add('fibonacci', () => {
        let a = 0;
        let b = 1;
        let c;
        while (a < 10000) {
            c = a + b;
            a = b;
            b = c;
        }
        return a;
    });

await bench.run();

console.table(bench.table());
