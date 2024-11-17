use std::hint::black_box;
use criterion::{criterion_group, criterion_main, Criterion};
use mycrate::*;

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("empty", |b| b.iter(|| empty()));
    c.bench_function("fibonacci 4", |b| b.iter(|| fibonacci(black_box(4))));
    c.bench_function("fibonacci 20", |b| b.iter(|| fibonacci(black_box(20))));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
