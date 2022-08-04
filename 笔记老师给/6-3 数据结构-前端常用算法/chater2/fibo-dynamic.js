// 使用 动态规划的思想
// 自下向上

var memo = {};

function fibo(n) {
    // 递推
    // debugger;
    memo[0] = 0;
    memo[1] = 1;

    for(var i = 2; i <= n; i++) {
        memo[i] = memo[i - 2] + memo[i - 1];
    }

    return memo[n];
}

console.time('1');
fibo(40);
console.timeEnd('1');

