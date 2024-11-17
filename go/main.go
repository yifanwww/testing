package main

func empty() {}

func fibonacci(n int) int {
	if n == 0 || n == 1 {
		return 1
	}
	var a int = 1
	var b int = 1
	var c int = 2
	for i := 4; i <= n; i ++ {
		a = b
		b = c
		c = a + b
	}
	return c
}
