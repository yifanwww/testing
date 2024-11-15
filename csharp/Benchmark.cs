using System;
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Columns;
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Running;


public class Program
{
    public static void Main()
    {
        BenchmarkRunner.Run<BenchmarkExample>();
    }
}


[IterationTime(500)]
[Config(typeof(Config))]
public class BenchmarkExample
{
    private class Config : ManualConfig
    {
        public Config()
        {
            AddColumn(StatisticColumn.OperationsPerSecond);
        }
    }

    [Benchmark] public void Empty() {}

    [Benchmark] public Int32 Fabonacci() {
        Int32 a = 0;
        Int32 b = 1;
        Int32 c;
        while (a < 10000) {
            c = a + b;
            a = b;
            b = c;
        }
        return a;
    }
}
