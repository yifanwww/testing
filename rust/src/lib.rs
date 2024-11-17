pub fn empty() -> () {}

pub fn fibonacci(n: i32) -> i32 {
    match n {
        1 => 1,
        2 => 1,
        _ => {
            let mut a: i32;
            let mut b: i32 = 1;
            let mut c: i32 = 2;
            for _ in 3..n {
                a = b;
                b = c;
                c = a + b;
            }
            c
        }
    }
}
