using System;
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Columns;
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Running;


public class Program
{
    public static void Main()
    {
        BenchmarkRunner.Run<Benchmark>();
    }
}


[IterationTime(500)]
[Config(typeof(Config))]
public class Benchmark
{
    private class Config : ManualConfig
    {
        public Config()
        {
            AddColumn(StatisticColumn.OperationsPerSecond);
        }
    }

    [Benchmark]
    public void Noop() {}

    [Benchmark]
    [Arguments(4)]
    [Arguments(20)]
    public int Fibonacci(int n) {
        if (n == 1 || n == 2) return 1;
        int a = 1;
        int b = 1;
        int c = 2;
        for (int i = 4; i <= n; i++) {
            a = b;
            b = c;
            c = a + b;
        }
        return c;
    }
}
