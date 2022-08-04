// 递归， 自上而下

function intBreak(n) {
    
    // 边界情况
    if(n === 1) {
        return 1;
    }

    var res = -1;  // 存储结果， 大小的比较
    for(var i = 1; i <= n - 1; i ++) {
        // Math.max可以接受多个参数
        // res的核心是比较for循环的前一个值
        res = Math.max(res, i * intBreak(n - i), i * (n - i));
    }

    return res;
}

console.log(intBreak(20))