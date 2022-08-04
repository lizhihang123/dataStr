// 递归
// 1 ,1, 2, 3 ....
// O(2 ^ n)  指数级
function fibo(n) { //  
    // 边界情况
    if (n === 0 ) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    return fibo(n - 1) + fibo(n - 2);
}


console.time('10');
fibo(10);
console.timeEnd('10');

console.time('20');
fibo(20);
console.timeEnd('20');

console.time('40');
fibo(40);
console.timeEnd('40');


// 利用空间换时间


var memo = {};

function fibo2(n) { //  
    // 边界情况
    if (n === 0 ) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    if (memo[n]) {
        return memo[n];
    }
    return memo[n] = fibo2(n - 1) + fibo2(n - 2);
}

console.time('10');
fibo2(10);
console.timeEnd('10');

console.time('20');
fibo2(20);
console.timeEnd('20');

console.time('40');
fibo2(40);
console.timeEnd('40');