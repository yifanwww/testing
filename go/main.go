package benchmark

func empty() {}

func fibonacci() int {
	var a int = 0
	var b int = 1
	var c int
	for a < 10000 {
		c = a + b
		a = b
		b = c
	}
	return a
}
