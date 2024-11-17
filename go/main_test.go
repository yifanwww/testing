package main

import (
	"testing"
)

func BenchmarkEmpty(b *testing.B) {
	for i := 0; i < b.N; i++ {
		empty()
	}
}

func BenchmarkFibonacci4(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fibonacci(4)
	}
}

func BenchmarkFibonacci20(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fibonacci(20)
	}
}
