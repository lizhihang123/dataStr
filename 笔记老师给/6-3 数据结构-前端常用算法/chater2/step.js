// 动态规划
// 自下 而上  

var memo = {};

function fibo(n) {
    // 递推
    // debugger;
    memo[0] = 1;
    memo[1] = 1;

    for(var i = 2; i <= n; i++) {
        memo[i] = memo[i - 2] + memo[i - 1];
    }

    return memo[n];
}

console.time('1');
console.log(fibo(40))
console.timeEnd('1');