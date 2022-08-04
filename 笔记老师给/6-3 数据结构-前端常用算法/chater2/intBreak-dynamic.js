// 动态规划

// 自下而上  

var memo = {};
function iniBreak_dynamic(n) {
    memo[1] = 1;
    // debugger;
    for(var i = 2; i <= n; i ++) {
        // 自下而上的递推
        // 4  2 + 1 + 3 2 3 + 3
        for(var j = 1; j <= i - 1; j ++) {
            memo[i] = Math.max(memo[i] || 1, j * (i - j), j * memo[i - j]);
        }
    }

    return memo[n];
}

console.log(iniBreak_dynamic(100));